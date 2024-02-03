import { ocrProcedure } from "../procedures/ocr";
import { router } from "../trcp";

export const ocrRouter = router({
  ocrMSFT: ocrProcedure.query(async ({ input }) => {
    return input
  })
})
