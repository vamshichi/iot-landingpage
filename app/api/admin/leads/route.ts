import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { FormType, LeadStatus, Prisma } from "@prisma/client";

const SECRET      = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-this-to-a-random-32-char-secret!!");
const COOKIE_NAME = "admin_token";

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try { await jwtVerify(token, SECRET); return true; } catch { return false; }
}

/* ── GET /api/admin/leads ──────────────────────────────────── */
export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page      = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit     = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const formType  = searchParams.get("formType") ?? "";
  const status    = searchParams.get("status")   ?? "";
  const search    = searchParams.get("search")   ?? "";
  const sortParam = searchParams.get("sort")     ?? "-submittedAt";

  /* ── Build where clause ── */
  const where: Prisma.LeadWhereInput = {};

  if (formType) where.formType = formType as FormType;
  if (status)   where.status   = status   as LeadStatus;

  // Prisma MongoDB: use OR + contains for basic search
  // (For production, consider MongoDB Atlas Search via $search)
  if (search) {
    where.OR = [
      { fullName:              { contains: search, mode: "insensitive" } },
      { workEmailAddress:      { contains: search, mode: "insensitive" } },
      { mobileNumber:          { contains: search, mode: "insensitive" } },
      { companyName:           { contains: search, mode: "insensitive" } },
      { organizationCompanyName:{ contains: search, mode: "insensitive" } },
      { companyOrganizationName:{ contains: search, mode: "insensitive" } },
    ];
  }

  /* ── Build orderBy ── */
  const isDesc   = sortParam.startsWith("-");
  const sortKey  = sortParam.replace(/^-/, "") as keyof Prisma.LeadOrderByWithRelationInput;
  const orderBy  = { [sortKey]: isDesc ? "desc" : "asc" } as Prisma.LeadOrderByWithRelationInput;

  /* ── Run queries in parallel ── */
  const [leads, total, byTypeRaw, byStatusRaw] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),

    // Stats always across ALL leads (no filter)
    prisma.lead.groupBy({
      by: ["formType"],
      _count: { _all: true },
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const byType: Record<string, number>   = {};
  const byStatus: Record<string, number> = {};
  let grandTotal = 0;

  for (const row of byTypeRaw) {
    byType[row.formType] = row._count._all;
    grandTotal += row._count._all;
  }
  for (const row of byStatusRaw) {
    byStatus[row.status] = row._count._all;
  }

  return NextResponse.json({
    leads,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    stats: { total: grandTotal, byType, byStatus },
  });
}

/* ── PATCH /api/admin/leads  →  update status / notes ─────── */
export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, notes } = (await req.json()) as {
    id     : string;
    status?: string;
    notes ?: string;
  };

  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const data: Prisma.LeadUpdateInput = {};
  if (status)           data.status = status as LeadStatus;
  if (notes !== undefined) data.notes = notes;

  try {
    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ success: true, lead });
  } catch {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }
}

/* ── DELETE /api/admin/leads  →  delete one lead ──────────── */
export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.delete({
      where: {
        id: id, // keep as string (Prisma handles mapping)
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("DELETE ERROR:", error); // 👈 ADD THIS
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }
}