import { urlDb } from "@/env";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

if (!urlDb) {
  throw new Error("❌ DATABASE_URL is not set in environment variables");
}

const pool = postgres(urlDb, { max: 1 });

export const db = drizzle(pool);
