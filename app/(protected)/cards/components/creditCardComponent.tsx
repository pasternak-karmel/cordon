/*import { CreditCardProps } from "@/interface";*/
import { CirclePlus,  Search, Wallet, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

/*export function CreditCardComponent2({
  bankName,
  amount,
  status,
  cardNumber,
  bankImage,
}: CreditCardProps) {
  return (
    <Card className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm opacity-80 mb-1">{status}</p>
          <p className="font-medium">{bankName}</p>
        </div>
        <CreditCard className="w-8 h-8" />
      </div>
      <div className="mb-3">
        <p className="text-sm opacity-80 mb-1">NUMBER</p>
        <p className="font-medium">{cardNumber}</p>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm opacity-80 mb-1">Balance</p>
          <p className="text-2xl font-semibold">${amount}</p>
        </div>
        <Image src={bankImage} alt="Mastercard" width={32} height={32} />
      </div>
    </Card>
  );
}*/

type CreditCardProps = {
  cardType: string;
  cardNumber: string;
  amount: number;
}

export const CreditCardComponent = ({cardType, cardNumber, amount} : CreditCardProps) => {
  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm w-[280px] bg-white">
      <div className="flex gap-3 pb-6 border-b border-gray-200">
        <div className="bg-gray-200 p-2 rounded-lg">
          <Wallet size={20} />
        </div>
        <div className="flex flex-col justify-around">
          <h6 className="text-sm">{cardType}</h6>
          <h6 className="text-sm font-thin ">{cardNumber}</h6>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <h6>${amount}</h6>
        <CirclePlus color="gray" size={20}/>
      </div>
    </div>
  );
};


export const TransactionsCards = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex flex-row justify-between pb-6 border-b border-gray-200">
        <h3 className="my-auto text-lg">Recent Payments</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
          <Search size={22} className="absolute right-2 top-1/2 -translate-y-1/2"/>

          <Input/>

          </div>
          <CirclePlus size={22}/>
          
        </div>
      </div>
      <div className="flex flex-col mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Payment key={index}/>
        ))}
      </div>

    </div>
  )
}
const Payment = () => {
  return (
    <div className="flex justify-between items-center hover:bg-gray-50 cursor-pointer rounded-sm py-[10px]">
      <div className="flex gap-3">
        <Image src="/netflix.jpg" alt="Netflix" width={40} height={40} className="rounded-full" />
        <div className="flex flex-col justify-around">
          <h6 className="text-sm">Netflix</h6>
          <h6 className="text-sm">Entertainment</h6>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <h6 className="text-red-600">$120</h6>
        <ChevronRight color="gray"/>
      </div>
    </div>
  )
}