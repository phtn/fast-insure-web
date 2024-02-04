'use server'

import type { OCR_Data_Schema, OCR_DE_BASE64_Schema, OCR_GOOG_Schema, OCRSchema } from "@/server/resource/ocr"
import { tRPC } from "../rsc"
import axios from "axios"

export const runOCR = async (values: OCRSchema) => {
  return await tRPC.ocrGOOG.query(values).then((res: { data: OCR_GOOG_Schema } | Error) => res)
}

export const runOCR_GOOG = async ({ file_url }: OCRSchema) => {
  const data: OCR_Data_Schema = {
    response_as_dict: true,
    attibutes_as_list: true,
    show_original_response: false,
    convert_to_pdf: false,
    providers: "google",
    fallback_providers: "amazon",
    file_url,
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

  const response = await axios.request(options).then((res: { data: OCR_GOOG_Schema }) => res)
  return response.data
}

export const runOCR_DE_BASE64 = async ({ file_url }: OCRSchema) => {
  const data: OCR_Data_Schema = {
    response_as_dict: true,
    attibutes_as_list: true,
    show_original_response: false,
    convert_to_pdf: false,
    providers: "base64",
    file_url,
  }

  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/ocr/data_extraction',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.EDEN_OCR_KEY}`
    },
    data,
  }

  const response = await axios.request(options).then((res: { data: OCR_DE_BASE64_Schema }) => res)
  return response.data
}
