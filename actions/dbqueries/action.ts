"use server";
// import { db, RequisitionTable } from "@/db/schema";

import { db, RequisitionTable } from "@/db/schema";
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
  console.log(callback);
  const req = await getOneRequisition(id);

  if (!req.accounts || req.accounts.length === 0) {
    throw new Error("No accounts found in the requisition");
  }

  if (req.reference !== callback) {
    throw new Error("Reference and callback do not match");
  }

  await db.insert(RequisitionTable).values(req);
  return;
};
