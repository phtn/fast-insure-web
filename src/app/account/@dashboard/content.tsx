"use client";
import { useConnect } from "./hooks";
import { Loader } from "../(components)/loader";
import { ManagerContent } from "./(contents)/manager";
import { AgentContent } from "./(contents)/agent1";
import {
  AgentContextProvider,
  ManagerContextProvider,
} from "./(context)/context";

export const DashboardContent = () => {
  const { accountType, profile } = useConnect();
  if (!accountType) return <Loader />;
  return accountType === "MANAGER" ? (
    <ManagerContextProvider>
      <ManagerContent profile={profile} />
    </ManagerContextProvider>
  ) : (
    <AgentContextProvider>
      <AgentContent profile={profile} />
    </AgentContextProvider>
  );
};
