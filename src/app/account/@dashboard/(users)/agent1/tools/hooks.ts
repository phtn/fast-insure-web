import { AuthContext } from "@/app/(context)/context";
import { type CountUpdateSchema } from "@/server/resource/account";
import { type IDMDraftRequestSchema } from "@/server/resource/request";
import { countUpdate } from "@/trpc/account/user-profile";
import { createDraftRequest } from "@/trpc/request/request";
import { errHandler } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export const useAgentTools = () => {
  const profile = useContext(AuthContext)?.profile;
  const [loading, setLoading] = useState(false);

  const [id] = useState(
    new Date().getTime().toString(32) + profile?.userId?.substring(0, 16),
  );
  const route = useRouter();

  const payload: IDMDraftRequestSchema = {
    id,
    agentId: profile?.userId,
    agentName: profile?.displayName ?? "",
    agentEmail: profile?.email ?? "",
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
    userId: profile?.userId,
  };
  const addPoints: CountUpdateSchema = {
    fieldName: "fastPoints",
    incrementBy: 5,
    userId: profile?.userId,
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
    route.push(`/account/request/${profile?.userId}`);
  };

  return { handleCreateRequest, loading, handleRequestItemRoute };
};
