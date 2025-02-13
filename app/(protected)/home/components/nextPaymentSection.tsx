import { SubscriptionCard } from "@/app/_components/cards";

export default function NextPaymentSection() {
  return (
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
  );
}
