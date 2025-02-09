import { CloudDownload } from "lucide-react";
import Image from "next/image";
interface InvoiceTableProps {
  id: number;
  date: string;
  plan: string;
  amount: number;
}
export function InvoiceTable() {
  const invoiceData: InvoiceTableProps[] = [
    { id: 2, date: "2022-02-01", plan: "Premium Plan", amount: 150 },
    { id: 3, date: "2022-03-01", plan: "Pro Plan", amount: 200 },
    { id: 4, date: "2022-03-01", plan: "Pro Plan", amount: 200 },
    { id: 5, date: "2022-03-01", plan: "Pro Plan", amount: 200 },
  ];
  return (
    <div className="text-xs sm:text-base">
      {invoiceData.map((_invoice, index) => (
          <div key={index} className="flex flex-row justify-between py-4 border-t border-gray-200 px-1 rounded-lg cursor-pointer hover:bg-gray-200">
              <div className="flex flex-row gap-3">
              <Image src={"/pdf.png"} width={20} height={20} alt="pdf file icon"/>
                  <h6>Invoice {_invoice.id}</h6>
              </div>
              <div className="flex flex-row gap-4 sm:text-sm text-gray-400">
              <h6>{_invoice.plan}</h6>
                  <h6>{_invoice.date}</h6>
                  <h6>${_invoice.amount}</h6>
                  <CloudDownload color="gray"/>
              </div>
              
              
        </div>
      ))}
    </div>
  );
}
