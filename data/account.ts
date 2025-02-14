import { eq } from "drizzle-orm";
import "server-only";

import { auth } from "@/auth";
import { db, users } from "@/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};

export const getUser = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return null;

  const user = await getUserByEmail(session.user.email);

  if (!user) return null;

  return user.id;
};

export const getUserStripeCustomerId = async () => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) return null;
    const id = await getUserByEmail(session.user.email);
    if (!id) return null;
    return id.stripe_customer_id;
  } catch {
    return null;
  }
};
