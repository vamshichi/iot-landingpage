import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-this-to-a-random-32-char-secret!!"
);
const COOKIE_NAME = "admin_token";
const COOKIE_OPTS = {
  httpOnly: true,
  secure  : process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path    : "/",
  maxAge  : 60 * 60 * 8, // 8 hours
};

/* ── POST /api/admin/auth  →  { action: "login"|"logout", password? } ── */
export async function POST(req: NextRequest) {
  const { action, password } = (await req.json()) as { action: string; password?: string };

  /* LOGOUT */
  if (action === "logout") {
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTS, maxAge: 0 });
    return res;
  }

  /* LOGIN */
  if (action === "login") {
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(SECRET);

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTS);
    return res;
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}

/* ── GET /api/admin/auth  →  verify token ── */
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}