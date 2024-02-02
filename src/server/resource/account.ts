import { z } from 'zod'

export const AccountType = z.union([
  z.literal('AFFILIATE'),
  z.literal('PERSONAL')
])

export const CreateAccountResource = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  accountType: AccountType
})

export type NewUserPayload = z.infer<typeof CreateAccountResource>
