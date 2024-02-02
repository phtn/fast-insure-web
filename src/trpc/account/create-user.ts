import { type NewUserPayload } from "@resource/account"
import { tRPC } from "@/trpc/rsc"

export const createNewUser = async (values: NewUserPayload) => {
  return await tRPC.createUser.query(values)
}
