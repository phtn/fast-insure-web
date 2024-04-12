import { checkoutCopper } from "@/trpc/copper/checkout";
import { checkoutCopperProcedure } from "../procedures/copper";
import { router } from "../trpc";

export const copperRouter = router({
  checkoutCopper: checkoutCopperProcedure.query(
    async ({ input }) => await checkoutCopper(input).then((res) => res),
  ),
});
