"use server";

import { type CheckoutCopperResourceSchema } from "@/server/resource/copperx";
import { tRPC } from "../rsc";

/**
 * checkout trpc/copper/checkout
 */
export const checkoutCopper = async (params: CheckoutCopperResourceSchema) => {
  await tRPC.checkoutCopper.query(params).then((res) => res);
};
