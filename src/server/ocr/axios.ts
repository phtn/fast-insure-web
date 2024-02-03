import axios, { type AxiosRequestConfig } from "axios";

export const ocrAxiosInstance = (file_url: string, config?: AxiosRequestConfig) =>
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
    data: {
      providers: "microsoft",
      language: "en",
      file_url: file_url,
      fallback_providers: "google",
    },
  })

export const ocrConfig = {
  method: "POST",
  url: "/ocr/ocr"
}

