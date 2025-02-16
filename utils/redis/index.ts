import Redis from "ioredis";
import "server-only";

if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in environment variables");
}

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!this.instance) {
      this.instance = new Redis(process.env.REDIS_URL!, {
        maxRetriesPerRequest: 3,
        enableOfflineQueue: false,
        lazyConnect: true,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      });

      this.instance.on("error", (err) => {
        console.error("❌ Redis Error:", err);
      });

      this.instance.on("connect", () => {
        console.log("✅ Connected to Redis");
      });

      this.instance.on("reconnecting", () => {
        console.warn("⚠️ Reconnecting to Redis...");
      });
    }
    return this.instance;
  }
}

const redis = RedisClient.getInstance();

const CACHE_TTL = 86400;

/**
 * Retrieves cached data from Redis.
 * @param key - Cache key.
 * @returns Parsed cached data or `null` if not found.
 */
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error(`❌ Redis GET Error [${key}]:`, error);
    return null;
  }
};

/**
 * Stores data in Redis cache with an expiration time.
 * @param key - Cache key.
 * @param data - Data to cache.
 * @param ttl - Time-to-Live in seconds (default: 24 hours).
 */
export const setCachedData = async <T>(
  key: string,
  data: T,
  ttl = CACHE_TTL
): Promise<void> => {
  try {
    await redis.set(key, JSON.stringify(data), "EX", ttl);
  } catch (error) {
    console.error(`❌ Redis SET Error [${key}]:`, error);
  }
};

/**
 * Deletes a cache entry from Redis.
 * @param key - Cache key.
 */
export const deleteCachedData = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`❌ Redis DELETE Error [${key}]:`, error);
  }
};

/**
 * Clears all cache entries (use with caution!).
 */
export const clearCache = async (): Promise<void> => {
  try {
    await redis.flushall();
    console.log("🧹 Redis cache cleared");
  } catch (error) {
    console.error("❌ Redis FLUSHALL Error:", error);
  }
};
