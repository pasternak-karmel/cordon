import dotenv from "dotenv";
import "server-only";

dotenv.config();

export const config = {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    password: process.env.REDIS_PASSWORD || "",
    ttl: parseInt(process.env.REDIS_CACHE_TTL || "86400", 10),
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY_LIVE ?? "",
    publishableKey:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
      "",
  },
  postgres: {
    url: process.env.DATABASE_URL ?? "",
  },
};
