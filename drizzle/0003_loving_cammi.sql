CREATE TABLE IF NOT EXISTS "bank_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"requisitionId" text,
	"institutionId" text,
	"institutionName" text,
	"iban" text,
	"accountId" text,
	"accountName" text,
	"balanceAmount" numeric(10, 2),
	"balanceCurrency" text,
	"ownerName" text,
	"linkStatus" text DEFAULT 'active' NOT NULL,
	"lastSyncAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bank_accounts_user_id_idx" ON "bank_accounts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bank_accounts_requisition_id_idx" ON "bank_accounts" USING btree ("requisitionId");