import { createUserAccount } from "../firebase/account";
import { CreateAgentCodeProcedure, CreateUser } from "@procedures/account";
import { router } from "../trpc";
import { createAgentCode } from "../firebase/codes";

export const accountRouter = router({
  createUser: CreateUser.query(async ({ input }) => createUserAccount(input)),
  createAgentCode: CreateAgentCodeProcedure.query(async ({ input }) =>
    createAgentCode(input),
  ),
});
