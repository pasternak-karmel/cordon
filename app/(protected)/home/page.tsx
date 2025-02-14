"use client";
import { trpc } from "@/trpc/client";
import BottomSection from "./components/bottomSection";
import ChartsSection from "./components/chartsSection";
import DetailCard from "./components/detailCard";
import { EmptyPage } from "./components/emptyPage";
import EmptySubscription from "./components/emptySubscription";
import HomeSkeleton from "./components/homeSkeleton";
import NextPaymentSection from "./components/nextPaymentSection";

export default function Dashboard() {
  const { data: sub, isLoading } = trpc.getUserSubscriptions.useQuery();
  const { data: hasLinkedAccount } = trpc.hasLinkedAccount.useQuery();
  if (isLoading) {
    return <HomeSkeleton />;
  } else if (!sub || sub?.subscription.length === 0)
    return <EmptySubscription />;
  else if (hasLinkedAccount)
    return (
      <div className="mt-5 h-[50vh]">
        <EmptyPage />
      </div>
    );
  else
    return (
      <div className="px-4 sm:px-6 pt-8 h-fit">
        {/*  mets ceci en composant */}
        <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>
        {/* Charts Section */}
        <ChartsSection
          subscriptions={sub.subscription}
          total={sub.total ? sub.total : 0}
        />

        {/* Next Payments Section */}
        <NextPaymentSection />

        {/* Bottom Section */}
        <BottomSection />

        {/* Details Card */}
        <DetailCard />
      </div>
    );
}
