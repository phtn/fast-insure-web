import {
  CountUpdateResource,
  CreateAccountFromGoogleResource,
  CreateAccountResource,
  UpdateUserProfileResource,
} from "@resource/account";
import { procedure } from "../trpc";

export const CreateUserProcedure = procedure.input(CreateAccountResource);
export const CreateUserFromGoogleProcedure = procedure.input(
  CreateAccountFromGoogleResource,
);
export const UpdateUserProfileProcedure = procedure.input(
  UpdateUserProfileResource,
);
export const CountUpdateProcedure = procedure.input(CountUpdateResource);
