import {
  type CheckoutCopperResourceSchema,
  checkoutCopperUrl as url,
} from "@/server/resource/copperx";
import { type AxiosInstance } from "axios";
import { checkoutCopperConfig, createAxiosInstance } from "./axios";

const onCreateLink = async (
  values: CheckoutCopperResourceSchema,
  axiosInstance: AxiosInstance,
) => {
  const { data, status } =
    await axiosInstance.post<CheckoutCopperResourceSchema>(url, values);

  return { data, status };
};

export const createCheckoutSession = async (
  values: CheckoutCopperResourceSchema,
  id: string,
) => {
  const axiosInstance = createAxiosInstance(checkoutCopperConfig);

  const Err = (err: Error) => {
    return err;
  };

  const Ok = async (response: Record<string, string | undefined>) => {
    return response.data;
  };

  return await onCreateLink(values, axiosInstance).then(Ok, Err);
};

/**
 * checkout Copper
 */
export const checkoutCopper = async (params: CheckoutCopperResourceSchema) => {
  await createCheckoutSession(params, "0-1");
};
