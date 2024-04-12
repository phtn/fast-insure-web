import { mergeRouters } from "./trpc";
import { accountRouter } from "./routers/account";
import { uploadRouter } from "./routers/upload";
import { iCashRouter } from "./routers/icash";
import { ocrRouter } from "./routers/ocr";
import { autoRouter } from "./routers/autos";
import { copperRouter } from "./routers/copper";

export const appRouter = mergeRouters(
  accountRouter,
  uploadRouter,
  iCashRouter,
  ocrRouter,
  autoRouter,
  copperRouter,
);

export type AppRouter = typeof appRouter;
