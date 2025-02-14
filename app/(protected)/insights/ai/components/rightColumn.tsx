import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function RightColum({generatedContent}:{generatedContent : string}) {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">AI Generated Insights</h2>
      <ScrollArea className="h-[500px] w-full rounded-md border p-4">
        {generatedContent ? (
          <div className="prose prose-sm">
            <p>{generatedContent}</p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            <p>Select criteria and click analyze to generate insights</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
