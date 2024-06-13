import type {
  DraftResponseSchema,
  IDMRequestFormSchema,
} from "@/server/resource/request";
import { useCallback, useEffect, useMemo } from "react";
import type { UseFormReset, UseFormWatch } from "react-hook-form";

type DraftValuesParams = {
  drafts: DraftResponseSchema[] | undefined;
  id: string | undefined;
  reset: UseFormReset<IDMRequestFormSchema>;
  watch: UseFormWatch<IDMRequestFormSchema>;
};
export const useDraftValues = (params: DraftValuesParams) => {
  const { drafts, id, reset, watch } = params;
  const watchAll = watch();

  const savedValues = useMemo(() => {
    if (drafts) {
      const doc = drafts?.find((item) => item.id === id);
      const assuredData = doc?.assuredData;

      if (doc) {
        return {
          firstName: assuredData?.firstName ?? "",
          lastName: assuredData?.lastName ?? "",
          middleName: assuredData?.middleName ?? "",
          email: assuredData?.email ?? "",
          phone: assuredData?.phone ?? "",
          line1: assuredData?.address?.line1 ?? "",
          line2: assuredData?.address?.line2 ?? "",
          city: assuredData?.address?.city ?? "",
          state: assuredData?.address?.state ?? "",
          country: assuredData?.address?.country ?? "PH",
          postalCode: assuredData?.address?.postalCode ?? "",
          policyType: doc.policyType ?? "CTPL",
          plateNumber: doc?.vehicleInfo?.plateNumber ?? "",
          remarks: doc?.remarks ?? "",
        };
      }
    }
  }, [drafts, id]);

  const fetchSavedValues = useCallback(() => {
    if (savedValues) {
      reset(savedValues);
    }
  }, [reset, savedValues]);

  useEffect(() => {
    const fetchDraftValues = () => {
      if (savedValues) {
        reset(savedValues);
      }
    };
    fetchDraftValues();
  }, [savedValues, reset]);

  return { watchAll, fetchSavedValues };
};
