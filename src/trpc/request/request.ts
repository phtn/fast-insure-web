"use server";

import { tRPC } from "@/trpc/rsc";
import type {
  IDMDraftRequestSchema,
  IDMRequestPayloadSchema,
  UpdateRequestSchema,
} from "@/server/resource/request";

export const createRequest = async (params: IDMRequestPayloadSchema) =>
  await tRPC.createRequest.query(params);

export const createDraftRequest = async (params: IDMDraftRequestSchema) =>
  await tRPC.createDraftRequest.query(params);

export const updateDraftRequest = async (params: UpdateRequestSchema) =>
  await tRPC.updateRequest.query(params);
