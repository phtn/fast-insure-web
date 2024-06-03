// import { z } from "zod";

import { z } from "zod";

export const checkoutCopperUrl = "/checkout/sessions";

// export const checkoutData = {
//   submitType: "pay",
//   lineItems: { data: [{ priceData: { currency: "usdc" }, quantity: 1 }] },
//   paymentSetting: { allowSwap: false },
// };

export const CheckoutCopperResource = z.object({
  submitType: z.string(),
  lineItems: z.object({
    data: z.array(
      z.object({
        priceData: z.object({
          currency: z.union([
            z.literal("btc"),
            z.literal("etc"),
            z.literal("usdc"),
            z.literal("solana"),
            z.literal("usdt"),
            z.literal("matic"),
          ]),
        }),
        quantity: z.number(),
      }),
    ),
    paymentSetting: z.object({
      allowSwap: z.boolean(),
    }),
  }),
});

export type CheckoutCopperResourceSchema = z.infer<
  typeof CheckoutCopperResource
>;

export const checkoutResponse = {
  id: "6bce7b07-825f-454e-bea8-3a2bb04a570b",
  createdAt: "2023-02-22T12:46:11.453Z",
  updatedAt: "2023-02-22T12:46:11.553Z",
  mode: "payment",
  paymentMethodTypes: ["wallet"],
  paymentSetting: {
    allowedChains: [
      {
        chainId: 80001,
      },
    ],
    paymentMethodTypes: null,
    preferredChainId: 80001,
  },
  expiresAt: "2023-02-22T13:46:11.441Z",
  customerCreation: "if_required",
  customerUpdate: null,
  submitType: "pay",
  afterCompletion: null,
  organizationId: "ea2f521c-0f27-48bf-91f7-87dd8de98034",
  amountTotal: "100000000",
  currency: "usdc",
  paymentLinkId: null,
  subscriptionId: null,
  customerId: null,
  clientReferenceId: null,
  successUrl:
    "https://copperx.io/success?cid=6bce7b07-825f-454e-bea8-3a2bb04a570b",
  cancelUrl: null,
  status: "open",
  paymentStatus: "unpaid",
  metadata: null,
  emailCollection: false,
  phoneNumberCollection: false,
  shippingAddressCollection: false,
  billingAddressCollection: false,
  afterCompletionConfirmMsg: null,
  shippingDetails: {},
  billingDetails: {},
  url: "https://buy.copperx.dev/payment/checkout-session/6bce7b07-825f-454e-bea8-3a2bb04a570b",
  customerDetails: {
    address: {},
  },
  lineItems: {
    object: "list",
    data: [
      {
        amountTotal: "100000000",
        currency: "usdc",
        description: null,
        quantity: 1,
        price: {
          id: "49da18aa-c09a-4d36-9171-23474685f5bd",
          createdAt: "2023-02-22T12:46:11.392Z",
          updatedAt: "2023-02-22T12:46:11.392Z",
          billingScheme: "per_unit",
          currency: "usdc",
          productId: "5a4b57b4-9bff-465e-bf4e-04e4d3659ca3",
          interval: null,
          usageType: null,
          type: "one_time",
          unitAmount: "100000000",
          unitAmountDecimal: null,
          customUnitMax: null,
          customUnitMin: null,
          customPreset: null,
          customUnitAmountSuggestions: null,
          product: {
            id: "5a4b57b4-9bff-465e-bf4e-04e4d3659ca3",
            createdAt: "2023-02-22T12:46:11.380Z",
            updatedAt: "2023-02-22T12:46:11.420Z",
            name: "Basic",
            description: "For early stage projects who are getting started",
            isActive: true,
            images: [],
            unitLabel: null,
            url: null,
            metadata: null,
            defaultPriceId: "49da18aa-c09a-4d36-9171-23474685f5bd",
            visibility: 10,
          },
          metadata: null,
          isActive: true,
          visibility: 20,
        },
      },
    ],
  },
  addresses: [
    {
      id: "85f8fe19-3465-4201-b2a9-eefce83f1eeb",
      createdAt: "2023-02-22T12:46:11.553Z",
      updatedAt: "2023-02-22T12:46:11.553Z",
      checkoutSessionId: "6bce7b07-825f-454e-bea8-3a2bb04a570b",
      asset: {
        id: "a60c79d2-7f9f-4b03-a597-85e7432edb5f",
        name: "USDC",
        address: "0x953ecae2e3c8ee8723fef049de53666d7126dde9",
        chainId: 80001,
        currency: "usdc",
        symbol: "USDC",
        decimals: 6,
        coingeckoId: "usd-coin",
        isPublic: true,
        superToken: {
          address: "0x6d691bd589cc175714a85bbd528b96c011a24fe6",
          symbol: "CXUSDCx",
          decimals: 18,
        },
      },
      paymentAddress: "0x81b63dc0daccee035b186e07356ac53fb1260af4",
    },
  ],
  paymentIntent: {
    id: "481d6649-aa07-444a-8fcc-929968514e65",
    createdAt: "2023-02-22T12:46:11.442Z",
    updatedAt: "2023-02-22T12:46:11.442Z",
    organizationId: "ea2f521c-0f27-48bf-91f7-87dd8de98034",
    amount: "100000000",
    amountReceived: null,
    currency: "usdc",
    status: "requires_payment_method",
    paymentMethodId: null,
    paymentMethodTypes: ["wallet"],
    description: null,
    transferAccountAddress: null,
    transactions: [],
  },
};

