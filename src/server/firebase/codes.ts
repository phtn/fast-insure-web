import { db } from "@/libs/db";
import type {
  AgentCodeSchema,
  CodeDataSchema,
  CodeListSchema,
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@resource/code";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { type TimelineSchema } from "../resource/account";

export const createAgentCode = async (params: AgentCodeSchema) => {
  const codesPath = String(process.env.NEXT_PUBLIC_LIVE_CODES);
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const { code, branchCode, userId } = params;
  const docRef = collection(db, `${usersPath}/${userId}/${codesPath}`);
  const datestring = new Date().getTime();
  const createdAt = new Date(datestring).toISOString();

  const codeRef = collection(db, codesPath);

  const code_list_item: CodeListSchema = {
    active: true,
    assigned: false,
    code: code.substring(0, 9),
    branchCode,
    createdAt,
    updatedAt: createdAt,
  };
  await setDoc(doc(codeRef, code.substring(0, 28)), code_list_item);

  const data: CodeDataSchema = {
    active: true,
    assigned: false,
    assignedId: "",
    assignedName: "",
    branchCode,
    code: code.substring(0, 9),
    createdAt,
    createdBy: params.userId,
    dateAssigned: "",
    updatedAt: createdAt,
  };
  await setDoc(doc(docRef, code.substring(0, 28)), data);

  const userRef = doc(db, `${usersPath}/${userId}`);
  const timeline: TimelineSchema = {
    active: true,
    type: "create",
    name: "code",
    title: "Code created",
    description: code.substring(0, 9),
    createdAt,
  };
  await updateDoc(userRef, {
    timeline: arrayUnion(timeline),
  });
};

export const updateCodeList = async (params: UpdateCodeListSchema) => {
  const codesPath = String(process.env.NEXT_PUBLIC_LIVE_CODES);
  const { id, userId } = params;
  if (!userId || !id) return;

  const docRef = doc(db, `${codesPath}/${id}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};

export const updateManagerCodeList = async (
  params: UpdateManagerCodeListSchema,
) => {
  const codesPath = String(process.env.NEXT_PUBLIC_LIVE_CODES);
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const { id, userId } = params;
  if (!userId || !id) return;

  const docRef = doc(db, `${usersPath}/${userId}/${codesPath}/${id}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};
