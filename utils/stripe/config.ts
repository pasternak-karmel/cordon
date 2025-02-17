import { config } from "@/config";
import "server-only";
import Stripe from "stripe";
import { getURL } from "../helper";

export const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: "2025-01-27.acacia",
  appInfo: {
    name: "Cordon, Subscription service manager",
    version: "0.0.0",
    url: getURL(),
  },
});
