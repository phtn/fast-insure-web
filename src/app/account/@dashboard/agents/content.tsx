"use client";

import { Header } from "../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { AllAgents } from "./(all)";
import { TabList, Trigger } from "../(components)/styles";
import { ManagerContextProvider } from "../(context)/context";
import { useContext } from "react";
import { AuthContext } from "@/app/(context)/context";

const AgentsPageContent = () => {
  const profile = useContext(AuthContext)?.profile;
  const displayName = profile?.displayName;
  const userName = profile?.email?.substring(0, profile?.email.indexOf(`@`));
  return (
    <ManagerContextProvider>
      <Tabs defaultValue="all" className="m-0 w-full">
        <Header
          title={displayName ?? userName ?? `Partner!`}
          extra={profile?.accountType}
        >
          <Triggers />
        </Header>
        <AllAgents />
        {/* <Tools userId={profile?.userId} branchCode={profile?.branchCode} /> */}
        {/* <Codes /> */}
      </Tabs>
    </ManagerContextProvider>
  );
};

const Triggers = () => {
  return (
    <div className="flex w-full items-center space-x-2 portrait:h-[36px] portrait:space-x-0">
      <TabList>
        <Trigger value="all">All</Trigger>
        <Trigger value="active">Active</Trigger>
        <Trigger value="ranks">Ranks</Trigger>
      </TabList>
    </div>
  );
};

export default AgentsPageContent;
