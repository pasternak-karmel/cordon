"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function EmptyPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src="/account_not_found.png"
            width={120}
            height={120}
            alt="Account not found"
            className="animate-bounce"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">No Account Linked</h1>
        <p className="text-lg text-gray-600">
          It looks like you haven&apos;t linked an account yet. Please link an
          account to continue enjoying our services.
        </p>
        <Button
          onClick={() => router.push("/account")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Link an Account
        </Button>
      </div>
    </div>
  );
}
