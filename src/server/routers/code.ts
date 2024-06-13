import { router } from "../trpc";
import {
  createAgentCode,
  updateCodeList,
  updateManagerCodeList,
} from "../firebase/codes";
import {
  CreateAgentCodeProcedure,
  UpdateCodeListProcedure,
  UpdateManagerCodeListProcedure,
} from "../procedures/code";

export const codeRouter = router({
  createAgentCode: CreateAgentCodeProcedure.query(
    async ({ input }) => await createAgentCode(input),
  ),
  updateCodeList: UpdateCodeListProcedure.query(
    async ({ input }) => await updateCodeList(input),
  ),
  updateManagerCodeList: UpdateManagerCodeListProcedure.query(
    async ({ input }) => await updateManagerCodeList(input),
  ),
});
