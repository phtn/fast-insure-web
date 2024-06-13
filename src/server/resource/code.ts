import { z } from "zod";

export const AgentCodeResource = z.object({
  userId: z.string().or(z.undefined()),
  code: z.string(),
  branchCode: z.string().or(z.undefined()),
});

export type AgentCodeSchema = z.infer<typeof AgentCodeResource>;

export const ActivationFormResource = z.object({
  agentCode: z.string(),
  branchCode: z.string(),
});

export type ActivationFormSchema = z.infer<typeof ActivationFormResource>;

export const CodeDataResource = z.object({
  id: z.string().or(z.undefined()),
  // userId: z.string().or(z.undefined()),
  active: z.boolean(),
  activated: z.boolean(),
  assignedId: z.string().or(z.undefined()),
  assignedName: z.string().or(z.undefined()),
  branchCode: z.string().or(z.undefined()),
  code: z.string(),
  createdAt: z.string().datetime(),
  createdBy: z.string().or(z.undefined()),
  dateAssigned: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CodeDataSchema = z.infer<typeof CodeDataResource>;

export const CodeListResource = z.object({
  activated: z.boolean(),
  branchCode: z.string().or(z.undefined()),
  code: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CodeListSchema = z.infer<typeof CodeListResource>;

const codelistSchema = CodeListResource.keyof();
export const UpdateCodeListResource = z.object({
  id: z.string().or(z.undefined()),
  userId: z.string().or(z.undefined()),
  payload: z.record(codelistSchema, z.any()),
});

export type UpdateCodeListSchema = z.infer<typeof UpdateCodeListResource>;

const codedataKey = CodeDataResource.keyof();
export const UpdateManagerCodeListResource = z.object({
  managerId: z.string().or(z.undefined()),
  id: z.string().or(z.undefined()),
  payload: z.record(codedataKey, z.any()),
});

export type UpdateManagerCodeListSchema = z.infer<
  typeof UpdateManagerCodeListResource
>;
