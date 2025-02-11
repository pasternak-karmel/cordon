"use client";
import {
  BarChartCard,
  CreditCardCard,
  PieChartCard,
  RecentSubscriptions,
  SubscriptionCard,
  SubscriptionDetailsCard,
  SubscriptionsRecommandations,
} from "@/app/_components/cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNextPaymentStore } from "@/store/useNextPaymentStore";
import { trpc } from "@/trpc/client";
import { EmptyPage } from "./components/emptyPage";
import EmptySubscription from "./components/emptySubscription";

export default function Dashboard() {
  const { subscription } = useNextPaymentStore();
  const { data: sub, isLoading } = trpc.getUserSubscriptions.useQuery();
  const { data: hasLinkedAccount } = trpc.hasLinkedAccount.useQuery();
  if (isLoading) {
    return (
      <div className="px-6 pt-8">
        {/* Spendings Section Header */}
        <Skeleton className="h-8 w-32 my-3" />

        {/* Charts Section */}
        <div className="w-full flex flex-row gap-4">
          {/* Bar Chart Skeleton */}
          <div className="w-[450px]">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

          {/* Pie Chart and Credit Card Section */}
          <div className="w-[300px] flex flex-col space-y-2">
            <Skeleton className="h-[150px] w-full rounded-lg" />
            <Skeleton className="h-[150px] w-full rounded-lg" />
          </div>
        </div>

        {/* Next Payments Section */}
        <div className="mt-8">
          <Skeleton className="h-8 w-40 mb-4" />

          <div className="flex flex-row flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="md:basis-1/2 lg:basis-[25%]">
                <div className="py-2">
                  <Skeleton className="h-[210px] w-[350px] rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row gap-4 flex-wrap mt-4 h-[200px]">
          {/* Recommendations Skeleton */}
          <Skeleton className="h-full w-[350px] rounded-lg" />

          {/* Recent Subscriptions Skeleton */}
          <div className="h-full flex flex-col gap-3 p-3 w-[350px]">
            <Skeleton className="h-6 w-48" />
            <ScrollArea className="h-[150px]">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full rounded-md" />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  } else if (sub?.subscription.length === 0) return <EmptySubscription />;
  else if (!hasLinkedAccount)
    return (
      <div className="mt-5 h-[50vh]">
        <EmptyPage />
      </div>
    );
  else
    return (
      <div className="px-4 sm:px-6 pt-8 h-fit">
        <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>

        {/* Charts Section */}
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-[450px] h-full">
            <BarChartCard total={120} />
          </div>
          <div className="w-full lg:w-[300px] flex flex-col sm:flex-row lg:flex-col gap-4 lg:space-y-2">
            <div className="w-full">
              <PieChartCard />
            </div>
            <div className="w-full">
              <CreditCardCard
                cardNumber="4111111111111111"
                cardType="MasterCard"
              />
            </div>
          </div>
        </div>

        {/* Next Payments Section */}
        <div className="mt-8">
          <h2 className="my-3 text-gray-800 text-xl">Next Payments</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full sm:w-[350px]">
                <div className="py-2">
                  <SubscriptionCard
                    title="Netflix"
                    subscriptionCategory="Family Plan"
                    startingDate={"29 Aug 2022"}
                    endingDate={"28 Aug 2023"}
                    remainingDays={12}
                    subscriptionPrice={145}
                    imageUrl="/netflix.jpg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="w-full lg:w-auto">
            <SubscriptionsRecommandations />
          </div>
          <div className="w-full lg:w-[350px] flex flex-col justify-between gap-3 bg-white p-3 rounded-md shadow-md">
            <h3>Recent Subscriptions</h3>
            <ScrollArea className="h-[150px]">
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((_, index) => (
                  <RecentSubscriptions
                    key={index}
                    title="Netflix"
                    SubscriptionImage="/netflix.jpg"
                    endingDate="20 August 2024"
                    subscriptionPrice={120}
                    subscriptionCategory="Yearly"
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Details Card */}
        {subscription.SubscriptionTitle ? (
          <div className="fixed right-0 bottom-3 animate-slide-in z-50 w-full sm:w-auto px-4 sm:px-0">
            <SubscriptionDetailsCard />
          </div>
        ) : null}
      </div>
    );
}
