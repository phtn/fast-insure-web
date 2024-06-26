"use client";

import { AuthContext } from "@/app/(context)/context";
import type { UserProfileSchema } from "@/server/resource/account";
import type { CodeDataSchema } from "@/server/resource/code";
import type { IDMRequestSchema } from "@/server/resource/idm";
import { auth, db } from "@@libs/db";
import {
  type FirestoreError,
  collection,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { createContext, type ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { type Options } from "react-firebase-hooks/firestore/dist/firestore/types";
// useDocumentData

export type ListType = "drafts" | "requests";

export type AgentCtxType = {
  drafts: IDMRequestSchema[] | undefined;
  numberOfDrafts: number | undefined;
  requests: IDMRequestSchema[] | undefined;
  numberOfRequests: number | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};

export const AgentContext = createContext<AgentCtxType | null>(null);
export const AgentContextProvider = ({ children }: { children: ReactNode }) => {
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  const [user] = useAuthState(auth);
  const agentId = user?.uid;

  const reqRef = collection(db, reqsPath);
  const queryRef = query(reqRef, orderBy("updatedAt", "desc"));
  const [values, loading, error] = useCollection(queryRef, options);

  const snapshot = values?.docs.map((doc) => {
    return doc.data() as IDMRequestSchema;
  });
  const drafts = snapshot?.filter(
    (item) => item.agentId === agentId && item.status === "draft",
  );

  const numberOfDrafts = drafts?.length;
  const requests = snapshot?.filter(
    (item) => item.agentId === user?.uid && item.status !== "draft",
  );
  const numberOfRequests = requests?.length;

  return (
    <AgentContext.Provider
      value={{
        drafts,
        requests,
        numberOfDrafts,
        numberOfRequests,
        loading,
        error,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export type ManagerCtxType = {
  codes: CodeDataSchema[] | undefined;
  requests: IDMRequestSchema[] | undefined;
  allAgents: UserProfileSchema[] | undefined;
  fetchingAgents: boolean;
  agentsError: FirestoreError | undefined;
  fetchingReqs: boolean;
  reqError: FirestoreError | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
};
export const ManagerContext = createContext<ManagerCtxType | null>(null);

export const ManagerContextProvider = (props: { children: ReactNode }) => {
  const codesPath = String(process.env.NEXT_PUBLIC_LIVE_CODES);
  const reqsPath = String(process.env.NEXT_PUBLIC_LIVE_REQS);
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const profile = useContext(AuthContext)?.profile;
  // const path = `${usersPath}/${profile?.userId}/${codesPath}`;

  //_ CODES
  const codesRef = collection(db, codesPath);
  const queryCodesRef = query(codesRef, orderBy(`createdAt`, "desc"));
  const [codesCollection, loading, error] = useCollection(
    queryCodesRef,
    options,
  );
  const allCodes = codesCollection?.docs.map((doc) => {
    const data = doc.data() as CodeDataSchema;
    return { ...data, id: doc.id };
  });

  const codes = allCodes?.filter(
    (code) => code.branchCode === profile?.branchCode,
  );

  //_  REQUESTS
  const reqRef = collection(db, reqsPath);
  const queryReqRef = query(reqRef, orderBy("updatedAt", "desc"));
  const [reqsCollection, fetchingReqs, reqError] = useCollection(
    queryReqRef,
    options,
  );
  const allRequests = reqsCollection?.docs.map(
    (doc) => doc.data() as IDMRequestSchema,
  );
  const requests = allRequests?.filter((request) => request.active);
  // .filter((doc) => {
  //   if (doc.agentId !== profile?.userId) {
  //     return doc.branchCode === profile?.branchCode && doc.status !== "draft";
  //   }
  // });

  //_  AGENTS
  const agentsRef = collection(db, usersPath);
  const agentsQueryRef = query(
    agentsRef,
    where("accountType", "in", ["AGENT1", "AGENT2"]),
    // orderBy("createdAt", "desc"),
  );
  const [agentsCollection, fetchingAgents, agentsError] = useCollection(
    agentsQueryRef,
    options,
  );
  const allAgents = agentsCollection?.docs
    .map((doc) => doc.data() as UserProfileSchema)
    .filter((agent) => agent.branchCode === profile?.branchCode);

  return (
    <ManagerContext.Provider
      value={{
        codes,
        requests,
        allAgents,
        fetchingAgents,
        agentsError,
        fetchingReqs,
        reqError,
        loading,
        error,
      }}
    >
      {props.children}
    </ManagerContext.Provider>
  );
};

const options: Options = {
  snapshotListenOptions: { includeMetadataChanges: true },
};
