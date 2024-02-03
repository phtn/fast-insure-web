'use server'

import { type OCRSchema } from "@/server/resource/ocr"
import { tRPC } from "../rsc"

export const runOCR = async (values: OCRSchema) => {
  return await tRPC.ocrMSFT.query(values)
} 
