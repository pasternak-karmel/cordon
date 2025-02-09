ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_unique";--> statement-breakpoint
ALTER TABLE "requisition_table" ADD COLUMN "status" text DEFAULT 'ACTIVE' NOT NULL;