import {
  canAddAccount,
  getConnectedAccounts,
  hasLinkedAccount,
} from "@/actions/admin";
import { userSub } from "@/actions/calcule";
import { getRecentSubscription } from "@/actions/estimate";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  getUserSubscriptions: protectedProcedure.query(async () => {
    const subscriptions = await userSub();
    return subscriptions;
  }),
  getRecentSubscription: protectedProcedure.query(async () => {
    return await getRecentSubscription();
  }),
  canAddAccount: protectedProcedure.query(async () => {
    return await canAddAccount();
  }),
  hasLinkedAccount: protectedProcedure.query(async () => {
    return await hasLinkedAccount();
  }),
  getConnectedAccounts: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session.user.email;
    if (!email) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
    return await getConnectedAccounts(email);
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
