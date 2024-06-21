import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Activity } from "./activity";
import { Tools } from "./tools";
import { TabList, Trigger } from "../../(components)/styles";
import { Codes } from "./codes";
import { type UserProfileSchema } from "@/server/resource/account";
import { ManagerContextProvider } from "../../(context)/context";

const ManagerContent = (props: { profile: UserProfileSchema | undefined }) => {
  if (!props.profile) return;
  const { accountType, displayName, userId, branchCode, email } = props.profile;
  const userName = email?.substring(0, email.indexOf(`@`));
  return (
    <ManagerContextProvider>
      <Tabs defaultValue="activity" className="m-0 w-full">
        <Header
          title={displayName ?? userName ?? `Partner!`}
          extra={accountType}
        >
          <Triggers />
        </Header>
        <Activity />
        <Tools userId={userId} branchCode={branchCode} />
        <Codes />
      </Tabs>
    </ManagerContextProvider>
  );
};

const Triggers = () => {
  return (
    <div className="flex w-[calc(100vw/4)] items-end space-x-2 portrait:h-[36px] portrait:space-x-0">
      <TabList>
        <Trigger value="activity">Activity</Trigger>
        <Trigger value="codes">Codes</Trigger>
        <Trigger value="tools">Tools</Trigger>
      </TabList>
    </div>
  );
};

export default ManagerContent;
