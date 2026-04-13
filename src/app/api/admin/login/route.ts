import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminToken = process.env.ADMIN_AUTH_TOKEN;

    if (!adminPassword || !adminToken) {
      return NextResponse.json({ error: "Admin auth is not configured" }, { status: 500 });
    }

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set("admin_session", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
