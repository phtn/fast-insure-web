import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Content-Type": "application/json",
    },
    baseURL: "https://process-document-sl5gtzyiba-du.a.run.app",
  });

export const config = {
  url: "/process-document",
  body: {
    name: "Doja",
  },
};

const onCall = async (axiosInstance: AxiosInstance) => {
  return await axiosInstance.post(config.url, config.body);
};

export const processDocument = async () => {
  const axiosInstance = createAxiosInstance(config);
  return await onCall(axiosInstance);
};
