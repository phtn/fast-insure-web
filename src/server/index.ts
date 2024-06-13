import { mergeRouters } from "./trpc";
import { accountRouter } from "./routers/account";
import { uploadRouter } from "./routers/upload";
import { iCashRouter } from "./routers/icash";
import { ocrRouter } from "./routers/ocr";
import { autoRouter } from "./routers/autos";
import { copperRouter } from "./routers/copper";
import { requestRouter } from "./routers/request";
import { codeRouter } from "./routers/code";

export const appRouter = mergeRouters(
  accountRouter,
  requestRouter,
  uploadRouter,
  iCashRouter,
  ocrRouter,
  autoRouter,
  copperRouter,
  codeRouter,
);

export type AppRouter = typeof appRouter;
