import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminCookieOptions } from "@/app/lib/admin-auth";

export async function POST() {
  const cookieStore = await cookies();
  const clear = adminCookieOptions(0);

  cookieStore.set(ADMIN_COOKIE, "", { ...clear, maxAge: 0 });
  // Clear legacy session cookie too
  cookieStore.set("admin_session", "", { ...clear, maxAge: 0 });

  return NextResponse.json({ success: true });
}
