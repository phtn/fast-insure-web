import { type CountUpdateSchema } from "@/server/resource/account";
import { type IDMDraftRequestSchema } from "@/server/resource/request";
import { countUpdate } from "@/trpc/account/user-profile";
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
      id: "",
      firstName: "",
      lastName: "",
      middleName: "",
      // email: "",
      phone: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "PH",
        postalCode: "",
      },
    },
    policyType: "CTPL",
    vehicleInfo: {
      plateNumber: "",
      conductionNumber: "",
    },
    files: [],
    status: "draft",
    remarks: "",
    active: true,
  };
  const incDraft: CountUpdateSchema = {
    fieldName: "draftCount",
    incrementBy: 1,
    userId,
  };
  const addPoints: CountUpdateSchema = {
    fieldName: "fastPoints",
    incrementBy: 5,
    userId,
  };

  const handleCreateRequest = () => {
    setLoading(true);

    createDraftRequest(payload)
      .then(() => {
        countUpdate(incDraft).catch(errHandler);
        countUpdate(addPoints).catch(errHandler);
        route.push(`/account/request/${id}`);
      })
      .catch(errHandler(setLoading));
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

  const handleRequestItemRoute = () => {
    route.push(`/account/request/${userId}`);
  };

  return { handleCreateRequest, loading, handleRequestItemRoute };
};
