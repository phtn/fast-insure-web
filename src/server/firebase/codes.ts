import { db } from "@/libs/db";
import type {
  AgentCodeSchema,
  CodeDataSchema,
  CodeListSchema,
  UpdateCodeListSchema,
  UpdateManagerCodeListSchema,
} from "@resource/code";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";

export const createAgentCode = async (params: AgentCodeSchema) => {
  const { code, branchCode, userId } = params;
  const docRef = collection(db, `users/${userId}/codes`);
  const datestring = new Date().getTime();
  const createdAt = new Date(datestring).toISOString();

  const data: CodeDataSchema = {
    active: true,
    activated: false,
    assignedId: "",
    assignedName: "",
    branchCode,
    code: code.substring(0, 6),
    createdAt,
    createdBy: params.userId,
    dateAssigned: "",
    updatedAt: createdAt,
  };
  await setDoc(doc(docRef, code.substring(0, 28)), data);

  const codeRef = collection(db, `codes`);
  const code_list_item: CodeListSchema = {
    activated: false,
    code: code.substring(0, 6),
    branchCode,
    createdAt,
    updatedAt: createdAt,
  };
  await setDoc(doc(codeRef, code.substring(0, 28)), code_list_item);
};

export const updateCodeList = async (params: UpdateCodeListSchema) => {
  const { id, userId } = params;
  if (!userId || !id) return;

  const docRef = doc(db, `codes/${id}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};

export const updateManagerCodeList = async (
  params: UpdateManagerCodeListSchema,
) => {
  const { id, managerId } = params;
  if (!managerId || !id) return;

  const docRef = doc(db, `users/${managerId}/codes/${id}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};
