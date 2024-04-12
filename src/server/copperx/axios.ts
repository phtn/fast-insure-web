import axios, { type AxiosRequestConfig } from "axios";

/**
 * CopperX
 */
export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.COPPER_TEST_KEY}`,
        "Content-Type": "application/json",
        ...config?.headers,
      },
    },
    baseURL: `${process.env.COPPER_TEST_BASE_URL}`,
  });

export const checkoutCopperConfig = {
  method: "POST",
  url: "/checkout/sessions",
};
