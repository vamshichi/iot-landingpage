import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET      = new TextEncoder().encode(process.env.JWT_SECRET ?? "change-this-to-a-random-32-char-secret!!");
const COOKIE_NAME = "admin_token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let login page and auth API pass through
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  // Protect everything under /admin and /api/admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      // API: return 401; UI: redirect to login
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Session expired." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};