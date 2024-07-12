import { Tabs } from "@/app/(ui)/tabs";
import {
  DocumentTextIcon,
  TableCellsIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";

import { Header } from "../../(components)/header";
import { TabList, TablistContainer, Trigger } from "../../(components)/styles";
import { AgentContextProvider } from "../../(context)/context";

import { Drafts } from "./drafts";
import { Requests } from "./requests";
import { Tools } from "./tools";

const AgentContent = () => {
  return (
    <AgentContextProvider>
      <Tabs defaultValue="requests" className="w-full">
        <Header>
          <Triggers />
        </Header>
        <Requests />
        <Drafts />
        <Tools />
      </Tabs>
    </AgentContextProvider>
  );
};

export const Triggers = () => {
  return (
    <TablistContainer>
      <TabList>
        <Trigger value="requests">
          <TableCellsIcon className="size-4" />
        </Trigger>
        <Trigger value="drafts">
          <DocumentTextIcon className="size-4" />
        </Trigger>
        <Trigger value="tools">
          <WrenchIcon className="size-4" />
        </Trigger>
      </TabList>
    </TablistContainer>
  );
};

export default AgentContent;
