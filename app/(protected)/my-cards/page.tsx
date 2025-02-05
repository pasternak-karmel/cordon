import { Button } from "@/components/ui/button";
import { DollarSign, Settings } from "lucide-react";
import { CreditCardComponent, TransactionsCards } from "./components/creditCardComponent";
import SubscriptionsCategory from "./components/subscriptionsCategory";
// rename le nom de la page padre
export default function page() {
  return (
    <div className="px-6 pt-8">
      <div className="flex justify-between pb-5 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="bg-blue-600 p-4 w-fit rounded-lg">
            <DollarSign
              size={30}
              color="#2563eb"
              className="bg-white rounded-full"
            />
          </div>
          <div className="flex flex-col justify-around">
            <h6 className="text-gray-500 font-thin">Available Balance</h6>
            <h6 className="font-semibold">$14,500</h6>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="border rounded-md p-2 h-[40px] bg-white cursor-pointer hover:bg-gray-100">
          <Settings size={25}/>

          </div>
          <Button variant={"default"} className="bg-[#2563eb]">Add a new Card</Button>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-12">{Array(1,2,3,4).map((_, index) => (
        <div key={index}>
        <CreditCardComponent cardType="Master Card" cardNumber="1452 1553 1452 1456" amount={1400} />

        </div>
      ))}</div>
      <div className="mt-8 flex flex-row flex-wrap justify-between">
        <div className="w-[650px]">
          <SubscriptionsCategory/>
        </div>
        <div className="w-[480px]">
        <TransactionsCards/>

        </div>
      </div>
      
    </div>
  )
}
