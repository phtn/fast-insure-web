import { z } from "zod";

export const AccountType = z.union([
  z.literal("AFFILIATE"),
  z.literal("PERSONAL"),
  z.literal("MANAGER"),
  z.literal("AGENT1"),
  z.literal("AGENT2"),
  z.literal("UNDERWRITER"),
]);

export type AccountTypeSchema = z.infer<typeof AccountType>;

export const AddressResource = z.object({
  line1: z.string().or(z.null()).or(z.undefined()),
  line2: z.string().or(z.null()).or(z.undefined()),
  city: z.string().or(z.null()).or(z.undefined()),
  state: z.string().or(z.null()).or(z.undefined()),
  country: z.string().or(z.null()).or(z.undefined()),
  postalCode: z.string().or(z.null()).or(z.undefined()),
});

export type AddressSchema = z.infer<typeof AddressResource>;

export const UserDataResource = z.object({
  id: z.string().or(z.undefined()),
  firstName: z.string().or(z.null()).or(z.undefined()),
  middleName: z.string().or(z.null()).or(z.undefined()),
  lastName: z.string().or(z.null()).or(z.undefined()),
  email: z.string().email().or(z.null()).or(z.undefined()),
  phone: z.string().or(z.null()).or(z.undefined()),
  address: AddressResource.or(z.null()).or(z.undefined()),
  updatedAt: z.string().datetime(),
});

export type UserDataSchema = z.infer<typeof UserDataResource>;

export const UserProfileResource = z.object({
  userId: z.string().or(z.undefined()),
  email: z.string().email().or(z.undefined()),
  displayName: z.string().or(z.undefined()),
  accountType: AccountType,
  x: z.string().or(z.null()).or(z.undefined()),
  userData: UserDataResource.or(z.undefined()),
  isVerified: z.boolean(),
  setupComplete: z.boolean(),
  setupProgress: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  branchCode: z.string().or(z.undefined()),
  userCode: z.string().or(z.null()),
});

export type UserProfileSchema = z.infer<typeof UserProfileResource>;

export const CreateAccountResource = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  accountType: AccountType,
});

export type NewUserPayload = z.infer<typeof CreateAccountResource>;

export const AgentCodeResource = z.object({
  userId: z.string(),
  code: z.string(),
});

export type AgentCodeSchema = z.infer<typeof AgentCodeResource>;
