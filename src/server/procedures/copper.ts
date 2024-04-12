import { CheckoutCopperResource } from "../resource/copperx";
import { procedure } from "../trpc";

export const checkoutCopperProcedure = procedure.input(CheckoutCopperResource);
