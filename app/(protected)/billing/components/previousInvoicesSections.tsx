import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Search } from "lucide-react";
import { useState } from "react";
import { InvoiceTable } from "./invoiceTable";

export default function PreviousInvoicesSections() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-row justify-between flex-wrap">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="all">View all</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="relative w-fit">
            <Search className="absolute right-3 top-1" color="gray" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <TabsContent value="all" className="w-full">
          <InvoiceTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
