import { db } from "@/libs/db";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import type {
  IDMDraftRequestSchema,
  IDMRequestPayloadSchema,
  UpdateRequestSchema,
} from "../resource/request";
import { type TimelineSchema } from "../resource/account";
import { errHandler } from "@/utils/helpers";

export const createRequest = async (params: IDMRequestPayloadSchema) => {
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);

  if (params.id) {
    const datestring = new Date().getTime();
    await setDoc(doc(db, reqsPath, params.id), {
      ...params,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
    }).catch((e: Error) => e);

    const userRef = doc(db, `${usersPath}/${params.agentId}`);
    const timeline: TimelineSchema = {
      active: true,
      type: "create",
      name: "submitted",
      title: "Request submitted",
      description: params.id,
      createdAt: new Date(datestring).toISOString(),
    };
    await updateDoc(userRef, {
      timeline: arrayUnion(timeline),
    });
  } else {
    return "Unable to read payload.";
  }
};

export const createDraftRequest = async (params: IDMDraftRequestSchema) => {
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);

  const datestring = new Date().getTime();

  if (params.id) {
    await setDoc(doc(db, reqsPath, params.id), {
      ...params,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
      email: "",
    }).catch(errHandler);
  } else {
    return "Unable to read payload.";
  }

  const userRef = doc(db, `${usersPath}/${params.agentId}`);
  const timeline: TimelineSchema = {
    active: true,
    type: "create",
    name: "draft",
    title: "Draft created",
    description: params.id,
    createdAt: new Date(datestring).toISOString(),
  };
  await updateDoc(userRef, {
    timeline: arrayUnion(timeline),
  });
};

export const updateRequest = async (params: UpdateRequestSchema) => {
  const { id, payload } = params;
  if (!id) return;

  const datestring = new Date().getTime();

  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  const docRef = doc(db, `${reqsPath}/${params.id}`);

  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });

  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const userRef = doc(db, `${usersPath}/${payload.agentId}`);

  const isDraft = payload.status === "draft";

  const timeline: TimelineSchema = {
    active: true,
    type: isDraft ? "update" : "create",
    name: payload.status as TimelineSchema["name"],
    title: isDraft ? `Draft updated` : `Request ${payload.status}`,
    description: `${params.payload.assuredName ?? params.id}`,
    createdAt: new Date(datestring).toISOString(),
  };
  await updateDoc(userRef, {
    timeline: arrayUnion(timeline),
  });
};
