import { db } from "@/libs/db";
import type { AgentCodeSchema } from "@resource/account";
import { doc, setDoc, collection } from "firebase/firestore";

export const createAgentCode = async (params: AgentCodeSchema) => {
  const docRef = collection(db, `users/${params.userId}/codes`);
  const datestring = new Date().getTime();
  await setDoc(doc(docRef, params.code.substring(0, 28)), {
    code: params.code.substring(0, 6).toUpperCase(),
    active: true,
    agentAssigned: null,
    createdBy: params.userId,
    createdAt: new Date(datestring).toISOString(),
  });
};
