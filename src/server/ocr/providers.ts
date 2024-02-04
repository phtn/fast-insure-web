import type { AxiosInstance } from "axios";
import type { OCR_MSFT_Schema, OCR_Data_Schema, OCR_GOOG_Schema, OCR_AMZN_Schema } from "@resource/ocr";
import { ocrUrl as url } from '@resource/ocr'

export const useMSFT = async (
  values: OCR_Data_Schema,
  axiosInstance: AxiosInstance
) => {
  const { data, status } = await axiosInstance.post<OCR_MSFT_Schema>(url, values)
  return { data, status }
}

export const useGOOG = async (
  values: OCR_Data_Schema,
  axiosInstance: AxiosInstance
) => {
  const { data, status } = await axiosInstance.post<OCR_GOOG_Schema>(url, values)
  return { data, status }
}

export const useAMZN = async (
  values: OCR_Data_Schema,
  axiosInstance: AxiosInstance
) => {
  const { data, status } = await axiosInstance.post<OCR_AMZN_Schema>(url, values)
  return { data, status }
}
