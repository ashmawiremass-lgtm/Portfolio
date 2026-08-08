import crypto from "crypto";
import { cookies } from "next/headers";

export function isAdminAuthed(): boolean {
  const correct = process.env.ADMIN_PASSWORD;
  if (!correct) return false;

  const expected = crypto
    .createHmac("sha256", correct)
    .update(new Date().toDateString())
    .digest("hex");

  const token = cookies().get("admin_session")?.value;
  return token === expected;
}
