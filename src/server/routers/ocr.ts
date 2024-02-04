import { runOCR } from "../ocr/ocr";
import { ocrProcedure } from "../procedures/ocr";
import { router } from "../trcp";

export const ocrRouter = router({
  ocrGOOG: ocrProcedure.query(async ({ input }) => {
    return await runOCR(input).then(res => res)
  })
})
