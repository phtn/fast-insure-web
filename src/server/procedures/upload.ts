import { LimitFile } from "../resource/upload";
import { procedure } from "../trpc";

export const limitProcedure = procedure.input(LimitFile);
