"use server";

import type { AgentCodeSchema } from "@/server/resource/code";
import { tRPC } from "@/trpc/rsc";

export const createAgentCode = async (params: AgentCodeSchema) =>
  await tRPC.createAgentCode.query(params);
