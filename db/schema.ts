// import { urlDb } from "@/env";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
// import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";
// import postgres from "postgres";
// DATABASE_URL=postgres://postgres:23052005AB@127.0.0.1:5432/cordon

// if (!urlDb) {
//   throw new Error("❌ DATABASE_URL is not set in environment variables");
// }

// const pool = postgres(urlDb, { max: 1, ssl: "require" });

// console.log("the urlDb is", urlDb);

// export const db = drizzle(pool);

function generate() {
  return crypto.randomUUID();
}

export const token = pgTable("token", {
  id: text("id").primaryKey().$defaultFn(generate),
  access_token: text("access_token").notNull(),
  refresh_token: text("refresh_token").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  expires_at: integer("expires_at").notNull(),
});

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(generate),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  stripe_customer_id: text("stripe_customer_id"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const RequisitionTable = pgTable(
  "requisition_table",
  {
    id: text("id").primaryKey().$defaultFn(generate),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    requisitionId: text("requisitionId").notNull(),
    // status_short: text("status_short").notNull(),
    // status_long: text("status_long").notNull(),
    // status_description: text("status_description").notNull(),
    agreement: text("agreement").notNull(),
    accounts: jsonb("accounts").default([]),
    reference: varchar("reference", { length: 50 }).notNull(),
    // user_language: varchar("user_language", { length: 2 }).notNull(),
    linkStatus: text("linkStatus").notNull().default("active"),
    lastSyncAt: timestamp("lastSyncAt", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
    status: text("status").notNull().default("ACTIVE"),
    institutionName: text("institutionName").notNull(),
  },
  (requisitionTable) => ({
    userIdIdx: index("bank_accounts_user_id_idx").on(requisitionTable.userId),
    requisitionIdIdx: index("bank_accounts_requisition_id_idx").on(
      requisitionTable.requisitionId
    ),
  })
);

export const prices = pgTable("prices", {
  id: text("id").primaryKey().$defaultFn(generate),
  stripe_id: text("stripe_id").notNull(),
  name: text("name"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  interval: text("interval").notNull(),
});

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  PAUSED = "PAUSED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE",
  TRIALING = "TRIALING",
  UNPAID = "UNPAID",
  INCOMPLETE_EXPIRED = "INCOMPLETE_EXPIRED",
  PAST_DUE = "PAST_DUE",
}

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id").primaryKey().$defaultFn(generate),
    userId: text("userId")
      .notNull()
      // .unique()
      .references(() => users.id),
    type: text("type").notNull(),
    status: text("status").notNull().default(SubscriptionStatus.ACTIVE),
    metadata: jsonb("metadata"),
    cancel_at_period_end: boolean("cancel_at_period_end"),
    created: timestamp("created", { mode: "date" }).notNull().defaultNow(),
    current_period_start: timestamp("current_period_start", { mode: "date" })
      .notNull()
      .defaultNow(),
    current_period_end: timestamp("current_period_end", { mode: "date" })
      .notNull()
      .defaultNow(),
    // .check(sql`current_period_end > current_period_start`),
    ended_at: timestamp("ended_at", { mode: "date" }),
    canceled_at: timestamp("canceled_at", { mode: "date" }),
    trial_start: timestamp("trial_start", { mode: "date" }),
    trial_end: timestamp("trial_end", { mode: "date" }),
    cancel_at: timestamp("cancel_at", { mode: "date" }),
  },
  (subscriptionTable) => ({
    userIdIdx: index("subscriptions_user_id_idx").on(subscriptionTable.userId),
    statusIdx: index("status_idx").on(subscriptionTable.status),
  })
);
