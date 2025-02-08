import { Button } from "@/components/ui/button";
import { PricingCardProps } from "@/interface/index";
import { Check } from "lucide-react";

export function PricingCard({
  title,
  price,
  features,
  isPerMonth,
  description,
  isPopular,
}: PricingCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-2xl border border-gray-200 w-[350px] h-[565px] overflow-hidden">
      <div
        className={`p-5 border-b border-gray-200 ${
          isPopular ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <h6>{title}</h6>
            {isPopular ? (
              <span className="bg-gray-50 p-2 rounded-2xl text-sm">
                Popular
              </span>
            ) : null}
          </div>

          <div className="flex flex-row gap-3">
            <h6 className="text-4xl font-semibold">${price}</h6>
            <div className="flex flex-col justify-around text-sm">
              <h6>per user</h6>

              {isPerMonth ? <h6>per month</h6> : <h6>per year</h6>}
            </div>
          </div>
          <h6>{description}</h6>
          <div className="flex justify-center">
            <Button className="w-full">Choose this plan</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <h6>Features</h6>
        <h6>Everything in our free plan plus</h6>
        <ul className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex flex-row gap-2">
              <div className="p-1 bg-lime-400 rounded-full">
                <Check size={18} />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
