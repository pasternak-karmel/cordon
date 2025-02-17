"use client";
import { SubscriptionCard } from "@/app/_components/cards";
import { ScrollBar } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { NextPaymentSkeleton } from "./skeleton";

const NextPayment = () => {
  const { data: payment, isLoading } = trpc.getRecentSubscription.useQuery();

  if (isLoading) {
    return <NextPaymentSkeleton />;
  }

  return (
    <div>
      <div className="">
        <h2 className="my-3 text-gray-800 text-xl">Next Payments</h2>
      </div>
      <ScrollArea className="whitespace-nowrap">
        <div className="flex flex-row flex-wrap gap-4">
          {payment && payment.length > 0 ? (
            payment.map((data, index) => (
              <div key={index} className="md:basis-1/2 lg:basis-[25%]">
                <div className="py-2">
                  <SubscriptionCard
                    title={data.transactionId}
                    subscriptionCategory="abonnement"
                    startingDate={data.bookingDate}
                    endingDate={data.finAbonnement || "could not find end date"}
                    remainingDays={15}
                    subscriptionPrice={data.transactionAmount.amount}
                    // on na pas image depuis l'api
                    imageUrl="/netflix.jpg"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full py-4">
              <p>No upcoming payments found for this month.</p>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default NextPayment;
