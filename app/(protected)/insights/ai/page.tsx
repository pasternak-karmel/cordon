"use client";
import { useState } from "react";
import RightColum from "./components/rightColumn";
import LeftColum from "./components/leftColum";

const analysisOptions = [
  {
    id: "spending",
    label: "Spending Patterns Analysis",
  },
  {
    id: "savings",
    label: "Savings Opportunities",
  },
  {
    id: "budget",
    label: "Budget Optimization",
  },
  {
    id: "subscriptions",
    label: "Subscription Management",
  },
  {
    id: "investment",
    label: "Investment Recommendations",
  },
  {
    id: "financial-goals",
    label: "Financial Goals Planning",
  },
  {
    id: "debt",
    label: "Debt Management Strategies",
  },
  {
    id: "cashflow",
    label: "Cash Flow Optimization",
  },
];

export default function AiInsightsPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");

  const handleAnalyze = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(
        "Based on your selected criteria, here are your personalized financial insights..."
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">AI Financial Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center w-full">
          <LeftColum analysisOptions={analysisOptions} handleAnalyze={handleAnalyze} selectedOptions={selectedOptions} isGenerating={isGenerating} setSelectedOptions={setSelectedOptions} />
        </div>
        

        <RightColum generatedContent={generatedContent} />
      </div>
    </div>
  );
}
