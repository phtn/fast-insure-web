import { z } from "zod";

export const CreateAutoResource = z.object({
  userId: z.string(),
  auto_data: z.record(z.string()),
  auto_name: z.string(),
  doc_url: z.string(),
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

export const VehicleData = z.object({
  amt: z.string(),
  auto_name: z.string(),
  body_type: z.string(),
  by: z.string(),
  chassis_no: z.string(),
  complete_owners_name: z.string(),
  cr: z.string(),
  create_at: z.number(),
  date: z.string(),
  denomination: z.string(),
  document_type: z.string(),
  engine_no: z.string(),
  expiration_date: z.string(),
  files: z.array(z.string()).nullable(),
  fuel: z.string(),
  gross_wt: z.string(),
  isActive: z.boolean(),
  is_salvage: z.string(),
  make: z.string(),
  mv_file_no: z.string(),
  net_capacity: z.string(),
  net_wt: z.string(),
  no_of_cylinders: z.string(),
  or_date: z.string(),
  or_no: z.string(),
  owner: z.string(),
  piston_displacement: z.string(),
  plate_no: z.string(),
  region_incumbered: z.string(),
  registrants_signature: z.string(),
  shipping_wt: z.string(),
  signature_date: z.string(),
  telephone_no_contact_detail: z.string(),
  updated_at: z.number(),
  vehicle_cat: z.union([
    z.literal("PR"),
    z.literal("MT"),
    z.literal("LM"),
    z.literal("HT"),
  ]),
  vin: z.string(),
  year_m: z.string(),
});

export type VehicleDataSchema = z.infer<typeof VehicleData>;
