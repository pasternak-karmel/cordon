import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTabs from "../_component/all";
import PersonTabs from "../_component/person";
import RemoteTabs from "../_component/remote";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Remote">Remote</TabsTrigger>
            <TabsTrigger value="person">In person</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllTabs />
          </TabsContent>
          <TabsContent value="Remote">
            <RemoteTabs />
          </TabsContent>
          <TabsContent value="person">
            <PersonTabs />
          </TabsContent>
        </Tabs>
        <Button variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left">
          Add an account
        </Button>
      </div>
    </div>
  );
}
