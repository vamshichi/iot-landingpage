import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

const SECRET      = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-this-to-a-random-32-char-secret!!");
const COOKIE_NAME = "admin_token";

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try { await jwtVerify(token, SECRET); return true; } catch { return false; }
}

/* ── GET /api/admin/leads ───────────────────────────────────────────────
   Query params:
     page      (default 1)
     limit     (default 20)
     formType  delegate | sponsor | brochure | "" (all)
     status    new | contacted | converted | rejected | "" (all)
     search    free text
     sort      submittedAt | fullName  (prefix with - for desc)
─────────────────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);
  const page     = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit    = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const formType = searchParams.get("formType") ?? "";
  const status   = searchParams.get("status")   ?? "";
  const search   = searchParams.get("search")   ?? "";
  const sortParam= searchParams.get("sort")      ?? "-submittedAt";

  // Build filter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (formType) filter.formType = formType;
  if (status)   filter.status   = status;
  if (search)   filter.$text    = { $search: search };

  // Build sort
  const sortDir  = sortParam.startsWith("-") ? -1 : 1;
  const sortKey  = sortParam.replace(/^-/, "");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sort: Record<string, any> = { [sortKey]: sortDir };

  const [leads, total, stats] = await Promise.all([
    Lead.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    Lead.countDocuments(filter),
    // Always return counts across ALL leads for the stats cards
    Lead.aggregate([
      { $group: { _id: { formType: "$formType", status: "$status" }, count: { $sum: 1 } } }
    ]),
  ]);

  // Shape stats → { total, byType, byStatus }
  const byType:   Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let grandTotal = 0;
  for (const row of stats) {
    const ft = row._id.formType as string;
    const st = row._id.status  as string;
    const n  = row.count       as number;
    byType[ft]   = (byType[ft]   ?? 0) + n;
    byStatus[st] = (byStatus[st] ?? 0) + n;
    grandTotal  += n;
  }

  return NextResponse.json({
    leads,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    stats: { total: grandTotal, byType, byStatus },
  });
}

/* ── PATCH /api/admin/leads  →  bulk update status / add note ── */
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, notes } = (await req.json()) as {
    id    : string;
    status?: string;
    notes ?: string;
  };

  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update: Record<string, any> = {};
  if (status) update.status = status;
  if (notes !== undefined) update.notes = notes;

  const lead = await Lead.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  return NextResponse.json({ success: true, lead });
}

/* ── DELETE /api/admin/leads  →  delete one lead ── */
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await req.json()) as { id: string };
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  await connectDB();
  await Lead.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}