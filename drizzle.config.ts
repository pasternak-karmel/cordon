import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,

    url: "postgres://postgres:23052005AB@localhost:5432/cordon",
    //postgres:"//postgres:23052005AB@127.0.0.1:5432/cordon",
  },
  verbose: true,
  strict: true,
});
