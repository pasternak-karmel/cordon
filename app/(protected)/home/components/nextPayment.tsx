"use client";
import { getRecentSubscription } from "@/actions/estimate";
import { SubscriptionCard } from "@/app/_components/cards";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const NextPayment = () => {
  const { data: payment, isLoading } = useQuery({
    queryKey: ["nextPayment"],
    queryFn: getRecentSubscription,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader className="h-5 w-5 animate-spin" />
      </div>
    );
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
                    endingDate={data.finAbonnement}
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
