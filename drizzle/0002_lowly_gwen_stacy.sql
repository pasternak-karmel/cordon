ALTER TABLE "token" ALTER COLUMN "refresh_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "access_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "expires_at" SET NOT NULL;