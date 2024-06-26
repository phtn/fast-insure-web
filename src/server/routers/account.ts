import {
  countUpdate,
  createUserAccount,
  createUserAccountFromGoogle,
  updateUserProfile,
} from "../firebase/account";
import {
  CreateUserProcedure,
  CreateUserFromGoogleProcedure,
  UpdateUserProfileProcedure,
  CountUpdateProcedure,
} from "@procedures/account";
import { router } from "../trpc";

export const accountRouter = router({
  createUser: CreateUserProcedure.query(async ({ input }) =>
    createUserAccount(input),
  ),
  createUserFromGoogle: CreateUserFromGoogleProcedure.query(async ({ input }) =>
    createUserAccountFromGoogle(input),
  ),
  updateUserProfile: UpdateUserProfileProcedure.query(async ({ input }) =>
    updateUserProfile(input),
  ),
  countUpdate: CountUpdateProcedure.query(async ({ input }) =>
    countUpdate(input),
  ),
});
