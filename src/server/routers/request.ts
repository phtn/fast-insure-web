import {
  createDraftRequest,
  createRequest,
  updateRequest,
} from "../firebase/requests";
import {
  CreateRequestProcedure,
  CreateDraftRequestProcedure,
  UpdateRequestProcedure,
} from "../procedures/request";
import { router } from "../trpc";

export const requestRouter = router({
  createRequest: CreateRequestProcedure.query(async ({ input }) =>
    createRequest(input),
  ),
  createDraftRequest: CreateDraftRequestProcedure.query(async ({ input }) =>
    createDraftRequest(input),
  ),
  updateRequest: UpdateRequestProcedure.query(
    async ({ input }) => await updateRequest(input),
  ),
});
