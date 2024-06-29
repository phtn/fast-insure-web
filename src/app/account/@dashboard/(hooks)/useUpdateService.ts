import { auth } from "@/libs/db";
import type {
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@/server/resource/code";
import { type UpdateRequestSchema } from "@/server/resource/request";
import { updateManagerCodeList } from "@/trpc/account/codes/update";
import { updateDraftRequest } from "@/trpc/request/request";
import { errHandler } from "@/utils/helpers";
import { onError, onSuccess } from "@/utils/toast";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUpdateService = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleUpdateCode =
    (
      params: (UpdateCodeListSchema | UpdateManagerCodeListSchema) & {
        message: string;
      },
    ) =>
    () => {
      setLoading(true);
      params.userId = user?.uid;
      if (!params.id || !user?.uid) {
        onError("Unable to find code");
        return;
      }
      // updateCodeList(params)
      //   .then(() => {
      //     onSuccess(params.message);
      //     setLoading(false);
      //   })
      //   .catch(errHandler(setLoading));

      updateManagerCodeList(params)
        .then(() => {
          onSuccess(params.message);
          setLoading(false);
        })
        .catch(errHandler(setLoading));
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
  return {
    loading,
    handleUpdateCode,
    handleUpdateRequest,
  };
};
