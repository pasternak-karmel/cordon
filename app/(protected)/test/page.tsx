import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SubscriptionCard,
  CreditCardCard,
  RecentSubscriptions,
  SubscriptionsRecommandations,
  PieChartCard,
  BarChartCard,
} from "@/app/_components/cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
export default async function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full flex flex-row">
        <div className="w-[300px]">
          <BarChartCard />
        </div>
        <div className="w-[300px]">
          <div>
            <CreditCardCard
              cardNumber="4111111111111111"
              cardType="MasterCard"
            />
          </div>
          <div>
            <CreditCardCard
              cardNumber="4111111111111111"
              cardType="MasterCard"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2>Next Payments</h2>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-[20%]">
                <div className="p-1">
                  <div className="flex w-fit items-center justify-center rounded-md overflow-hidden">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/*<DotPattern className="min-h-screen" />*/}

      <div className="w-[50%] flex flex-col gap-4 items-center justify-center">
        <RecentSubscriptions
          title="Netflix"
          SubscriptionImage="/netflix.jpg"
          endingDate="20 August 2024"
          subscriptionPrice={120}
          subscriptionCategory="Yearly"
        />
        <CreditCardCard cardNumber="4111111111111111" cardType="MasterCard" />
        <SubscriptionsRecommandations />
        <PieChartCard />
      </div>
    </div>
  );
}
