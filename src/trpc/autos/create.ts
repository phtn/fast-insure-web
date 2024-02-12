"use server";

import { CreateAutoSchema } from "@/server/resource/autos";
import { tRPC } from "../rsc";

export const createAuto = async (params: CreateAutoSchema) => {
  return await tRPC.createAuto.query(params).then((res) => res);
};
