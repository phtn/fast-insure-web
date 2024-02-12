import { z } from "zod";

export const CreateAutoResource = z.object({
  userId: z.string(),
  auto_data: z.record(z.string()),
  auto_name: z.string(),
});

export const AutoDataResource = z.record(z.string());
export const AllAutoResource = z.array(AutoDataResource);

export const GetAllAutoResource = z.object({
  userId: z.string(),
  // callback: z.function().args(z.array(AutoDataResource)).returns(z.void()),
  lim: z.number().optional(),
  query: z.string().optional(),
  order: z.union([z.literal("asc"), z.literal("desc")]).optional(),
});

export const GetOneResource = z.object({
  userId: z.string(),
  docId: z.string(),
});

export type CreateAutoSchema = z.infer<typeof CreateAutoResource>;
export type AutoDataSchema = z.infer<typeof AutoDataResource>;
export type AllAutoSchema = z.infer<typeof AllAutoResource>;
export type GetAllAutoSchema = z.infer<typeof GetAllAutoResource>;
export type GetOneAutoSchema = z.infer<typeof GetOneResource>;
