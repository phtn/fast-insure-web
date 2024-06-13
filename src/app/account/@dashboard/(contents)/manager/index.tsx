import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Activity } from "./activity";
import { Tools } from "./tools";
import { TabList, Trigger } from "../../(components)/styles";
import { Codes } from "./codes";
import { type UserProfileSchema } from "@/server/resource/account";
import { ManagerContextProvider } from "../../(context)/context";

const ManagerContent = (props: { profile: UserProfileSchema | undefined }) => {
  const { profile } = props;
  const displayName = profile?.displayName;
  const userName = profile?.email?.substring(0, profile?.email.indexOf(`@`));
  return (
    <ManagerContextProvider>
      <Tabs defaultValue="activity" className="m-0 w-full">
        <Header
          title={displayName ?? userName ?? `Partner!`}
          extra={profile?.accountType}
        >
          <Triggers />
        </Header>
        <Activity />
        <Tools userId={profile?.userId} branchCode={profile?.branchCode} />
        <Codes />
      </Tabs>
    </ManagerContextProvider>
  );
};

const Triggers = () => {
  return (
    <div className="flex w-full items-center space-x-2 portrait:h-[36px] portrait:space-x-0">
      <TabList>
        <Trigger value="activity">Activity</Trigger>
        <Trigger value="codes">Codes</Trigger>
        <Trigger value="tools">Tools</Trigger>
      </TabList>
    </div>
  );
};

export default ManagerContent;
