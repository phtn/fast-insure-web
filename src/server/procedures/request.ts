import {
  IDMDraftRequestPayload,
  IDMRequestPayload,
  UpdateRequestResource,
} from "../resource/request";
import { procedure } from "../trpc";

export const CreateRequestProcedure = procedure.input(IDMRequestPayload);
export const CreateDraftRequestProcedure = procedure.input(
  IDMDraftRequestPayload,
);

export const UpdateRequestProcedure = procedure.input(UpdateRequestResource);
