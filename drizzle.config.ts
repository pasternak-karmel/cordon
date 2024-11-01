import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,
    url: "postgres://postgres:mysecretpassword@127.0.0.1:5432/postgres",
  },
  verbose: true,
  strict: true,
});
