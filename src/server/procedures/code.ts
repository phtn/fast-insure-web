import {
  AgentCodeResource,
  UpdateCodeListResource,
  UpdateManagerCodeListResource,
} from "@resource/code";
import { procedure } from "../trpc";

export const CreateAgentCodeProcedure = procedure.input(AgentCodeResource);
export const UpdateCodeListProcedure = procedure.input(UpdateCodeListResource);
export const UpdateManagerCodeListProcedure = procedure.input(
  UpdateManagerCodeListResource,
);
