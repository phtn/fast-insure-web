import { z } from "zod";

export const LoginResource = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be atleast 4 chars",
  }),
});

export type LoginSchema = z.infer<typeof LoginResource>;

export const LoginTypeResource = z.union([
  z.literal("SIGNIN"),
  z.literal("SIGNUP"),
]);
export type LoginTypeSchema = z.infer<typeof LoginTypeResource>;

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

export const TokenManager = z.object({
  accessToken: z.string(),
  expirationTime: z.number(),
  refreshToken: z.string(),
});

export const UserProfileResource = z.object({
  accountType: AccountType,
  active: z.boolean().or(z.undefined()),
  agentCode: z.string().or(z.null()),
  branchCode: z.string().or(z.undefined()),
  createdAt: z.string().datetime(),
  displayName: z.string().or(z.null()),
  email: z.string().email().or(z.null()),
  existing: z.boolean().or(z.undefined()),
  isVerified: z.boolean(),
  phoneNumber: z.string().or(z.null()),
  photoURL: z.string().or(z.null()),
  setupComplete: z.boolean(),
  setupProgress: z.number(),
  updatedAt: z.string().datetime(),
  lastLogin: z.string().datetime(),
  userId: z.string().or(z.undefined()),
  userData: UserDataResource.or(z.undefined()),
  draftCount: z.number().or(z.undefined()),
  submittedCount: z.number().or(z.undefined()),
  completedCount: z.number().or(z.undefined()),
  fastPoints: z.number().or(z.undefined()),
  recentActivities: z.array(z.record(z.string(), z.any())).or(z.undefined()),
});

export type UserProfileSchema = z.infer<typeof UserProfileResource>;

export const profileKeySchema = UserProfileResource.keyof();

export const UpdateUserProfileResource = z.object({
  userId: z.string().or(z.undefined()),
  payload: z.record(profileKeySchema, z.any()),
});

export type UpdateUserProfileSchema = z.infer<typeof UpdateUserProfileResource>;

export const CreateAccountResource = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
  accountType: AccountType,
});

export type NewUserPayload = z.infer<typeof CreateAccountResource>;

export const CreateAccountFromGoogleResource = z.object({
  userId: z.string().min(1),
  email: z.string().email().or(z.null()),
  accountType: AccountType,
  displayName: z.string().or(z.null()),
  phoneNumber: z.string().or(z.null()),
  photoURL: z.string().or(z.null()),
});

export type NewUserPayloadFromGoogle = z.infer<
  typeof CreateAccountFromGoogleResource
>;

export const BranchDataResource = z.object({
  branchCode: z.string(),
  branchName: z.string(),
  id: z.string(),
  active: z.boolean(),
  managerData: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string().or(z.null()),
  }),
  managerName: z.string(),
  address: AddressResource.or(z.undefined()),
});

export type BranchDataSchema = z.infer<typeof BranchDataResource>;

export const CountUpdateResource = z.object({
  userId: z.string().or(z.undefined()),
  fieldName: z.union([
    z.literal("draftCount"),
    z.literal("submittedCount"),
    z.literal("completedCount"),
    z.literal("fastPoints"),
  ]),
  incrementBy: z.number(),
});

export type CountUpdateSchema = z.infer<typeof CountUpdateResource>;
