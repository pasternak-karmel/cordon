import "server-only";

import { getUser } from "@/data/account";
import { db } from "@/db";
import { RequisitionTable } from "@/db/schema";
import { transactionProps } from "@/interface";
import RedisCacheService from "@/utils/redis";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { canAddAccount } from "./admin";
import { getAccountTransactions } from "./banque/userBanque";
import { SubscriptionPlan, SubscriptionService } from "./end";
import { calculateSpendings } from "./estimate";

// savoir tous les abonnements en cours sur une perdiode
// - calculate date de fin - nombre de jour restant

export const userSub = async (): Promise<{
  subscription: transactionProps[];
  total: number | null;
}> => {
  const userId = await getUser();
  if (!userId) return { subscription: [], total: null };

  const cacheKey = `userSub:${userId}`;
  const cachedData = await RedisCacheService.getCachedData<{
    subscription: transactionProps[];
    total: number | null;
  }>(cacheKey);
  if (cachedData) return cachedData;

  try {
    const userReq = await getUserRequistion();
    if (!userReq.length) return { subscription: [], total: null };

    const transactions = await fetchTransactions(userReq);
    const totalSpendings = await calculateSpendings(transactions);

    const result = { subscription: transactions, total: totalSpendings };
    await RedisCacheService.setCachedData(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch subscriptions",
    });
  }
};

/**
 * Fetches transactions for all user requisitions.
 * @param userReq - Array of user requisitions.
 * @returns {Promise<transactionProps[]>}
 */
const fetchTransactions = async (
  userReq: { id: string; status: boolean }[]
): Promise<transactionProps[]> => {
  const transactionPromises = userReq.map(async (element) => {
    const transactionId = Array.isArray(element.id)
      ? element.id[0]
      : element.id;
    const transac = await getAccountTransactions(transactionId);

    if (!transac?.transactions?.booked) return [];

    return transac.booked.map((e: transactionProps) => ({
      ...e,
      finAbonnement: SubscriptionService.calculateEndDate(e.bookingDate, {
        plan: SubscriptionPlan.MONTHLY,
      }),
    }));
  });

  const allTransactions = await Promise.all(transactionPromises);
  return allTransactions.flat();
};

const getUserRequistion = async (): Promise<
  { id: string; status: boolean }[]
> => {
  const id = await getUser();
  if (!id) throw new Error("UNAUTHORIZED");

  const totalOrFirstThree = await canAddAccount();

  const req = await db
    .select({ id: RequisitionTable.accounts, status: RequisitionTable.status })
    .from(RequisitionTable)
    .where(eq(RequisitionTable.userId, id))
    .limit(totalOrFirstThree ? Number.MAX_SAFE_INTEGER : 3)
    .execute();

  return req.map((r) => ({
    id: r.id as string,
    status: r.status === "ACTIVE",
  }));
};
