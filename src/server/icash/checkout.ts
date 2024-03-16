import { type AxiosInstance } from "axios";
import type {
  CheckoutResponseSchema,
  CheckoutSchema,
  PayoutResponseSchema,
  PayoutSchema,
} from "../resource/icash";
import {
  checkoutConfig,
  payoutConfig,
  // authConfig,
  // bankLookupConfig,
  createAxiosInstance,
} from "./axios";

const onCheckout = async (
  values: CheckoutSchema,
  axiosInstance: AxiosInstance,
) => {
  const { data, status } = await axiosInstance.post<CheckoutResponseSchema>(
    checkoutConfig.url,
    values,
  );
  return { data, status };
};

export const createCheckoutSession = async (values: CheckoutSchema) => {
  const axiosInstance = createAxiosInstance(checkoutConfig);
  return await onCheckout(values, axiosInstance);
};

const onPayout = async (values: PayoutSchema, axiosInstance: AxiosInstance) => {
  const { data, status } = await axiosInstance.post<PayoutResponseSchema>(
    payoutConfig.url,
    values,
  );
  return { data, status };
};

export const createInstapayPayoutSession = async (values: PayoutSchema) => {
  const axiosInstance = createAxiosInstance(payoutConfig);
  return await onPayout(values, axiosInstance);
};
