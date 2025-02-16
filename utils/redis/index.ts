import { config } from "@/config";
import RedisClient from "./redisClient";

class CacheService {
  private redis: typeof RedisClient;

  constructor() {
    this.redis = RedisClient;
  }

  /**
   * Retrieves cached data from Redis.
   * @param key - Cache key.
   * @returns Parsed cached data or `null` if not found.
   */
  public async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const client = await this.redis.getInstance();
      const cachedData = await client.get(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error(`❌ Redis GET Error [${key}]:`, error);
      throw new Error(`Failed to retrieve cached data for key: ${key}`);
    }
  }

  /**
   * Stores data in Redis cache with an expiration time.
   * @param key - Cache key.
   * @param data - Data to cache.
   * @param ttl - Time-to-Live in seconds (default: 24 hours).
   */
  public async setCachedData<T>(
    key: string,
    data: T,
    ttl: number = config.redis.ttl
  ): Promise<void> {
    try {
      const client = await this.redis.getInstance();
      await client.set(key, JSON.stringify(data), {
        EX: ttl,
      });
    } catch (error) {
      console.error(`❌ Redis SET Error [${key}]:`, error);
      throw new Error(`Failed to set cached data for key: ${key}`);
    }
  }

  /**
   * Deletes a cache entry from Redis.
   * @param key - Cache key.
   */
  public async delete(key: string): Promise<void> {
    try {
      const client = await this.redis.getInstance();
      await client.del(key);
    } catch (error) {
      console.error(`❌ Redis DELETE Error [${key}]:`, error);
      throw new Error(`Failed to delete cached data for key: ${key}`);
    }
  }

  /**
   * Clears all cache entries (use with caution!).
   */
  public async clear(): Promise<void> {
    try {
      const client = await this.redis.getInstance();
      await client.flushAll();
    } catch (error) {
      console.error("❌ Redis FLUSHALL Error:", error);
      throw new Error("Failed to clear Redis cache");
    }
  }
}

const RedisCacheService = new CacheService();

export default RedisCacheService;
