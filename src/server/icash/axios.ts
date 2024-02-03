import axios, { type AxiosRequestConfig } from "axios";

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: 'application/json',
        Authorization: `Basic ${process.env.ICASH_DEV_KEY}`,
        ...config?.headers,
      }
    },
    baseURL: "https://dev.i-cash.app:4443"
  })

export const checkoutConfig = {
  method: "POST",
  url: "/api/Merchant/checkout-url"
}
