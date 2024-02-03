'use server'

import { type CheckoutSchema } from "@/server/resource/icash";
import { tRPC } from "../rsc";

export const checkoutSession = async (values: CheckoutSchema) => {
  return await tRPC.createCheckout.query(values)
} 
