"use server";
import { type NewUserPayload } from "@resource/account";
import { tRPC } from "@/trpc/rsc";

export const createNewUser = async (values: NewUserPayload) =>
  await tRPC.createUser.query(values);
