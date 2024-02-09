import { z } from "zod";

export const OCRResource = z.object({
  file_url: z.string(),
});

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
        height: z.number(),
      }),
    ),
    cost: z.number(),
  }),
});

export const OCR_GOOG_Response = z.object({
  google: z.object({
    status: z.string(),
    text: z.string(),
    bounding_boxes: z.array(
      z.object({
        text: z.string(),
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    ),
    cost: z.number(),
  }),
});

export const OCR_AMZN_Response = z.object({
  amazon: z.object({
    status: z.string(),
    text: z.string(),
    bounding_boxes: z.array(
      z.object({
        text: z.string(),
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    ),
    cost: z.number(),
  }),
});

export const Providers = z.union([
  z.literal("microsoft"),
  z.literal("google"),
  z.literal("amazon"),
  z.literal("base64"),
]);

export const OCR_Data = z.object({
  response_as_dict: z.boolean(),
  attibutes_as_list: z.boolean(),
  show_original_response: z.boolean(),
  convert_to_pdf: z.boolean().optional(),
  language: z.string().optional(),
  providers: Providers,
  file_url: z.string(),
  fallback_providers: Providers.optional(),
});

export const Fields = z.array(
  z.object({
    key: z.string(),
    value: z.string(),
    bounding_box: z.array(
      z.object({
        left: z.number(),
        top: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    ),
    confidence_score: z.number(),
  }),
);

export const OCR_DE_BASE64_Resource = z.object({
  base64: z.object({
    status: z.string(),
    fields: Fields,
    cost: z.number(),
  }),
});

export type OCRSchema = z.infer<typeof OCRResource>;
export type OCR_MSFT_Schema = z.infer<typeof OCR_MSFT_Response>;
export type OCR_GOOG_Schema = z.infer<typeof OCR_GOOG_Response>;
export type OCR_AMZN_Schema = z.infer<typeof OCR_AMZN_Response>;
export type OCR_Data_Schema = z.infer<typeof OCR_Data>;
export type OCR_DE_BASE64_Schema = z.infer<typeof OCR_DE_BASE64_Resource>;
export type OCR_DE_FieldSchema = z.infer<typeof Fields>;

export const ocrUrl = `url: "/ocr/ocr"`;
