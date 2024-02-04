import axios, { type AxiosRequestConfig } from "axios";
import type { OCRSchema, OCR_Data_Schema, OCR_GOOG_Schema } from "@resource/ocr";

const onExtraction = async (options: AxiosRequestConfig) => {
  return await axios.request(options).then((res: { data: OCR_GOOG_Schema }) => res).catch((err: Error) => err)
}

export const runOCR = async (values: OCRSchema) => {

  const data: OCR_Data_Schema = {
    response_as_dict: true,
    attibutes_as_list: true,
    show_original_response: false,
    providers: "google",
    file_url: values.file_url,
    fallback_providers: "amazon",
  }

  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/ocr/ocr',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.EDEN_OCR_KEY}`
    },
    data,
  }

  return await onExtraction(options)
} 
