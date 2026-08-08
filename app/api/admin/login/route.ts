import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set on the server." },
      { status: 500 }
    );
  }

  if (password !== correct) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  // simple signed session token: not a JWT, just enough to prove
  // "someone who knows the password visited recently"
  const token = crypto
    .createHmac("sha256", correct)
    .update(new Date().toDateString())
    .digest("hex");

  cookies().set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return NextResponse.json({ ok: true });
}
