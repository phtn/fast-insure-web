import {
  CreateAccountResource,
  UpdateUserProfileResource,
} from "@resource/account";
import { procedure } from "../trpc";

export const CreateUser = procedure.input(CreateAccountResource);
export const UpdateUserProfileProcedure = procedure.input(
  UpdateUserProfileResource,
);
