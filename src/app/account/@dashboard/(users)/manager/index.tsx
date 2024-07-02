import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Activity } from "./activity";
import { Tools } from "./tools";
import { TabList, TablistContainer, Trigger } from "../../(components)/styles";
import { Codes } from "./codes";
import { type UserProfileSchema } from "@/server/resource/account";
import { ManagerContextProvider } from "../../(context)/context";

const ManagerContent = (props: { profile: UserProfileSchema | undefined }) => {
  if (!props.profile) return;
  const { userId, branchCode } = props.profile;

  return (
    <ManagerContextProvider>
      <Tabs defaultValue="activity" className="m-0 w-full p-0">
        <Header>
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
    <TablistContainer>
      <TabList>
        <Trigger value="activity">Activity</Trigger>
        <Trigger value="codes">Codes</Trigger>
        <Trigger value="tools">Tools</Trigger>
      </TabList>
    </TablistContainer>
  );
};

export default ManagerContent;
