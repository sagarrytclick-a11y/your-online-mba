import { NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/app/lib/admin-auth";

export async function GET() {
  const session = await getAdminSessionFromCookies();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { username: session.sub, role: session.role },
  });
}
