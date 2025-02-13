import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function HomeSkeleton() {
  return (
    <div className="px-6 pt-8">
      {/* Spendings Section Header */}
      <Skeleton className="h-8 w-32 my-3" />

      {/* Charts Section */}
      <div className="w-full flex flex-row gap-4">
        {/* Bar Chart Skeleton */}
        <div className="w-[450px]">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Pie Chart and Credit Card Section */}
        <div className="w-[300px] flex flex-col space-y-2">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
      </div>

      {/* Next Payments Section */}
      <div className="mt-8">
        <Skeleton className="h-8 w-40 mb-4" />

        <div className="flex flex-row flex-wrap gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="md:basis-1/2 lg:basis-[25%]">
              <div className="py-2">
                <Skeleton className="h-[210px] w-[350px] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-row gap-4 flex-wrap mt-4 h-[200px]">
        {/* Recommendations Skeleton */}
        <Skeleton className="h-full w-[350px] rounded-lg" />

        {/* Recent Subscriptions Skeleton */}
        <div className="h-full flex flex-col gap-3 p-3 w-[350px]">
          <Skeleton className="h-6 w-48" />
          <ScrollArea className="h-[150px]">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-md" />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
