import { OCRResource } from "../resource/ocr";
import { procedure } from "../trpc";

export const ocrProcedure = procedure.input(OCRResource);
