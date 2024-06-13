import { createUserAccount, updateUserProfile } from "../firebase/account";
import { CreateUser, UpdateUserProfileProcedure } from "@procedures/account";
import { router } from "../trpc";

export const accountRouter = router({
  createUser: CreateUser.query(async ({ input }) => createUserAccount(input)),
  updateUserProfile: UpdateUserProfileProcedure.query(async ({ input }) =>
    updateUserProfile(input),
  ),
});
