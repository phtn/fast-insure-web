"use server";

import type {
  UpdateUserProfileSchema,
  NewUserPayload,
} from "@resource/account";
import { tRPC } from "@/trpc/rsc";

export const createNewUser = async (values: NewUserPayload) =>
  await tRPC.createUser.query(values);

export const updateUserProfile = async (params: UpdateUserProfileSchema) =>
  await tRPC.updateUserProfile.query(params);
