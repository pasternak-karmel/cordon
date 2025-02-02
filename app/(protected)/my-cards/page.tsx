import { CreditCardComponent } from "@/app/(protected)/my-cards/components/creditCardComponent";
import { ProfileCard } from "@/app/(protected)/my-cards/components/profileCard";

// rename le nom de la page padre
export default function page() {
  return (
    <div className="flex flex-row w-full space-x-8">
      <div className="w-[20%]">
        <ProfileCard />
      </div>
      <div className="flex flex-wrap gap-4 h-fit w-[80%] self-center">
        {Array.from({ length: 6 }).map((_card, i) => (
          <div key={i} className="w-[375px]">
            <CreditCardComponent
              bankName="Citibank"
              cardNumber={1269756226}
              bankImage="/userImage.png"
              amount={0}
              status="Unknow"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
