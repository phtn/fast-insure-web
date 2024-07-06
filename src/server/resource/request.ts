import { z } from "zod";
import {
  IDMAssuredResource,
  PlateTypeResource,
  PolicyType,
  RequestStatus,
  VehicleInfo,
} from "./idm";

export const IDMRequestPayload = z.object({
  id: z.string().or(z.undefined()),
  policyType: PolicyType.or(z.undefined()),
  assuredId: z.string().or(z.undefined()),
  assuredName: z.string().or(z.undefined()),
  assuredData: IDMAssuredResource.or(z.undefined()),
  agentId: z.string().or(z.undefined()),
  agentCode: z.string().or(z.undefined()),
  agentName: z.string().or(z.null()).or(z.undefined()),
  branchCode: z.string().or(z.undefined()),
  underwriterId: z.string().or(z.undefined()),
  underwriterName: z.string().or(z.undefined()),
  plateType: PlateTypeResource.or(z.undefined()),
  plateNumber: z.string().or(z.undefined()),
  files: z.array(z.string()).or(z.null()),
  status: RequestStatus,
  active: z.boolean(),
  remarks: z.string().or(z.undefined()),
  vehicleInfo: VehicleInfo.or(z.undefined()),
});

export type IDMRequestPayloadSchema = z.infer<typeof IDMRequestPayload>;

export const IDMRequestForm = z.object({
  policyType: PolicyType.or(z.undefined()),
  assuredId: z.string().or(z.undefined()),
  firstName: z.string().or(z.undefined()),
  lastName: z.string().or(z.undefined()),
  middleName: z.string().or(z.undefined()),
  email: z.string().email().or(z.undefined()),
  phone: z.string().or(z.undefined()),
  postalCode: z.string().or(z.undefined()),
  line1: z.string().or(z.undefined()),
  line2: z.string().or(z.undefined()),
  city: z.string().or(z.undefined()),
  state: z.string().or(z.undefined()),
  country: z.string().or(z.undefined()),
  plateNumber: z.string().or(z.undefined()),
  conductionNumber: z.string().or(z.undefined()),
  remarks: z.string().or(z.undefined()),
});

export type IDMRequestFormSchema = z.infer<typeof IDMRequestForm>;

export const IDMDraftRequestPayload = z.object({
  id: z.string(),
  policyType: PolicyType.or(z.undefined()),
  agentEmail: z.string().email().or(z.undefined()),
  agentId: z.string().or(z.undefined()),
  agentName: z.string().or(z.undefined()),
  assuredId: z.string().or(z.undefined()),
  assuredData: IDMAssuredResource.or(z.undefined()),
  vehicleInfo: VehicleInfo.or(z.undefined()),
  files: z.array(z.string()).or(z.undefined()),
  status: RequestStatus,
  remarks: z.string().or(z.undefined()),
  active: z.boolean(),
});

export type IDMDraftRequestSchema = z.infer<typeof IDMDraftRequestPayload>;

export const DraftResponse = z.object({
  active: z.boolean(),
  agentId: z.string().or(z.undefined()),
  agentName: z.string().or(z.undefined()),
  assuredData: IDMAssuredResource.or(z.undefined()),
  assuredId: z.string().or(z.undefined()),
  assuredName: z.string().or(z.undefined()),
  branchCode: z.string().or(z.undefined()),
  createdAt: z.string().datetime(),
  files: z.array(z.string()).or(z.undefined()),
  id: z.string(),
  policyType: PolicyType.or(z.undefined()),
  remarks: z.string().or(z.undefined()),
  status: RequestStatus,
  underwriterId: z.string().or(z.undefined()),
  underwriterName: z.string().or(z.undefined()),
  updatedAt: z.string().datetime(),
  vehicleInfo: VehicleInfo.or(z.undefined()),
});

export type DraftResponseSchema = z.infer<typeof DraftResponse>;

const keySchema = IDMRequestPayload.keyof();

export const UpdateRequestResource = z.object({
  id: z.string().or(z.undefined()),
  payload: z.record(keySchema, z.any()),
});

export type UpdateRequestSchema = z.infer<typeof UpdateRequestResource>;
