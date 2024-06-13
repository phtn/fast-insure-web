import type {
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@/server/resource/code";
import {
  updateCodeList,
  updateManagerCodeList,
} from "@/trpc/account/codes/update";
import { onError } from "@/utils/toast";

export const useUpdateService = () => {
  const handleUpdateCodeList = async (params: UpdateCodeListSchema) => {
    const { id, userId } = params;
    if (!id || !userId) {
      onError("Unable to find code");
      return;
    }
    await updateCodeList(params);
  };

  const handleUpdateManagerCodeList = async (
    params: UpdateManagerCodeListSchema,
  ) => {
    const { id, managerId } = params;
    if (!id || !managerId) {
      onError("Unable to find branch code.");
      return;
    }
    await updateManagerCodeList(params);
  };
  return { handleUpdateCodeList, handleUpdateManagerCodeList };
};
