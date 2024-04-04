"use server";

import { type CheckoutSchema } from "@/server/resource/icash";
import { tRPC } from "../rsc";

/**
 * iCash checkout
 * @location trpc/icash/checkout
 */
export const createIcashCheckout = async (values: CheckoutSchema) => {
  return await tRPC.createCheckout.query(values);
};
