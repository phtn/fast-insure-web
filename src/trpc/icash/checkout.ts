"use server";

import { type CheckoutSchema } from "@/server/resource/icash";
import { tRPC } from "../rsc";

export const createCheckoutSession = async (values: CheckoutSchema) => {
  return await tRPC.createCheckout.query(values);
};
