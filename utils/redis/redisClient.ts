import { config } from "@/config";
import { createClient, RedisClientType } from "redis";

class RedisClient {
  private static instance: RedisClientType;
  private static isConnected: boolean = false;

  private constructor() {}

  public static async getInstance(): Promise<RedisClientType> {
    if (!this.instance) {
      this.instance = createClient({
        password: config.redis.password,
      });

      this.instance.on("error", (err) => {
        console.error("❌ Redis Error:", err);
      });

      this.instance.on("connect", () => {
        console.log("✅ Connected to Redis");
        this.isConnected = true;
      });

      this.instance.on("reconnecting", () => {
        console.warn("⚠️ Reconnecting to Redis...");
      });

      this.instance.on("end", () => {
        console.warn("🚪 Disconnected from Redis");
        this.isConnected = false;
      });

      await this.instance.connect();
    }

    if (!this.isConnected) {
      throw new Error("Redis client is not connected.");
    }

    return this.instance;
  }
}

export default RedisClient;
