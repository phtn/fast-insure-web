import { createUserAccount } from "../firebase/account";
import { CreateUser } from "@procedures/account";
import { router } from "../trcp";

export const accountRouter = router({
  createUser: CreateUser.query(async ({ input }) => {
    return createUserAccount(input)
  })
});
