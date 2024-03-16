import { CheckoutResource } from "../resource/icash";
import { procedure } from "../trpc";

export const checkoutProcedure = procedure.input(CheckoutResource);
