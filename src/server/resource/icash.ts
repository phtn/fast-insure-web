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
});

export type CheckoutSchema = z.infer<typeof CheckoutResource>;
export const checkoutUrl = `/api/Merchant/checkout-url`;

export const CheckoutResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  timestamp: z.string(),
  redirectUrl: z.string(),
});

export type CheckoutResponseSchema = z.infer<typeof CheckoutResponse>;

export const PayoutResource = z.object({
  accountName: z.string(),
  accountNo: z.string(),
  backCode: z.string(),
  amount: z.string(),
  merchantRefNo: z.string(),
});

export type PayoutSchema = z.infer<typeof PayoutResource>;
export const payoutUrl = "/api/payout/create";

export const PayoutResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  transactionStatus: z.string(),
  merchantRefNo: z.string(),
  transactionRefNo: z.string(),
});

export type PayoutResponseSchema = z.infer<typeof PayoutResponse>;

export const AuthResource = z.object({
  merchantCode: z.string(),
  username: z.string(),
  password: z.string(),
});

export type AuthSchema = z.infer<typeof AuthResource>;
export const authUrl = "/api/auth/login";

export const AuthResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  accessToken: z.string(),
  accessTokenExpiresIn: z.string(),
  tokenType: z.string(),
});

export type AuthResponseSchema = z.infer<typeof AuthResponse>;

export const AuthFailed = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
});

export type AuthFailedSchema = z.infer<typeof AuthFailed>;

export const BankLookupResponse = z.object({
  statusCode: z.string(),
  statusMessage: z.string(),
  data: z.array(
    z.object({
      bankCode: z.string(),
      bankDesc: z.string(),
      accountFormat: z.string(),
      status: z.string(),
    }),
  ),
});

export type BankLookupResponseSchema = z.infer<typeof BankLookupResponse>;
export const bankLookupUrl = "/api/lookup/banks";

export const webhookMsg = {
  merchantReferenceNo: "TESTREF000002",
  transactionReferenceNo: "MP1234567890",
  amount: "10.00",
  transactionStatus: "CREDITED",
  transactionDate: "2023-11-13 17:12:25.957",
};
