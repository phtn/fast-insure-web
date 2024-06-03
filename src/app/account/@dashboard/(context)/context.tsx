"use client";

import { AuthContext } from "@/app/(context)/context";
import { type AgentCodeSchema } from "@/server/resource/account";
import type { IDMAgentSchema, IDMRequestSchema } from "@/server/resource/idm";
import { auth, db } from "@@libs/db";
import { type FirestoreError, collection, doc } from "firebase/firestore";
import { createContext, useEffect, type ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

export type ListType = "drafts" | "requests";

export type AgentCtxType = {
  drafts: IDMRequestSchema[] | undefined;
  numberOfDrafts: number | undefined;
  requests: IDMRequestSchema[] | undefined;
  numberOfRequests: number | undefined;
  agentData: IDMAgentSchema | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};

export const AgentContext = createContext<AgentCtxType | null>(null);
export const AgentContextProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useAuthState(auth);
  const agentId = user?.uid;

  useEffect(() => {
    console.log(user?.uid);
  }, [user?.uid]);

  const reqs = collection(db, `requests`);
  const [query, loading, error] = useCollection(reqs, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const snapshot = query?.docs.map((doc) => {
    return doc.data() as IDMRequestSchema;
  });
  const drafts = snapshot?.filter(
    (item) => item.agentId === agentId && item.status === "draft",
  );

  const numberOfDrafts = drafts?.length;
  const requests = snapshot?.filter((item) => item.agentId === user?.uid);
  const numberOfRequests = requests?.length;
  const [values] = useDocumentData(doc(db, `users/${user?.uid}`));
  const agentData = values as IDMAgentSchema;

  return (
    <AgentContext.Provider
      value={{
        drafts,
        requests,
        numberOfDrafts,
        numberOfRequests,
        agentData,
        loading,
        error,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export type ManagerCtxType = {
  codes: AgentCodeSchema[] | undefined;
  // requests: IDMRequestSchema[] | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};
export const ManagerContext = createContext<ManagerCtxType | null>(null);

export const ManagerContextProvider = (props: { children: ReactNode }) => {
  const profile = useContext(AuthContext)?.profile;

  const codeRef = collection(db, `users/${profile?.userId}/codes`);
  const [query, loading, error] = useCollection(codeRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const codes = query?.docs.map((doc) => {
    return doc.data() as AgentCodeSchema;
  });

  return (
    <ManagerContext.Provider value={{ codes, loading, error }}>
      {props.children}
    </ManagerContext.Provider>
  );
};
