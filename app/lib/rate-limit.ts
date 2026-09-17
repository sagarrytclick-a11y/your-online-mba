type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfterSec: number;
};

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

function prune(timestamps: number[], windowMs: number, now: number) {
  return timestamps.filter((t) => now - t < windowMs);
}

/**
 * Sliding-window rate limiter (in-memory).
 * Supports burst + sustained limits on the same key.
 */
export function rateLimit(
  key: string,
  limits: { limit: number; windowMs: number }[]
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  let timestamps = bucket.timestamps;

  let remaining = Infinity;
  let retryAfterSec = 0;

  for (const { limit, windowMs } of limits) {
    timestamps = prune(timestamps, windowMs, now);
    const count = timestamps.length;
    const left = Math.max(0, limit - count);
    remaining = Math.min(remaining, left);

    if (count >= limit) {
      const oldest = timestamps[0] ?? now;
      retryAfterSec = Math.max(retryAfterSec, Math.ceil((windowMs - (now - oldest)) / 1000));
    }
  }

  if (retryAfterSec > 0) {
    buckets.set(key, { timestamps });
    return { success: false, remaining: 0, retryAfterSec };
  }

  timestamps.push(now);
  buckets.set(key, { timestamps });

  // Prevent unbounded growth
  if (buckets.size > 10_000) {
    const firstKey = buckets.keys().next().value;
    if (firstKey) buckets.delete(firstKey);
  }

  return {
    success: true,
    remaining: remaining === Infinity ? 0 : Math.max(0, remaining - 1),
    retryAfterSec: 0,
  };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  return "anonymous";
}

/** Counselling forms: standard anti-spam (not too aggressive) */
export const COUNSELLING_LIMITS = [
  { limit: 5, windowMs: 5 * 60 * 1000 }, // 5 per 5 minutes
  { limit: 20, windowMs: 60 * 60 * 1000 }, // 20 per hour
] as const;

/** CourseMate chat: max 10 / hour per IP */
export const CHAT_LIMITS = [{ limit: 10, windowMs: 60 * 60 * 1000 }] as const;
