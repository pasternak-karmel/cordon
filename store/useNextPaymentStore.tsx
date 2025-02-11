import { subscriptionDetailProps, SubscriptionStore } from "@/interface/index";
import { create } from "zustand";



export const initialState: subscriptionDetailProps = {
  SubscriptionTitle: "",
  subscriptionLogoUrl: "",
  subscriptionCategory: "",
  remainingDays: 0,
  startingDate: "",
  endingDate: "",
  subscriptionPrice: 0,
  subscriptionType: "",
  paymentsHistory: [],
};

export const useNextPaymentStore = create<SubscriptionStore>((set) => ({
  subscription: initialState,

  updateSubscription: (data) =>
    set(() => ({
      subscription: {
        ...data,
      },
    })),
}));



