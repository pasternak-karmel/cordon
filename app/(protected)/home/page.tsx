"use client";
import { trpc } from "@/trpc/client";
import { EmptyPage } from "./components/emptyPage";
import NextPayment from "./components/nextPayment";
import RecentSubscription from "./components/recentSubscription";

export default function Dashboard() {
  const { data: hasLinkedAccount } = trpc.hasLinkedAccount.useQuery();
  if (!hasLinkedAccount) return <EmptyPage />;

  return (
    <div className="px-4 sm:px-6 pt-8 h-fit">
      <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>
      {/* a refaire (ça doit pas prendre de paramètres) */}
      {/* <ChartsSection
          subscriptions={sub.subscription}
          total={sub.total ? sub.total : 0}
        /> */}

      <NextPayment />
      <RecentSubscription />
    </div>
  );
}
