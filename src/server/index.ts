import { mergeRouters } from "./trcp";
import { accountRouter } from "./routers/account";
import { uploadRouter } from "./routers/upload";
import { iCashRouter } from "./routers/icash";
import { ocrRouter } from "./routers/ocr";
import { autoRouter } from "./routers/autos";

export const appRouter = mergeRouters(
  accountRouter,
  uploadRouter,
  iCashRouter,
  ocrRouter,
  autoRouter,
);

export type AppRouter = typeof appRouter;
