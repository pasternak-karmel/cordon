"use client";
import { SubscriptionDetailsCard } from "@/app/_components/cards";
import { useNextPaymentStore } from "@/store/useNextPaymentStore";

export default function DetailCard() {
  const { subscription } = useNextPaymentStore();

  return (
    <>
      {subscription.SubscriptionTitle ? (
        <div className="fixed right-0 bottom-3 animate-slide-in z-50 w-full sm:w-auto px-4 sm:px-0">
          <SubscriptionDetailsCard />
        </div>
      ) : null}
    </>
  );
}
