import { Button } from "@/components/ui/button";
import DialogProvider from "@/provider/dialog-provider";

export default function AccountPage() {
  return (
    <div className="flex justify-center items-center h-auto bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl border border-gray-200 p-10">
        <div className="text-center border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Account Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage and link your accounts effortlessly.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Link an Account
          </h2>

          <p className="text-gray-600 mt-2 mb-6">
            Connect your accounts to easily track subscriptions, payments, and
            more. Stay organized and in control.
          </p>

          <div className="flex justify-center">
            <DialogProvider>
              <Button
                variant="ringHover"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl"
              >
                Link an Account
              </Button>
            </DialogProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
