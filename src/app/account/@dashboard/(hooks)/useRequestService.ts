import { AuthContext } from "@/app/(context)/context";
import type { UserProfileSchema } from "@/server/resource/account";
import type {
  IDMAssuredSchema,
  PlateTypeSchema,
  PolicyTypeSchema,
} from "@/server/resource/idm";
import type {
  IDMRequestFormSchema,
  IDMRequestPayloadSchema,
  UpdateRequestSchema,
} from "@/server/resource/request";
import { createRequest, updateDraftRequest } from "@/trpc/request/request";
import { createRefNo, errHandler, formDisplayname } from "@/utils/helpers";
import { onSuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type SubmitRequestHookParams = {
  id: string | undefined;
};
export const useSubmitRequest = (params: SubmitRequestHookParams) => {
  const route = useRouter();
  const { id } = params;
  const ctx = useContext(AuthContext);
  const profile: UserProfileSchema | undefined = ctx?.profile;
  const [policyType, setPolicyType] = useState<PolicyTypeSchema | undefined>();
  const [plateType, setPlateType] = useState<PlateTypeSchema | undefined>();
  const [assuredId, setAssuredId] = useState<string | undefined>();
  const [submitLoading, setLoading] = useState(false);

  const getId = async () =>
    await createRefNo().then((result) => setAssuredId(result.substring(0, 24)));

  useEffect(() => {
    getId()
      .then((res) => res)
      .catch((e: Error) => e);
  }, []);

  const checker = !!id || !!policyType || !!assuredId || !!profile;

  // console.log(id, policyType, assuredId, profile, !!checker);

  const submit = (data: IDMRequestFormSchema) => {
    setLoading(true);
    if (!checker) return;

    const assuredData: IDMAssuredSchema = {
      id: assuredId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      email: data.email,
      phone: data.phone,
      address: {
        line1: data.line1,
        line2: data.line2,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
      },
      metadata: undefined,
    };

    const vehicleInfo = {
      plateType,
      plateNumber: data.plateNumber,
    };

    const assuredName = formDisplayname({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    });

    const requestPayload: IDMRequestPayloadSchema = {
      id,
      policyType,
      assuredId,
      assuredName,
      assuredData: assuredData,
      agentId: profile?.userId,
      agentName: profile?.displayName ?? profile?.email,
      branchCode: profile?.branchCode,
      underwriterId: String(process.env.NEXT_PUBLIC_UNDERWRITER_ID),
      underwriterName: String(process.env.NEXT_PUBLIC_UNDERWRITER_NAME),
      vehicleInfo,
      files: [],
      status: "submitted",
      active: true,
      remarks: data.remarks,
    };

    createRequest(requestPayload)
      .then(() => {
        onSuccess("Request submitted successfully!", `Assured: ${assuredName}`);
        setLoading(false);
        route.push(`/account`);
      })
      .catch(errHandler(setLoading));
  };

  const saveDraft = (data: IDMRequestFormSchema | undefined) => {
    if (!data) return;

    const assuredData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      middleName: data?.middleName,
      email: data?.email,
      phone: data?.phone,
      address: {
        line1: data?.line1,
        line2: data?.line2,
        city: data?.city,
        state: data?.state,
        country: data?.country ?? "PH",
        postalCode: data?.postalCode,
      },
    };
    const { plateNumber } = data;
    const vehicleInfo = { plateNumber, plateType };
    const { remarks } = data;

    const draftPayload: UpdateRequestSchema = {
      id,
      payload: {
        agentName: profile?.displayName ?? profile?.email,
        assuredName: formDisplayname({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
        }),
        branchCode: profile?.branchCode,
        assuredData,
        vehicleInfo,
        active: true,
        policyType,
        remarks,
      },
    };

    updateDraftRequest(draftPayload)
      .then(() => {
        onSuccess("Draft saved successfully.", "success");
      })
      .catch(errHandler(setLoading));
  };

  return {
    setPolicyType,
    setPlateType,
    policyType,
    submit,
    submitLoading,
    saveDraft,
  };
};
