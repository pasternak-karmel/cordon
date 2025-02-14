import { PricingSectionProps } from "@/interface";
import { PricingCard } from "./pricingCard";

export default function PricingGroup ({ billingCards }: PricingSectionProps)  {
  return (
    <div className="w-full flex flex-row flex-wrap gap-5 md:justify-between justify-center">
      {billingCards.map((card, index) => (
        <PricingCard key={index} {...card} />
      ))}
    </div>
  );
};
