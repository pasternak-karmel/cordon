"use server";

import { getUser, getUserByEmail, getUserById } from "@/data/account";
import {
  db,
  RequisitionTable,
  subscriptions,
  SubscriptionStatus,
} from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
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
  const id = await getUser();

  if (!id) return false;

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

const ManageAccount = cache(async (): Promise<boolean> => {
  // je vérifie si son abonnement a été résilié et si oui desactiver tout le reste sauf les trois premiers
  const id = await getUser();

  if (!id) return false;

  const pastActiveSubscriptions = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, id),
        eq(subscriptions.status, SubscriptionStatus.ACTIVE)
      )
    )
    .execute();
  // 2. Vérifier si l'abonnement actuel n'est pas actif
  const currentSubscription = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, id),
        eq(subscriptions.status, SubscriptionStatus.INACTIVE) // Ou tout autre statut non actif
      )
    )
    .execute();

  // Si l'utilisateur a déjà eu un abonnement actif mais n'en a plus actuellement
  if (pastActiveSubscriptions.length > 0 && currentSubscription.length === 0) {
    // 3. Récupérer toutes les requêtes de l'utilisateur
    const allRequisitions = await db
      .select()
      .from(RequisitionTable)
      .where(eq(RequisitionTable.userId, id))
      .orderBy(RequisitionTable.createdAt)
      .execute();

    // 4. Désactiver toutes les requêtes sauf les trois premières
    for (let i = 3; i < allRequisitions.length; i++) {
      await db
        .update(RequisitionTable)
        .set({ status: "INACTIVE" })
        .where(eq(RequisitionTable.id, allRequisitions[i].id))
        .execute();
    }

    return false;
  } else {
    return true;
  }
});

const hasLinkedAccount = cache(async (): Promise<boolean> => {
  const id = await getUser();
  if (!id) throw new Error("User not found");
  const userAccount = await db
    .select()
    .from(RequisitionTable)
    .where(eq(RequisitionTable.userId, id))
    .execute();

  if (userAccount.length > 0) {
    return true;
  }
  return false;
});

const getConnectedAccounts = cache(async (email: string) => {
  if (!email) throw new Error("Something went wrong");
  const user = await getUserByEmail(email);
  if (!user || !user?.id) throw new Error("User not found");
  const userAccount = await db
    .select()
    .from(RequisitionTable)
    .where(eq(RequisitionTable.userId, user.id))
    .orderBy(RequisitionTable.createdAt)
    .execute();

  return userAccount;
});

export {
  canAddAccount,
  getConnectedAccounts,
  hasLinkedAccount,
  ManageAccount,
  manageSubscriptionStatusChange,
};

// .where(eq(RequisitionTable.linkStatus, "active")).where(eq(RequisitionTable.status_short, "ACTIVE"))
