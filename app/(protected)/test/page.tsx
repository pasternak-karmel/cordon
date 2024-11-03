import {
  SubscriptionCard,
  CreditCardCard,
  RecentSubscriptions,
  SubscriptionsRecommandations,
  PieChartCard,
  BarChartCard,
  SubscriptionDetailsCard,
} from "@/app/_components/cards";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default async function Dashboard() {
  return (
    <div className="">
      <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>

      <div className="w-full flex flex-row space-x-4">
        <div className="w-[450px] h-full">
          <BarChartCard />
        </div>
        <div className="w-[300px] flex flex-col space-y-2">
          <PieChartCard />

          <div className="">
            <CreditCardCard
              cardNumber="4111111111111111"
              cardType="MasterCard"
            />
          </div>
        </div>
      </div>
      <div className="w-[95vw]">
        <h2 className="my-3 text-gray-800 text-xl">Next Payments</h2>

        <ScrollArea className="-ml-1 whitespace-nowrap">
          <div className="flex flex-row space-x-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="md:basis-1/2 lg:basis-[25%]">
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

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className=" flex flex-row space-x-8 flex-wrap mt-4 h-[200px]">
        <div>
          <SubscriptionsRecommandations />
        </div>
        <div className="h-full flex flex-col justify-between space-y-3">
          <h3>Recent Subscriptions</h3>
          <ScrollArea className="h-[150px]">
            <div className="space-y-3">
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
              <RecentSubscriptions
                title="Netflix"
                SubscriptionImage="/netflix.jpg"
                endingDate="20 August 2024"
                subscriptionPrice={120}
                subscriptionCategory="Yearly"
              />
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="fixed right-0 bottom-3">
        <SubscriptionDetailsCard
          SubscriptionTitle="Netflix"
          subscriptionLogoUrl="/netflix.jpg"
          remainingDays={12}
          startingDate="29 August 2024"
          endingDate="29 August 2025"
          subscriptionPrice={145}
          subscriptionType="Entertainment"
          subscriptionCategory="Family Plan"
          paymentsHistory={[
            {
              paymentDate: "20 August 2024",
              paymentCategory: "Family Plan",
            },
            {
              paymentDate: "20 August 2024",
              paymentCategory: "Family Plan",
            },
            {
              paymentDate: "20 August 2024",
              paymentCategory: "Family Plan",
            },
            {
              paymentDate: "20 August 2024",
              paymentCategory: "Family Plan",
            },
          ]}
        />
      </div>
    </div>
  );
}
