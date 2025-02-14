import { BillingCard } from "./billingCard";

export default function BillingSection() {
  return (
    <div className="w-full flex flex-row flex-wrap lg:justify-between justify-center gap-5">
      <BillingCard
        plan="Basic Plan"
        amount={10}
        advantages={[
          "Unlimited events",
          "Unlimited attendees",
          "Unlimited tickets",
          "Unlimited organizers",
        ]}
        isActive
      />
      <BillingCard
        plan="Basic Plan"
        amount={10}
        advantages={[
          "Unlimited events",
          "Unlimited attendees",
          "Unlimited tickets",
          "Unlimited organizers",
        ]}
        isActive={false}
      />
      <BillingCard
        plan="Basic Plan"
        amount={10}
        advantages={[
          "Unlimited events",
          "Unlimited attendees",
          "Unlimited tickets",
          "Unlimited organizers",
        ]}
        isActive={false}
      />
    </div>
  );
}
