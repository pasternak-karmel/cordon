import { db, users } from "@/db/schema";
import "server-only";

export const setStripeCustomerId = async (id: string) => {
  try {
    // should check if it's null
    await db.update(users).set({ stripe_customer_id: id }).execute();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
