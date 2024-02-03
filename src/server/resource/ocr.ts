import { z } from "zod";

export const OCRResource = z.object({
  file_url: z.string()
})

export const OCR_MSFT_Response = z.object({
  microsoft: z.object({
    status: z.string(),
    text: z.string(),
    bounding_boxes: z.array(
      z.object({
        text: z.string(),
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number()
      })
    ),
    cost: z.number()
  })
})

export type OCRSchema = z.infer<typeof OCRResource>
export type OCR_MSFT_Schema = z.infer<typeof OCR_MSFT_Response>

export const ocrUrl = `url: "/ocr/ocr"`
