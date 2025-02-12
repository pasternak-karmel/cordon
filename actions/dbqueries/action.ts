"use server";
// import "server-only";

// import { db, RequisitionTable } from "@/db/schema";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/account";
import { db, RequisitionTable } from "@/db/schema";
import { userRequistionProps } from "@/interface";
import { getOneRequisition } from "../banque/userBanque";

export const getAllBankAccounts = async () => {
  try {
    //should return all user account
  } catch (error) {
    console.error("Error inserting requistion:", error);
    throw error;
  }
};

export const saveRequisition = async (id: string, callback: string) => {
  console.log("this is the callback", callback);

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error("UNAUTHORIZED");
  }

  const res = await getUserByEmail(session.user.email);

  if (!res) {
    throw new Error("User not found");
  }

  const req: userRequistionProps = await getOneRequisition(id);

  if (!req.accounts || req.accounts.length === 0) {
    throw new Error("No accounts found in the requisition");
  }

  if (req.reference !== callback) {
    throw new Error("Reference and callback do not match");
  }

  await db.insert(RequisitionTable).values({
    userId: res.id,
    requisitionId: req.id,
    agreement: req.agreement,
    accounts: req.accounts,
    reference: req.reference,
    institutionName: req.institution_id,
    status: req.status,
    lastSyncAt: new Date(),
  });
  return;
};

// (2d954738-748a-4014-9432-ed2e531b341b, 6a8d43ae-c58f-4cf0-affa-80a6292ebaaf, null, null, null, null, 44fd6be9-1cd5-4b4a-ac5d-db967d2e8b7b, ["4972f160-e90e-4f92-9ce2-7b18457eea17"], 2d954738-748a-4014-9432-ed2e531b341b, null, active, null, 2025-02-12 09:55:19.58031, 2025-02-12 09:55:19.58031, LN, null)
