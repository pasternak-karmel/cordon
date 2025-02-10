import EmptySubscription from "./components/emptySubscription";
import { EmptyPage } from "./components/noSubscriptionEmptyPage";
import { trpc } from "@/trpc/client";

// import EmptySubscription from "./emptySubscription";
export default async function Dashboard() {
  const {data : sub, isLoading } = trpc.getUserSubscriptions.useQuery()
  if(sub?.subscription.length === 0)
  {return (
    <>
      <EmptySubscription/>
      
    </>
    
  )
  }
  else if (false) {
    return <div className="w-full h-[50vh] p-6">
      <EmptyPage />
    </div>;
  }
  
  // design pour chaque composant aussi à refaire j'ai juste déplacé
  // ici tu retourne 2 chose avant de display le contenu

  //1 - s'il n'a aucun compte linked tu retournes an empty screen que tu vas faire

  // tu retournes un empty screen si subscription.length === 0

  // const userRes = await userSub();
  // if (userRes.subscription.length === 0) return <EmptySubscription />;

  return (
    <div className="px-6 pt-8">
      <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>

      <div className="w-full flex flex-row gap-4">
        <div className="w-[450px] h-full">
          <BarChartCard total={120} />
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
      <div className="">
        <h2 className="my-3 text-gray-800 text-xl">Next Payments</h2>

        <ScrollArea className="whitespace-nowrap">
          <div className="flex flex-row flex-wrap gap-4">
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
                    // on na pas image depuis l'api
                    imageUrl="/netflix.jpg"
                  />
                </div>
              </div>
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className=" flex flex-row gap-4 flex-wrap mt-4 h-[200px]">
        <div>
          <SubscriptionsRecommandations />
        </div>
        <div className="h-full flex flex-col justify-between gap-3 bg-white p-3 rounded-md shadow-md w-[350px]">
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
      <div className="fixed right-0 bottom-3">
        <SubscriptionDetailsCard
        // SubscriptionTitle="Netflix"
        // subscriptionLogoUrl="/netflix.jpg"
        // remainingDays={12}
        // startingDate="29 August 2024"
        // endingDate="29 August 2025"
        // subscriptionPrice={145}
        // subscriptionType="Entertainment"
        // subscriptionCategory="Family Plan"
        // paymentsHistory={[
        //   {
        //     paymentDate: "20 August 2024",
        //     paymentCategory: "Family Plan",
        //   },
        //   {
        //     paymentDate: "20 August 2024",
        //     paymentCategory: "Family Plan",
        //   },
        //   {
        //     paymentDate: "20 August 2024",
        //     paymentCategory: "Family Plan",
        //   },
        // ]}
        />
      </div>
    </div>
  );
}
