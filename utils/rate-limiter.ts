import { Redis } from "ioredis";
const redis = new Redis();

export async function rateLimiter(userId: string, action: string): Promise<{ limited: boolean }> {
  const key = `rateLimit:${userId}:${action}`;
  const limit = 10; // Allow 10 requests per window
  const windowInSeconds = 60; // 1-minute window

  const currentCount = await redis.incr(key);
  if (currentCount === 1) {
    await redis.expire(key, windowInSeconds); // Set expiration for the key
  }

  return { limited: currentCount > limit };
}