/**
curl --request POST \
--url 'https://api.copperx.io/api/v1/checkout/sessions' \
--header 'Authorization: Bearer {YOUR_API_KEY}' \
--header 'Content-Type: application/json'
--data-raw '{
    "successUrl": "https://copperx.io?cid={CHECKOUT_SESSION_ID}",
    "mode": "subscription",
    "lineItems": [{
        "priceId": "{PRICE_ID}"
    }]
}'
*/

export const subres = {
  id: "6c88e598-335d-468b-aea5-fa7a3aa074bf",
  createdAt: "2023-04-03T17:57:16.943Z",
  updatedAt: "2023-04-03T17:57:16.982Z",
  mode: "subscription",
  paymentMethodTypes: ["superfluid"],
  paymentSetting: {
    allowedChains: [
      {
        chainId: 137,
      },
    ],
    paymentMethodTypes: null,
    preferredChainId: 137,
    allowSwap: false,
  },
  expiresAt: "2023-04-03T18:57:16.940Z",
  customerCreation: "if_required",
  customerUpdate: null,
  submitType: "pay",
  afterCompletion: null,
  organizationId: "758cbac4-58b8-4e0a-b1a2-27b60d4b148d",
  amountTotal: "10000000",
  currency: "usdc",
  paymentLinkId: null,
  subscriptionId: null,
  customerId: "820b4fa9-8f4d-4866-9333-527752e32775",
  clientReferenceId: null,
  successUrl: "https://copperx.io?cid=6c88e598-335d-468b-aea5-fa7a3aa074bf",
  cancelUrl: null,
  status: "open",
  paymentStatus: "unpaid",
  metadata: null,
  emailCollection: false,
  phoneNumberCollection: false,
  shippingAddressCollection: false,
  billingAddressCollection: false,
  afterCompletionConfirmMsg: null,
  shippingDetails: {},
  billingDetails: {},
  url: "https://buy.copperx.io/payment/checkout-session/6c88e598-335d-468b-aea5-fa7a3aa074bf",
  customer: {
    name: null,
    email: null,
    phone: null,
    id: "820b4fa9-8f4d-4866-9333-527752e32775",
    createdAt: "2023-04-03T17:57:16.921Z",
    updatedAt: "2023-04-03T17:57:16.921Z",
    customerReferenceId: null,
    visibility: 10,
    metadata: {},
  },
  customerDetails: {
    name: null,
    email: null,
    phone: null,
    address: {},
  },
  lineItems: {
    object: "list",
    data: [
      {
        amountTotal: "10000000",
        currency: "usdc",
        description: null,
        quantity: 1,
        price: {
          id: "ae575f1d-57b0-47cd-b40b-f1c2a057c067",
          createdAt: "2023-04-03T17:57:16.909Z",
          updatedAt: "2023-04-03T17:57:16.909Z",
          billingScheme: "per_unit",
          currency: "usdc",
          productId: "a90004dc-48be-4d21-9f45-05cc3acacc52",
          interval: "month",
          usageType: null,
          type: "recurring",
          unitAmount: "10000000",
          unitAmountDecimal: null,
          customUnitMax: null,
          customUnitMin: null,
          customPreset: null,
          customUnitAmountSuggestions: null,
          product: {
            id: "a90004dc-48be-4d21-9f45-05cc3acacc52",
            createdAt: "2023-04-03T17:57:16.903Z",
            updatedAt: "2023-04-03T17:57:16.918Z",
            name: "Basic",
            description: "For early stage projects who are getting started",
            isActive: true,
            images: [],
            unitLabel: null,
            url: null,
            metadata: null,
            defaultPriceId: "ae575f1d-57b0-47cd-b40b-f1c2a057c067",
            visibility: 20,
          },
          metadata: null,
          isActive: true,
          visibility: 20,
        },
      },
    ],
  },
  addresses: [
    {
      id: "c0e4bd0d-e7a4-4202-ac4d-f7bc60e6c474",
      createdAt: "2023-04-03T17:57:16.982Z",
      updatedAt: "2023-04-03T17:57:16.982Z",
      checkoutSessionId: "6c88e598-335d-468b-aea5-fa7a3aa074bf",
      asset: {
        id: "13056880-798b-4bd4-a555-c1c71de017fa",
        name: "USDC",
        address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        chainId: 137,
        currency: "usdc",
        symbol: "USDC",
        decimals: 6,
        coingeckoId: "usd-coin",
        isPublic: true,
        superToken: {
          address: "0xcaa7349cea390f89641fe306d93591f87595dc1f",
          symbol: "USDCx",
          decimals: 18,
        },
        chain: {
          id: 137,
          name: "Polygon",
          icon: "icon",
          currency: "matic",
          blockExplorerName: "Polygonscan",
          blockExplorerTransactionUrl: "https://polygonscan.com/tx/{hash}",
        },
      },
      paymentAddress: "0xd55069e3b3a088dfe3690decac89740b897bd1e7",
    },
  ],
  paymentIntent: {
    id: "a6da4225-1d26-4ede-b4fa-259ed5a0a3ab",
    createdAt: "2023-04-03T17:57:16.937Z",
    updatedAt: "2023-04-03T17:57:16.937Z",
    organizationId: "758cbac4-58b8-4e0a-b1a2-27b60d4b148d",
    amount: "10000000",
    amountReceived: null,
    currency: "usdc",
    status: "requires_payment_method",
    paymentMethodId: null,
    paymentMethodTypes: ["superfluid"],
    description: null,
    transferAccountAddress: null,
    transactions: [],
  },
};

