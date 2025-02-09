import { PricingCard } from "@/app/(protected)/pricing/components/pricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCardProps, PricingSectionProps } from "@/interface/index";

export default function PricingPage() {
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
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include 14-day free trial.
        </p>
      </div>

      <div className="mb-8 flex items-center justify-center gap-4">
        <Tabs
          defaultValue="monthly"
          className="w-full"
        >
          <div className="flex flex-col items-center gap-4">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="monthly">
                Monthly billing
              </TabsTrigger>
              <TabsTrigger value="annual">
                Annual billing
                <span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="w-full">
              <PricingSection billingCards={monthlyBilling} />
            </TabsContent>
            <TabsContent value="annual" className="w-full">
              <PricingSection billingCards={annualBilling} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="mt-16 border-t pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FAQCard
            question="How does the 14-day trial work?"
            answer="You can try any plan free for 14 days. No credit card required."
          />
          <FAQCard
            question="Can I switch plans later?"
            answer="Yes, you can upgrade or downgrade your plan at any time."
          />
          <FAQCard
            question="What payment methods do you accept?"
            answer="We accept all major credit cards, PayPal, and bank transfers."
          />
        </div>
      </div>
    </div>
  );
}

const PricingSection = ({ billingCards }: PricingSectionProps) => {
  return (
    <div className="w-full flex flex-row flex-wrap gap-5 md:justify-between justify-center">
      {billingCards.map((card, index) => (
        <PricingCard key={index} {...card} />
      ))}
    </div>
  );
};

const FAQCard = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};
