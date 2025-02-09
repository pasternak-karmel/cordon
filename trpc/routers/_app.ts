import { userSub } from "@/actions/calcule";
import { baseProcedure, createTRPCRouter } from "../init";
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
});
// export type definition of API
export type AppRouter = typeof appRouter;
