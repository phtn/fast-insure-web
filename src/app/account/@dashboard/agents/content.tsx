"use client";

import { Header } from "../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { AllAgents } from "./(all)";
import { TabList, TablistContainer, Trigger } from "../(components)/styles";
import { ManagerContextProvider } from "../(context)/context";

const AgentsPageContent = () => {
  return (
    <ManagerContextProvider>
      <Tabs defaultValue="all" className="m-0 w-full">
        <Header>
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
    <TablistContainer>
      <TabList>
        <Trigger value="all">All</Trigger>
        <Trigger value="active">Active</Trigger>
        <Trigger value="ranks">Ranks</Trigger>
      </TabList>
    </TablistContainer>
  );
};

export default AgentsPageContent;
