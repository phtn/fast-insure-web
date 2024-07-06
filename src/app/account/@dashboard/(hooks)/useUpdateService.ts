import { AuthContext } from "@/app/(context)/context";
import type {
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@/server/resource/code";
import { type UpdateRequestSchema } from "@/server/resource/request";
import {
  updateCodeList,
  updateManagerCodeList,
} from "@/trpc/account/codes/update";
import { updateDraftRequest } from "@/trpc/request/request";
import { errHandler } from "@/utils/helpers";
import { onError, onSuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export const useUpdateService = () => {
  const profile = useContext(AuthContext)?.profile;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdateCode =
    (
      params: (UpdateCodeListSchema | UpdateManagerCodeListSchema) & {
        message: string;
      },
    ) =>
    () => {
      setLoading(true);
      params.userId = profile?.userId;
      params.payload.activated = true;
      if (!params.id || !profile?.userId) {
        onError("Unable to find code");
        return;
      }
      updateCodeList(params)
        .then(() => {
          onSuccess(params.message);
          setLoading(false);
        })
        .catch(errHandler(setLoading));

      if (profile?.accountType === "MANAGER") {
        updateManagerCodeList(params)
          .then(() => {
            onSuccess(params.message);
            setLoading(false);
          })
          .catch(errHandler(setLoading));
      }
    };

  const handleUpdateRequest =
    (params: UpdateRequestSchema & { message: string }) => () => {
      setLoading(true);
      if (!params.id && params.payload.status !== "draft") {
        setLoading(false);
        return;
      }
      updateDraftRequest(params)
        .then(() => {
          onSuccess(params.message);
          setLoading(false);
        })
        .catch(errHandler(setLoading));
    };

  const handleEditDraft = (id: string) => () => {
    router.push(`/account/request/${id}`);
  };

  return {
    loading,
    handleUpdateCode,
    handleUpdateRequest,
    handleEditDraft,
  };
};
