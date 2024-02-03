import { mergeRouters } from "./trcp";
import { accountRouter } from "./routers/account";
import { uploadRouter } from "./routers/upload";
import { iCashRouter } from "./routers/icash";
import { ocrRouter } from "./routers/ocr";

export const appRouter = mergeRouters(accountRouter, uploadRouter, iCashRouter, ocrRouter);

export type AppRouter = typeof appRouter;
