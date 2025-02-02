CREATE TABLE IF NOT EXISTS "requisition_table" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"requisitionId" text NOT NULL,
	"status_short" text NOT NULL,
	"status_long" text NOT NULL,
	"status_description" text NOT NULL,
	"agreement" text NOT NULL,
	"accounts" jsonb DEFAULT '[]'::jsonb,
	"reference" varchar(50) NOT NULL,
	"user_language" varchar(2) NOT NULL,
	"linkStatus" text DEFAULT 'active' NOT NULL,
	"lastSyncAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "bank_accounts" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requisition_table" ADD CONSTRAINT "requisition_table_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bank_accounts_user_id_idx" ON "requisition_table" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bank_accounts_requisition_id_idx" ON "requisition_table" USING btree ("requisitionId");