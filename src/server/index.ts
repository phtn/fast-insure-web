import { defaultRouter } from "@routers/example";
import { mergeRouters } from "./trcp";

export const appRouter = mergeRouters(defaultRouter);

export type AppRouter = typeof appRouter;
