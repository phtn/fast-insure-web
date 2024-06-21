import { db } from "@/libs/db";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import type {
  IDMDraftRequestSchema,
  IDMRequestPayloadSchema,
  UpdateRequestSchema,
} from "../resource/request";

export const createRequest = async (params: IDMRequestPayloadSchema) => {
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  if (params.id) {
    const datestring = new Date().getTime();
    await setDoc(doc(db, reqsPath, params.id), {
      ...params,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
    }).catch((e: Error) => e);
  } else {
    return "Unable to read payload.";
  }
};

export const createDraftRequest = async (params: IDMDraftRequestSchema) => {
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  if (params.id) {
    const datestring = new Date().getTime();
    await setDoc(doc(db, reqsPath, params.id), {
      ...params,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
    }).catch((e: Error) => e);
  } else {
    return "Unable to read payload.";
  }
};

export type UpdateRequestParams = {
  id: string | undefined;
  payload: Record<
    keyof IDMRequestPayloadSchema,
    string | number | boolean | Record<string, string | number | boolean>
  >;
};
export const updateRequest = async (params: UpdateRequestSchema) => {
  if (!params.id) return;
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);

  const docRef = doc(db, `${reqsPath}/${params.id}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};