export const webhookResponse = {
  id: "518fa184-194b-40f3-9ce8-33fe668305a7",
  apiVersion: "2023-01-11",
  created: 1677070414201,
  object: "checkoutSession",
  type: "checkout_session.completed",
  data: {
    object: {
      id: "6bce7b07-825f-454e-bea8-3a2bb04a570b",
      createdAt: "2023-02-22T12:46:11.453Z",
      updatedAt: "2023-02-22T12:53:34.189Z",
      mode: "payment",
      paymentMethodTypes: ["wallet"],
      paymentSetting: {
        allowedChains: [
          {
            chainId: 80001,
          },
        ],
        paymentMethodTypes: null,
        preferredChainId: 80001,
      },
      expiresAt: "2023-02-22T13:46:11.441Z",
      customerCreation: "if_required",
      customerUpdate: null,
      submitType: "pay",
      afterCompletion: null,
      organizationId: "ea2f521c-0f27-48bf-91f7-87dd8de98034",
      amountTotal: "100000000",
      currency: "usdc",
      paymentLinkId: null,
      subscriptionId: null,
      customerId: null,
      clientReferenceId: null,
      successUrl:
        "https://copperx.io/success?cid=6bce7b07-825f-454e-bea8-3a2bb04a570b",
      cancelUrl: null,
      status: "complete",
      paymentStatus: "unpaid",
      metadata: null,
      emailCollection: false,
      phoneNumberCollection: false,
      shippingAddressCollection: false,
      billingAddressCollection: false,
      afterCompletionConfirmMsg: null,
      shippingDetails: {},
      billingDetails: {},
      url: "https://buy.copperx.dev/payment/checkout-session/6bce7b07-825f-454e-bea8-3a2bb04a570b",
    },
  },
};

/**
 *
 *
 *
 *
 curl --request POST \
     --url https://api.copperx.dev/api/v1/checkout/sessions \
     --header 'accept: application/json' \
     --header 'authorization: Bearer pav1_07xCFkzauWfX0kZTaJdrf1z3gGhXyP66azR2bIWrUSTYWsxs3QTa1oc7gUMbj7Gz \
     --header 'content-type: application/json' \
     --data ' {
  "submitType": "pay",
  "lineItems": {
    "data": [
      {
        "priceData": {
          "currency": "usdc"
        },
        "quantity": 1
      }
    ]
  },
  "paymentSetting": {
    "allowSwap": false
  }
}
'

 curl --request POST \
     --url https://api.copperx.dev/api/v1/checkout/sessions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "submitType": "pay",
  "lineItems": {
    "data": [
      {
        "priceData": {
          "currency": "usdc"
        },
        "quantity": 1
      }
    ]
  },
  "paymentSetting": {
    "allowSwap": false
  }
}
'
 *
 */
