import { z } from "zod";
import { AccountType } from "./account";

export const RequestStatus = z.union([
  z.literal("draft"),
  z.literal("submitted"),
  z.literal("received"),
  z.literal("processing"),
  z.literal("complete"),
  z.literal("voided"),
]);

export type RequestStatusSchema = z.infer<typeof RequestStatus>;

export const Address = z.object({
  line1: z.string().or(z.undefined()),
  line2: z.string().or(z.undefined()),
  city: z.string().or(z.undefined()),
  state: z.string().or(z.undefined()),
  postalCode: z.string().or(z.undefined()),
  country: z.string().or(z.undefined()),
});

export const PlateTypeResource = z.union([
  z.literal("plate"),
  z.literal("induction"),
]);

export type PlateTypeSchema = z.infer<typeof PlateTypeResource>;

export const VehicleBodyType = z.union([
  z.literal("motorcycle"),
  z.literal("sedan"),
  z.literal("van"),
  z.literal("suv"),
  z.literal("auv"),
  z.literal("truck"),
  z.literal("bus"),
  z.literal("sidecar"),
  z.literal("trailer"),
]);

export type VehicleBodyTypeSchema = z.infer<typeof VehicleBodyType>;

export const VehicleInfo = z.object({
  make: z.string().or(z.undefined()),
  model: z.string().or(z.undefined()),
  year: z.string().or(z.undefined()),
  type: z.union([z.literal("public"), z.literal("private")]).or(z.undefined()),
  body: VehicleBodyType.or(z.undefined()),
  plateType: PlateTypeResource.or(z.undefined()),
  plateNumber: z.string().or(z.undefined()),
});

export type VehicleInfoSchema = z.infer<typeof VehicleInfo>;

export const PolicyType = z.union([
  z.literal("CTPL"),
  z.literal("CCI"),
  z.literal("PA"),
]);
export type PolicyTypeSchema = z.infer<typeof PolicyType>;

export type AddressSchema = z.infer<typeof Address>;

export const Metadata = z.record(
  z.string(),
  z
    .record(z.string())
    .or(z.number().or(z.boolean().or(z.null().or(z.undefined())))),
);

export type MetadataSchema = z.infer<typeof Metadata>;

export const IDMPolicyResource = z.object({
  id: z.string(),
  assuredName: z.string(),
  policyNumber: z.string(),
  policyType: PolicyType,
  policyEndDate: z.string(),
  policyStartDate: z.string(),
  policyStatus: z.string(),
  premiumAmount: z.string(),
  metadata: Metadata,
});
export type IDMPolicySchema = z.infer<typeof IDMPolicyResource>;

export const IDMAssuredResource = z.object({
  id: z.string().or(z.undefined()),
  firstName: z.string().or(z.undefined()),
  lastName: z.string().or(z.undefined()),
  middleName: z.string().or(z.undefined()),
  email: z.string().email().or(z.undefined()),
  phone: z.string().or(z.undefined()),
  address: Address.or(z.undefined()),
  metadata: Metadata.or(z.undefined()),
  policyId: z.string().or(z.undefined()),
  policyNumber: z.string().or(z.undefined()),
  policyData: IDMPolicyResource.or(z.undefined()),
});
export type IDMAssuredSchema = z.infer<typeof IDMAssuredResource>;

export const IDMAgentResource = z.object({
  id: z.string().or(z.undefined()),
  firstName: z.string().min(1).or(z.undefined()),
  lastName: z.string().min(1),
  middleName: z.string().or(z.undefined()),
  email: z.string().email(),
  phone: z.string(),
  address: Address,
  accountType: AccountType,
  handle: z.string(),
  totalSubmitted: z.number().or(z.null()),
  isActive: z.boolean(),
  group: z.string(),
  parentNode: z.string().or(z.null()),
  level: z.string(),
  childNode: z.string().or(z.null()),
  joinedSince: z.string().datetime(),
  badges: z.array(z.string().or(z.null())),
  pointsGained: z.number(),
});
export type IDMAgentSchema = z.infer<typeof IDMAgentResource>;

export const IDMAgentBasicInfo = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  handle: z.string(),
});
export type IDMAgentBasicInfoSchema = z.infer<typeof IDMAgentBasicInfo>;

export const IDMUnderwriterBasicInfo = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  handle: z.string(),
  insuranceGroup: z.string(),
});

export const IDMAgentCreateResource = z.object({
  id: z.string(),
  policyNumber: z.string(),
  policyType: PolicyType,
  agentId: z.string(),
  agentName: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  createdAt: z.string().datetime(),
  underwriterId: z.string(),
  underwriterName: z.string(),
  // agentData: IDMAgentBasicInfo,
  // policyData: IDMPolicyResource,
  // customerData: IDMCustomerResource,
  // underwriterData: IDMUnderwriterBasicInfo,
  // updatedAt: z.string().datetime(),
  // submittedItems: z.array(z.string()).or(z.null()),
  submittedAt: z.string().datetime(),
  submittedItemsCount: z.number().or(z.undefined()),
  status: z.string(),
  // remarks: z.string().or(z.null()),
  // metadata: Metadata,
});
export type IDMAgentCreateSchema = z.infer<typeof IDMAgentCreateResource>;

export const IDMRequestResource = z.object({
  id: z.string(),
  policyType: PolicyType,
  assuredId: z.string().or(z.undefined()),
  assuredName: z.string().or(z.undefined()),
  assuredData: IDMAssuredResource.or(z.undefined()),
  agentId: z.string().or(z.undefined()),
  agentCode: z.string().or(z.undefined()),
  agentName: z.string().or(z.undefined()),
  branchCode: z.string().or(z.undefined()),
  underwriterId: z.string().or(z.undefined()),
  underwriterName: z.string().or(z.undefined()),
  vehicleInfo: VehicleInfo.or(z.undefined()),
  files: z.array(z.string()).or(z.undefined()),
  active: z.boolean(),
  remarks: z.string().or(z.undefined()),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  status: RequestStatus,
});

export type IDMRequestSchema = z.infer<typeof IDMRequestResource>;

export const IDMUnderwriterCreateResource = z.object({
  id: z.string(),
  policyNumber: z.string(),
  policyType: z.string(),
  policyData: IDMPolicyResource,
  agentId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  submittedAt: z.string().datetime(),
  submittedItems: z.array(z.string()).or(z.null()),
  submittedItemsCount: z.number().or(z.undefined()),
  status: z.string(),
  remarks: z.string().or(z.null()),
  metadata: Metadata,
});
export type IDMUnderwriterCreateSchema = z.infer<
  typeof IDMUnderwriterCreateResource
>;
