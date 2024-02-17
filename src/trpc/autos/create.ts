"use server";

import { type CreateAutoSchema } from "@/server/resource/autos";
import { tRPC } from "../rsc";

export const createAuto = async (params: CreateAutoSchema) => {
  return await tRPC.createAuto.query(params).then((response) => response);
};
