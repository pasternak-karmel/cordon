import { config } from "@/config";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

if (!config.postgres.url) {
  throw new Error("❌ DATABASE_URL is not set in environment variables");
}

const pool = postgres(config.postgres.url, { max: 1 });

export const db = drizzle(pool);
