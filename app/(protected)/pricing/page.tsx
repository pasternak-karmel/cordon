import { PricingCard } from "@/app/(protected)/pricing/components/pricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCardProps, PricingSectionProps } from "@/interface/index";

export default function page() {
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
    <div className="w-full">
      {/*
              <h6 className="text-4xl font-thin text-justify mt-10">
              We have got a plan that&apos;s perfect for you
              </h6>
          */}
      <Tabs
        defaultValue="monthly"
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="monthly" className="w-fit">
            Monthly billing
          </TabsTrigger>
          <TabsTrigger value="annual" className="w-fit">
            Annual billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="w-full h-full">
          <PricingSection billingCards={monthlyBilling} />
        </TabsContent>
        <TabsContent value="annual" className="w-full h-full">
          <PricingSection billingCards={annualBilling} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const PricingSection = ({ billingCards }: PricingSectionProps) => {
  return (
    <div className="h-full">
      <div className="w-full h-full flex flex-wrap justify-center gap-5 items-center">
        {billingCards.map((card, index) => (
          <PricingCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
