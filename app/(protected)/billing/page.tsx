import BillingSection from "./components/billingSection";
import PreviousInvoicesSections from "./components/previousInvoicesSections";

export default function Billing() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <h6 className="text-3xl">Plan & Billing</h6>
        <h6 className="text-gray-400">
          Manage your plan and billing history here.
        </h6>
      </div>
      <BillingSection />
      <h6 className="text-xl">Previous Invoices</h6>
      <PreviousInvoicesSections />
    </div>
  );
}
