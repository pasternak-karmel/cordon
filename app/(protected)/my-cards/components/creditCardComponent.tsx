import { CreditCardProps } from "@/interface";
import { CreditCard, Settings } from "lucide-react";
import Image from "next/image";

export function CreditCardComponent({
  bankName,
  amount,
  status,
  cardNumber,
  bankImage,
}: CreditCardProps) {
  return (
    <div className="py-3 w-full bg-[#ffffff52] shadow-lg rounded-lg ">
      <div className="px-3 flex justify-between pb-3 border-b border-gray-300">
        {bankName} <Settings size={20} color="gray" />
      </div>
      <div className="flex flex-row">
        <div className="p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-3">
              <CreditCard />
              <h6>{cardNumber}</h6>
            </div>
            <span>
              <h6>Status :</h6> <h6>{status}</h6>
            </span>
            <h3 className="text-xl text-blue-500">${amount}</h3>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center space-y-2">
          <Image
            src={bankImage}
            width={80}
            height={50}
            alt="bank image"
            className="rounded-full"
          />
          <button className="bg-[#ffffff71]  w-fulltext-blue-500 py-2 px-3 rounded-full hover:bg-gray-200 text-blue-500">
            <h6>Connect to my Bank</h6>
          </button>
        </div>
      </div>
    </div>
  );
}
