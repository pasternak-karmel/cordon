ALTER TABLE "prices" RENAME COLUMN "price" TO "amount";--> statement-breakpoint
ALTER TABLE "prices" ADD COLUMN "stripe_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" ADD COLUMN "interval" text NOT NULL;