import { limitProcedure } from "../procedures/upload";
import { router } from "../trpc";

export const uploadRouter = router({
  uploadFile: limitProcedure.query(async ({ input }) => {
    return input;
  }),
});
