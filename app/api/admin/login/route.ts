import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  checkLoginRateLimit,
  signAdminToken,
  validateAdminCredentials,
} from "@/app/lib/admin-auth";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(128),
});

export async function POST(req: NextRequest) {
  try {
    const limited = checkLoginRateLimit(req);
    if (!limited.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        }
      );
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { username, password } = parsed.data;

    if (!validateAdminCredentials(username, password)) {
      // Generic message — don't reveal which field failed
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAdminToken(username);
    const cookieStore = await cookies();

    // Clear legacy cookie if present
    cookieStore.set("admin_session", "", { ...adminCookieOptions(0), maxAge: 0 });
    cookieStore.set(ADMIN_COOKIE, token, adminCookieOptions());

    return NextResponse.json({
      success: true,
      user: { username, role: "admin" },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
