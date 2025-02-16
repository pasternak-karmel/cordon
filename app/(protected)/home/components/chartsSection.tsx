import { CreditCardCard, PieChartCard } from "@/app/_components/cards";
import { BarChartComponent } from "@/app/_components/chartComponent";
import { ChartData, transactionProps } from "@/interface";

export default function ChartsSection({
  subscriptions,
  total,
}: {
  subscriptions: transactionProps[] | null;
  total: number;
}) {
  // Process subscription data for the chart
  const chartData = subscriptions?.map((sub) => ({
    name: sub.SubscriptionTitle,
    total: sub.subscriptionPrice,
  }));

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[450px] h-full">
        <BarChartComponent
          data={chartData as ChartData[]}
          total={total ? total : 0}
        />
      </div>
      <div className="w-full lg:w-[300px] flex flex-col sm:flex-row lg:flex-col gap-4 lg:space-y-2">
        <div className="w-full">
          <PieChartCard />
        </div>
        <div className="w-full">
          <CreditCardCard cardNumber="4111111111111111" cardType="MasterCard" />
        </div>
      </div>
    </div>
  );
}
