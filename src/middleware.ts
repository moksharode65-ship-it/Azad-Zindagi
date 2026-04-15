import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedToken = process.env.ADMIN_AUTH_TOKEN;
  if (!expectedToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "auth_not_configured");
    return NextResponse.redirect(url);
  }

  const cookieToken = req.cookies.get("admin_session")?.value;
  if (cookieToken !== expectedToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
