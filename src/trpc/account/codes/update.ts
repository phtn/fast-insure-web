"use server";

import type {
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@/server/resource/code";
import { tRPC } from "@/trpc/rsc";

export const updateCodeList = async (params: UpdateCodeListSchema) =>
  await tRPC.updateCodeList.query(params);

export const updateManagerCodeList = async (
  params: UpdateManagerCodeListSchema,
) => await tRPC.updateManagerCodeList.query(params);
