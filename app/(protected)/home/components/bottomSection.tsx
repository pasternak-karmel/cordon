import {
  RecentSubscriptions,
  SubscriptionsRecommandations,
} from "@/app/_components/cards";
import { trpc } from "@/trpc/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function BottomSection() {
  const { data: recentSuscriptions } = trpc.getRecentSubscription.useQuery();

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="w-full lg:w-auto">
        <SubscriptionsRecommandations />
      </div>
      <div className="w-full lg:w-[350px] flex flex-col justify-between gap-3 bg-white p-3 rounded-md shadow-md">
        <h3>Recent Subscriptions</h3>
        <ScrollArea className="h-[150px]">
          <div className="flex flex-col gap-3">
            {recentSuscriptions?.map((_, index) => (
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
  );
}
