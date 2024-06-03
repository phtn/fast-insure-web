"use server";

import { type AgentCodeSchema } from "@resource/account";
import { tRPC } from "@/trpc/rsc";

export const createAgentCode = async (params: AgentCodeSchema) =>
  await tRPC.createAgentCode.query(params);
