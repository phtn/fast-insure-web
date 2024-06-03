import { type IDMDraftRequestSchema } from "@/server/resource/request";
import { createDraftRequest } from "@/trpc/request/request";
import { errHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AgentToolProps = {
  userId: string | undefined;
};
export const useAgentTools = ({ userId }: AgentToolProps) => {
  const [loading, setLoading] = useState(false);

  const [id] = useState(
    new Date().getTime().toString(32) + userId?.substring(0, 16),
  );
  const route = useRouter();

  const payload: IDMDraftRequestSchema = {
    id,
    agentId: userId,
    assuredData: {
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      middleName: undefined,
      email: undefined,
      phone: undefined,
      address: {
        line1: undefined,
        line2: undefined,
        city: undefined,
        state: undefined,
        country: "PH",
        postalCode: undefined,
      },
    },
    policyType: "CTPL",
    files: [],
    status: "draft",
    remarks: "",
    active: true,
  };

  const handleCTPLRequest = () => {
    setLoading(true);

    createDraftRequest(payload)
      .then(() => {
        console.log("draft created");
      })
      .catch((e: Error) => errHandler(e, setLoading))
      .finally(() => route.push(`/account/request/${id}`));
  };

  /*
  id: z.string(),
    policyType: PolicyType,
    agentId: z.string(),
    agentCode: z.string(),
    agentName: z.string(),
    agentBranch: z.string(),
    files: z.array(z.string()).or(z.null()),
  */

  const handleCTPLRequestItem = () => {
    route.push(`/account/request/${userId}`);
  };

  return { handleCTPLRequest, loading, handleCTPLRequestItem };
};
