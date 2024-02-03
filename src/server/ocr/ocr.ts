import { type AxiosInstance } from "axios";
import { type OCRSchema, type OCR_MSFT_Schema, ocrUrl as url } from "../resource/ocr";
import { ocrAxiosInstance, ocrConfig } from "./axios";

const onExtraction = async (
  values: OCRSchema,
  axiosInstance: AxiosInstance
) => {

  const { data, status } = await axiosInstance.post<OCR_MSFT_Schema>(
    url,
    values
  )

  return { data, status }

}

export const runOCR = async (values: OCRSchema) => {

  const axiosInstance = ocrAxiosInstance(values.file_url, ocrConfig)

  return await onExtraction(values, axiosInstance)

} 
