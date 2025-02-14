import "server-only";

import { getUser } from "@/data/account";
import { db, RequisitionTable } from "@/db/schema";
import { transactionProps } from "@/interface";
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
  const id = await getUser();
  if (!id) return { subscription: [], total: null };

  const userReq = await getUserRequistion();
  if (!userReq.length) return { subscription: [], total: null };

  const transactionPromises = userReq.map(async (element) => {
    const transactionId = Array.isArray(element.id)
      ? element.id[0]
      : element.id;

    console.log("transactionId", transactionId);

    const transac = await getAccountTransactions(transactionId);
    console.log(
      "this is in getAccountTransactions",
      JSON.stringify(transac.data, null, 2)
    );
    if (!transac || !transac.transactions || !transac.transactions.booked)
      return [];

    // console.table(transac.transactions.booked);
    // console.log("1");
    // console.dir(transac.booked, { depth: null });
    // console.log("2");
    // console.log(JSON.stringify(transac.transactions.booked, null, 2));

    return Promise.all(
      transac.booked.map(async (e: transactionProps) => {
        e.finAbonnement = SubscriptionService.calculateEndDate(e.bookingDate, {
          plan: SubscriptionPlan.MONTHLY,
        });
        return e;
      })
    );
  });

  const allTransac = (await Promise.all(transactionPromises)).flat();

  const totalSpendings = await calculateSpendings(allTransac);

  // should check if the user has a subscription more than basic to call gemini I guess

  return { subscription: allTransac, total: totalSpendings };
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
