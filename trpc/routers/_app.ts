import {
  canAddAccount,
  getConnectedAccounts,
  hasLinkedAccount,
} from "@/actions/admin";
import { userSub } from "@/actions/calcule";
import { getRecentSubscription } from "@/actions/estimate";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  // exemple de comment faire en use client
  //   hello: baseProcedure
  //     .input(
  //       z.object({
  //         text: z.string(),
  //       })
  //     )
  //     .query((opts) => {
  //       return {
  //         greeting: `hello ${opts.input.text}`,
  //       };
  //     }),
  getUserSubscriptions: baseProcedure.query(async () => {
    const subscriptions = await userSub();
    return subscriptions;
  }),
  getRecentSubscription: baseProcedure.query(async () => {
    const subscriptions = await getRecentSubscription();
    return subscriptions;
  }),
  canAddAccount: baseProcedure.query(async () => {
    const canAdd = await canAddAccount();
    return canAdd;
  }),
  hasLinkedAccount: baseProcedure.query(async () => {
    return await hasLinkedAccount();
  }),
  getConnectedAccounts: protectedProcedure.query(async ({ ctx }) => {
    console.log("this is the user email", ctx.session.user.email);
    return await getConnectedAccounts(ctx.session.user.email!);
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
