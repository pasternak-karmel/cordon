// import { db, RequisitionTable } from "@/db/schema";

export const getAllBankAccounts = async () => {
  try {
    //should return all user account
  } catch (error) {
    console.error("Error inserting requistion:", error);
    throw error;
  }
};

export const saveRequisition = async (requisitionId: string, id: string) => {
  console.log(requisitionId);
  console.log(id);
  // await db.insert(RequisitionTable).values()
  return;
};
