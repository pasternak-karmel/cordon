"use server";

import { getUser } from "@/data/account";
import { db, RequisitionTable } from "@/db/schema";
import { transactionProps } from "@/interface";
import { eq } from "drizzle-orm";
import { canAddAccount } from "./admin";
import { getAccountTransactions } from "./banque/userBanque";
import { calculateEndSubscriptions, calculateSpendings } from "./estimate";

// savoir tous les abonnements en cours sur une perdiode
// - calculate date de fin - nombre de jour restant

export const userSub = async (): Promise<{
  subscription: transactionProps[] | [];
  total: number | null;
}> => {
  const id = await getUser();
  if (!id) return { subscription: [], total: null };

  const userReq = await getUserRequistion();

  if (!userReq) return { subscription: [], total: null };

  const allTransac: transactionProps[] = [];

  for (let index = 0; index < userReq.length; index++) {
    const element = userReq[index];
    const { id } = element;
    const transac = await getAccountTransactions(id);
    for (let i = 0; i < transac.length; i++) {
      const e = transac[i];
      const fin = await calculateEndSubscriptions(e.bookingDate);
      e.finAbonnement = fin;
    }
    allTransac.push(...transac);
  }

  const totalSpendings = await calculateSpendings(allTransac);

  // should check if the user has a subscription more than basic to call gemini I guess

  return { subscription: allTransac, total: totalSpendings };
};

// : Promise<thisreq[] | null>
const getUserRequistion = async () => {
  const id = await getUser();
  if (!id) {
    throw new Error("there is no requisition for this user in the db");
  }

  const totalOrFirstThree = await canAddAccount();

  const req = await db
    .select({ id: RequisitionTable.id, status: RequisitionTable.status })
    .from(RequisitionTable)
    .where(eq(RequisitionTable.userId, id))
    .limit(totalOrFirstThree ? Number.MAX_SAFE_INTEGER : 3)
    .execute();

  const response = req.map((r) => ({
    ...r,
    status: r.status === "ACTIVE" ? true : false,
  }));

  return response;
};
