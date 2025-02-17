import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCardProps } from "@/interface/index";
import PricingGroup from "./pricingGroup";

export default function PricingSection() {
  const monthlyBilling: PricingCardProps[] = [
    {
      title: "Free",
      price: 0,
      isPopular: false,
      isPerMonth: true,
      description: "Perfect for individuals and small teams getting started",
      features: [
        "Unlimited events",
        "Unlimited attendees",
        "Unlimited tickets",
        "Unlimited organizers",
      ],
    },
    {
      title: "Pro",
      price: 99,
      isPopular: true,
      isPerMonth: true,
      description: "Great for growing businesses and professional events",
      features: [
        "Unlimited sessions",
        "Unlimited speakers",
        "Unlimited sponsors",
        "Unlimited exhibitors",
      ],
    },
    {
      title: "Enterprise",
      price: 499,
      isPopular: false,
      isPerMonth: true,
      description: "Advanced features for large organizations",
      features: [
        "Unlimited booths",
        "Unlimited networking",
        "Unlimited chat",
        "Unlimited polls",
      ],
    },
  ];
  const annualBilling = [
    {
      title: "Free",
      price: 0,
      isPopular: false,
      isPerMonth: false,
      description: "Perfect for individuals and small teams getting started",
      features: [
        "Unlimited events",
        "Unlimited attendees",
        "Unlimited tickets",
        "Unlimited organizers",
      ],
    },
    {
      title: "Pro",
      price: 948, // 99 * 12 * 0.8 (20% discount)
      isPopular: true,
      isPerMonth: false,
      description:
        "Great for growing businesses and professional events - Save 20% annually",
      features: [
        "Unlimited sessions",
        "Unlimited speakers",
        "Unlimited sponsors",
        "Unlimited exhibitors",
      ],
    },
    {
      title: "Enterprise",
      price: 4790, // 499 * 12 * 0.8 (20% discount)
      isPopular: false,
      isPerMonth: false,
      description:
        "Advanced features for large organizations - Save 20% annually",
      features: [
        "Unlimited booths",
        "Unlimited networking",
        "Unlimited chat",
        "Unlimited polls",
      ],
    },
  ];
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex flex-col items-center gap-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="monthly">Monthly billing</TabsTrigger>
            <TabsTrigger value="annual">
              Annual billing
              <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                Save 20%
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="w-full">
            <PricingGroup billingCards={monthlyBilling} />
          </TabsContent>
          <TabsContent value="annual" className="w-full">
            <PricingGroup billingCards={annualBilling} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
