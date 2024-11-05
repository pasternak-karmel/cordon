CREATE TABLE IF NOT EXISTS "token" (
	"id" text PRIMARY KEY NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"created_at" timestamp DEFAULT now()
);
