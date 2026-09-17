import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export const ADMIN_COOKIE = "admin_token";
export const ADMIN_TOKEN_TTL_SEC = 60 * 60 * 8; // 8 hours

export type AdminJwtPayload = JWTPayload & {
  role: "admin";
  sub: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set in .env (min 32 characters)");
  }
  return new TextEncoder().encode(secret);
}

/** Constant-time string compare (same length padded) */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still compare to reduce timing leak on length
    const max = Math.max(bufA.length, bufB.length);
    const padA = Buffer.alloc(max);
    const padB = Buffer.alloc(max);
    bufA.copy(padA);
    bufB.copy(padB);
    timingSafeEqual(padA, padB);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function signAdminToken(username: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getJwtSecret());
}

export async function verifyAdminToken(token?: string | null): Promise<AdminJwtPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return payload as AdminJwtPayload;
  } catch {
    return null;
  }
}

export function adminCookieOptions(maxAge = ADMIN_TOKEN_TTL_SEC) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function requireAdminApi() {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    return {
      session: null as AdminJwtPayload | null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

/** Login attempt limiter: 5 / 15 min per IP */
export const LOGIN_LIMITS = [
  { limit: 5, windowMs: 15 * 60 * 1000 },
] as const;

export function checkLoginRateLimit(req: Request) {
  const ip = getClientIp(req);
  return rateLimit(`admin-login:${ip}`, [...LOGIN_LIMITS]);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || "";
  const adminPass = process.env.ADMIN_PASSWORD || "";
  if (!adminUser || !adminPass) return false;
  return safeEqual(username, adminUser) && safeEqual(password, adminPass);
}
