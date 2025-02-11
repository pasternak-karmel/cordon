"use client";
import { BarChartCard, PieChartCard } from "@/app/_components/cards";
import { trpc } from "@/trpc/client";
import EmptySubscription from "./components/emptySubscription";
import NextPayment from "./components/nextPayment";
import RecentSubscription from "./components/recentSubscription";

export default function Dashboard() {
  const { data: sub } = trpc.getUserSubscriptions.useQuery();
  const { data: hasLinkedAccount } = trpc.hasLinkedAccount.useQuery();

  if (sub?.subscription.length === 0 || !hasLinkedAccount)
    return <EmptySubscription />;
  else
    return (
      <div className="px-4 sm:px-6 pt-8 h-fit">
        {/*  mets ceci en composant */}
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
          </div>
        </div>

        <NextPayment />
        <RecentSubscription />
      </div>
    );
}
