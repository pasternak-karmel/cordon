"use server";

// calculer montant total entrain d'être dépensé
export const calculateSpendings = async () => {};

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

export const getRecentSubscription = async () => {};
