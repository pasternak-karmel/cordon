import { getUser } from "@/data/account";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";

const stripeCustomerIdSchema = z
  .string()
  .nonempty("Stripe customer ID cannot be empty");

export const setStripeCustomerId = async (
  stripeCustomerId: string
): Promise<void> => {
  const userId = await getUser();

  if (!userId || !stripeCustomerId) {
    throw new Error(
      "❌ Invalid input: User ID and Stripe Customer ID are required."
    );
  }

  try {
    stripeCustomerIdSchema.parse(stripeCustomerId);

    const existingUser = await db
      .select({ stripe_customer_id: users.stripe_customer_id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute();

    if (!existingUser.length) {
      throw new Error(`❌ User with ID ${userId} not found.`);
    }

    if (existingUser[0].stripe_customer_id) {
      console.warn(
        `⚠️ User ${userId} already has a Stripe customer ID. Skipping update.`
      );
      return;
    }

    await db
      .update(users)
      .set({ stripe_customer_id: stripeCustomerId })
      .where(eq(users.id, userId))
      .execute();

    console.log(`✅ Stripe customer ID updated for user ${userId}`);
  } catch (error) {
    console.error(
      `❌ Error updating Stripe customer ID for user ${userId}:`,
      error
    );
    throw error;
  }
};
