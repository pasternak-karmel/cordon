CREATE TABLE "requisition_table" (
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
CREATE TABLE "prices" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"price" integer NOT NULL,
	"currency" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"metadata" jsonb,
	"cancel_at_period_end" boolean,
	"created" timestamp DEFAULT now() NOT NULL,
	"current_period_start" timestamp DEFAULT now() NOT NULL,
	"current_period_end" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"canceled_at" timestamp,
	"trial_start" timestamp,
	"trial_end" timestamp,
	"cancel_at" timestamp
);
--> statement-breakpoint
DROP TABLE "bank_accounts" CASCADE;--> statement-breakpoint
ALTER TABLE "requisition_table" ADD CONSTRAINT "requisition_table_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bank_accounts_user_id_idx" ON "requisition_table" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "bank_accounts_requisition_id_idx" ON "requisition_table" USING btree ("requisitionId");--> statement-breakpoint
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "status_idx" ON "subscriptions" USING btree ("status");