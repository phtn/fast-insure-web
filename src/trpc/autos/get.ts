"use server";

import type {
  AllAutoSchema,
  GetAllAutoSchema,
  GetOneAutoSchema,
} from "@/server/resource/autos";
import { tRPC } from "../rsc";

export const getAllAuto = async (params: GetAllAutoSchema) => {
  return await tRPC.getAllAuto
    .query(params)
    .then((response: AllAutoSchema) => response);
};
export const getOneAuto = async (params: GetOneAutoSchema) => {
  return await tRPC.getOneAuto.query(params).then((response) => response);
};

export const getAutoUpdate = async (params: GetAllAutoSchema) => {
  return tRPC.getAutoUpdate.subscribe(params, {});
};
