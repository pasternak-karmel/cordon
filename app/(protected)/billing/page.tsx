import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { BillingCard } from "./components/billingCard";
import { InvoiceTable } from "./components/invoiceTable";

export default function Billing() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h6 className="text-3xl">Plan & Billing</h6>
        <h6 className="text-gray-400">
          Manage your plan and billing history here.
        </h6>
      </div>

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
      <h6 className="text-xl">Previous Invoices</h6>
      <div>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-row justify-between flex-wrap"><TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="all">View all</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="relative w-fit">
          <Search className="absolute right-3 top-1" color="gray" />
          <Input placeholder="Search..." />
        </div></div>
          
          <TabsContent value="all" className="w-full">
            <InvoiceTable />
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
}
