import { config } from "@/config";
import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(config.stripe.publishableKey);

  return stripePromise;
};
