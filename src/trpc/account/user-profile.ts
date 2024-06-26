"use server";

import type {
  UpdateUserProfileSchema,
  NewUserPayload,
  NewUserPayloadFromGoogle,
  CountUpdateSchema,
} from "@resource/account";
import { tRPC } from "@/trpc/rsc";

export const createNewUser = async (values: NewUserPayload) =>
  await tRPC.createUser.query(values);

export const createNewUserFromGoogle = async (
  values: NewUserPayloadFromGoogle,
) => await tRPC.createUserFromGoogle.query(values);

export const updateUserProfile = async (params: UpdateUserProfileSchema) =>
  await tRPC.updateUserProfile.query(params);

export const countUpdate = async (params: CountUpdateSchema) =>
  await tRPC.countUpdate.query(params);
