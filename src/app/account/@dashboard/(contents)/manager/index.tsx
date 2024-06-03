import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Activity } from "./activity";
import { Tools } from "./tools";
import { TabList, Trigger } from "../../(components)/styles";
import { Codes } from "./codes";
import { type UserProfileSchema } from "@/server/resource/account";

export const ManagerContent = (props: {
  profile: UserProfileSchema | undefined;
}) => {
  const { profile } = props;
  return (
    <Tabs defaultValue="activity" className="w-full ">
      <Header title="Today" extra={profile?.accountType}>
        <Triggers />
      </Header>
      <Activity />
      <Tools userId={profile?.userId} />
      <Codes />
    </Tabs>
  );
};

export const Triggers = () => {
  return (
    <div className="flex items-center space-x-2">
      <TabList>
        <Trigger value="activity">Activity</Trigger>
        <Trigger value="tools">Tools</Trigger>
        <Trigger value="codes">Codes</Trigger>
      </TabList>
    </div>
  );
};
