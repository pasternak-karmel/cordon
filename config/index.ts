import dotenv from "dotenv";
import "server-only";

dotenv.config();

export const config = {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    password: process.env.REDIS_PASSWORD || "",
    ttl: parseInt(process.env.REDIS_CACHE_TTL || "86400", 10),
  },
};
