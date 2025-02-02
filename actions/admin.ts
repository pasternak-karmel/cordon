"use server";

import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/account";
import {
  db,
  RequisitionTable,
  subscriptions,
  SubscriptionStatus,
} from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { cache } from "react";

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  console.log(createAction);
  const user = await getUserById(customerId);

  if (!user) {
    throw new Error(`User not found for customer [${customerId}]`);
  }
};

const canAddAccount = cache(async (): Promise<boolean> => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return false;

  const user = await getUserByEmail(session.user.email);

  if (!user) return false;

  const id = user.id;

  const requisitionCountResult = await db
    .select({ count: count() })
    .from(RequisitionTable)
    .where(eq(RequisitionTable.userId, id))
    .execute();

  const requisitionCount = requisitionCountResult[0]?.count || 0;

  if (requisitionCount >= 3) {
    const userSubscriptions = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, id))
      .execute();

    const activeSubscription = userSubscriptions.find(
      (sub) => sub.status === SubscriptionStatus.ACTIVE
    );

    if (!activeSubscription) {
      return false;
    }
  }

  return true;
});

export { canAddAccount, manageSubscriptionStatusChange };

// .where(eq(RequisitionTable.linkStatus, "active")).where(eq(RequisitionTable.status_short, "ACTIVE"))
