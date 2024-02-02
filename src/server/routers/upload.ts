import { limitProcedure } from "../procedures/upload";
import { router } from "../trcp";

export const uploadRouter = router({
  uploadFile: limitProcedure.query(async ({ input }) => {
    return input
  })
})
