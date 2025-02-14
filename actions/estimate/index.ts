import "server-only";
// "use server";

import { transactionProps } from "@/interface";
import { userSub } from "../calcule";

// calculer montant total entrain d'être dépensé
export const calculateSpendings = async (
  allTransac: transactionProps[]
): Promise<number | null> => {
  try {
    if (!allTransac || allTransac.length === 0) {
      console.log("Aucune transaction trouvée.");
      return null;
    }

    const totalSpendings = allTransac.reduce((total, transaction) => {
      return total + transaction.transactionAmount.amount;
    }, 0);

    return totalSpendings;
  } catch (error) {
    console.error("Erreur lors de la calcul du total des dépenses :", error);
    return null;
  }
};

// determine next payment échéance
export const calculateEndSubscriptions = async (startDate: string) => {
  // je dois gérer le cas ou subscription et le next payment date is older than today

  const today = new Date();

  const start = new Date(startDate);

  if (start < today) {
    // throw new Error("The subscription start date is older than today.");
    console.warn("The subscription start date is older than today.");
  }

  const next = new Date(start);
  next.setMonth(start.getMonth() + 1);

  return next.toISOString().split("T")[0];
};

export const getRecentSubscription = async (): Promise<transactionProps[]> => {
  const today = new Date();
  const start = new Date(today);

  const end = new Date(today);

  const userSubscription = await userSub();

  if (!userSubscription.subscription) return [];

  return userSubscription.subscription.filter(
    (subscription) =>
      subscription.bookingDate >= start.toISOString() &&
      subscription.finAbonnement <= end.toISOString()
  );
};
