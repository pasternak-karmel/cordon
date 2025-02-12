import "server-only";

import { auth } from "@/auth";
import { getUser, getUserByEmail } from "@/data/account";
import { db, RequisitionTable } from "@/db/schema";
import { transactionProps } from "@/interface";
import { eq } from "drizzle-orm";
import { canAddAccount } from "./admin";
import { getAccountTransactions } from "./banque/userBanque";
import { calculateEndSubscriptions, calculateSpendings } from "./estimate";

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

    const transac = await getAccountTransactions(transactionId);

    if (!transac || !transac.booked) return [];

    console.log("Transactions for ID:", transactionId);
    console.table(transac.booked);

    return Promise.all(
      transac.booked.map(
        async (e: { finAbonnement: string; bookingDate: string }) => {
          e.finAbonnement = await calculateEndSubscriptions(e.bookingDate);
          return e;
        }
      )
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

export const getInsert = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error("UNAUTHORIZED");
  }

  const res = await getUserByEmail(session.user.email);

  if (!res) {
    throw new Error("User not found");
  }

  const req = {
    requisitionId: "61408e9b-77d4-4831-b337-8f4b16e4c232",
    status_short: "ACTIVE",
    status_long: "ACTIVE",
    status_description: "ACTIVE",
    agreement:
      "https://www.paypal.com/fr/webapps/mpp/ua/useragreement-full?locale.x=fr_FR",
    accounts: ["7d653afe-8f78-4ecb-a4ac-f142b91cc575"],
    reference: "f7b4b638-d6f8-4553-8a0d-cf0b1c0da9b4",
    user_language: "FR",
    linkStatus: "active",
    lastSyncAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "ACTIVE",
    institutionName: "Paypal",
  };

  await db.insert(RequisitionTable).values({
    userId: res.id,
    ...req,
  });
};
