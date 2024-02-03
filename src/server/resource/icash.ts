import { z } from "zod";

export const CheckoutResource = z.object({
  merchantUsername: z.string(),
  merchantPassword: z.string(),
  merchantCode: z.string(),
  merchantRefNo: z.string(),
  merchantProductDescription: z.string(),
  currencyCode: z.string(),
  amount: z.string(),
  successUrl: z.string(),
  errorUrl: z.string(),
})

export const CheckoutResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  timestamp: z.string(),
  redirectUrl: z.string(),
})

export type CheckoutSchema = z.infer<typeof CheckoutResource>
export type CheckoutResponseSchema = z.infer<typeof CheckoutResponse>

export const checkoutUrl = `/api/Merchant/checkout-url`
