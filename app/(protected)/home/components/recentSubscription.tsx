"use client";

import { RecentSubscriptions } from "@/app/_components/cards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/client";
import { RecentSubscriptionSkeleton } from "./skeleton";
// import { useIntl } from "react-intl";

const RecentSubscription = () => {
  const { data: subscription, isLoading } =
    trpc.getUserSubscriptions.useQuery();

  if (isLoading) {
    return <RecentSubscriptionSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[400px]">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Subscriptions
      </h3>
      <ScrollArea className="h-[200px] overflow-auto">
        <div className="flex flex-col gap-4">
          {subscription && subscription.subscription.length > 0 ? (
            subscription.subscription.map((sub, index) => (
              <RecentSubscriptions
                key={index}
                title={sub.debtorName || "Unknown Service"}
                SubscriptionImage={"/netflix.jpg"}
                endingDate={
                  sub.finAbonnement
                  // ? formatDate(new Date(sub.finAbonnement), {
                  //     year: "numeric",
                  //     month: "long",
                  //     day: "numeric",
                  //   })
                  // : "No end date"
                }
                subscriptionPrice={
                  sub.transactionAmount.amount
                  // ? formatNumber(sub.transactionAmount.amount, {
                  //     style: "currency",
                  //     currency: sub.transactionAmount.currency || "USD",
                  //   })
                  // : "$0.00"
                }
                subscriptionCategory={"Yearly"}
              />
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No recent subscriptions found.</p>
            </div>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default RecentSubscription;
