import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function LeftColum({
  analysisOptions,
  handleAnalyze,
  selectedOptions,
  isGenerating,
  setSelectedOptions,
}: {
  analysisOptions: {
    id: string;
    label: string;
  }[];
  handleAnalyze: () => Promise<void>;
  selectedOptions: string[];
  isGenerating: boolean;
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit w-full">
      <h2 className="text-lg font-semibold mb-4">Select Analysis Criteria</h2>
      <div className="space-y-4">
        {analysisOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={(checked) => {
                setSelectedOptions(
                  checked
                    ? [...selectedOptions, option.id]
                    : selectedOptions.filter((id) => id !== option.id)
                );
              }}
            />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      <Button
        onClick={handleAnalyze}
        disabled={selectedOptions.length === 0 || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        {isGenerating ? "Generating Insights..." : "Analyze"}
      </Button>
    </div>
  );
}
