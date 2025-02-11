import { Button } from "@/components/ui/button";
import DialogProvider from "@/provider/dialog-provider";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Account Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Link an account</h2>
        <p className="text-gray-600 mb-4">
          Connect your accounts to track subscriptions and more.
        </p>
        <DialogProvider>
          <Button variant="ringHover">Link an Account</Button>
        </DialogProvider>
      </div>
    </div>
  );
}
