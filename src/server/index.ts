import { mergeRouters } from "./trcp";
import { accountRouter } from "./routers/account";
import { uploadRouter } from "./routers/upload";

export const appRouter = mergeRouters(accountRouter, uploadRouter);

export type AppRouter = typeof appRouter;
