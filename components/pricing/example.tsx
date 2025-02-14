"use client";

import { getStripe } from "@/utils/stripe/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Price = {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: string;
};

export default function Pricing() {
  const router = useRouter();
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch("/api/prices");
      const data = await res.json();
      setPrices(data);
    }
    fetchPrices();
  }, []);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId, errorRedirect } = await res.json();

    if (errorRedirect) {
      setLoading(null);
      return router.push(errorRedirect);
    }

    if (sessionId) {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    }

    setLoading(null);
  };

  return (
    <section className="bg-black p-10 text-white">
      <h1 className="text-4xl font-bold text-center">Choose your Plan</h1>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {prices.map((price) => (
          <div
            key={price.id}
            className="bg-zinc-800 p-6 rounded-lg shadow-lg text-center w-72"
          >
            <h2 className="text-2xl font-semibold">{price.name}</h2>
            <p className="text-xl mt-2">
              ${(price.amount / 100).toFixed(2)} / {price.interval}
            </p>
            <button
              className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
              onClick={() => handleCheckout(price.id)}
              disabled={loading === price.id}
            >
              {loading === price.id ? "Processing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
