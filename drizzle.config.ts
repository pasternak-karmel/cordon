import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

// Load .env file from project root
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Log for debugging
console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
  dialect: "postgresql",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ? process.env.DATABASE_URL : "",
  },
  verbose: true,
  strict: true,
});
