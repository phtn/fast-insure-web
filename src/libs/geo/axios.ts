import axios, { type AxiosRequestConfig } from "axios";

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_GEO_API_KEY}`,
        "Content-Type": "application/json",
        ...config?.headers,
      },
    },
    baseURL: "https://api.geoapify.com/v1",
  });

export const reverseConfig = {
  method: "GET",
  url: "/geocode/reverse",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
