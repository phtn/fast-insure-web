import axios, { type AxiosRequestConfig } from "axios";

export const ocrAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.EDEN_OCR_KEY}`,
        "Content-Type": "application/json",
        ...config?.headers,
      }
    },
    baseURL: "https://api.edenai.run/v2",
  })

export const ocrConfig = {
  method: "POST",
  url: "https://api.edenai.run/v2/ocr/ocr"
}

