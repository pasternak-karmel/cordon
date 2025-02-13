import FaqsSection from "./components/faqsSection";
import PricingSection from "./components/pricingSection";

export default function PricingPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include 14-day free
          trial.
        </p>
      </div>
      <PricingSection />
      <FaqsSection />
    </div>
  );
}
