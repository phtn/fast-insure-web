import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Requests } from "./requests";
import { Tools } from "./tools";
import { TabList, Trigger } from "../../(components)/styles";
import { Drafts } from "./drafts";
import { type UserProfileSchema } from "@/server/resource/account";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { InputCode } from "@/app/(ui)/input";
import { DarkTouch } from "@/app/(ui)/touch";
import { ShieldCheckIcon } from "lucide-react";

export const AgentContent = (props: {
  profile: UserProfileSchema | undefined;
}) => {
  const { profile } = props;
  const PageOptions = useCallback(() => {
    const setupComplete = profile?.setupComplete;
    const options = opts(<WithCode profile={profile} />, <SetupInit />);
    return <>{options.get(!!setupComplete)}</>;
  }, [profile]);
  return <PageOptions />;
};

const SetupInit = () => {
  return (
    <div className="h-[calc(100vh-134px)] w-full">
      <div className="h-full space-y-20 rounded-xl border-[0.33px] border-stone-300 bg-gradient-to-br from-stone-300/50 from-20% via-white via-50% to-neutral-50 p-4">
        <div className="flex w-full items-center space-x-2">
          <div className="flex items-center rounded-full bg-void/80 px-3.5 py-0.5 text-sm font-semibold tracking-tight">
            <p className=" bg-gradient-to-r from-cyan-100 via-sky-50 to-indigo-50 bg-clip-text text-transparent">
              FastInsure Tech
            </p>
          </div>
          <div className="flex items-start font-mono text-[10px] text-stone-500/80">
            Build release v0.0.2
          </div>
        </div>
        <div className="relative flex h-[350px] items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-spin border border-red-500 bg-void/0 bg-[url('/svg/h.svg')] bg-center bg-no-repeat transition-all duration-4000" />
          <div className="flex h-[420px] w-[400px] items-center">
            <div className="h-full w-full space-y-4">
              <div className="flex h-full w-full flex-col space-y-6 overflow-hidden rounded-md border-[0.33px] border-ash/50 bg-white/90 p-4 py-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-start space-x-2 py-4 text-coal">
                  <ShieldCheckIcon className="size-5 text-cyan-500" />
                  <p className="text-lg font-medium tracking-tight">
                    Account activation.
                  </p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm opacity-50">
                    Enter your code to activate your account. You can acquire an
                    activation code from your managing branch.
                  </p>
                </div>
                <div className="flex px-4">
                  <InputCode placeholder="code" />
                </div>
                <div className="w-full px-4">
                  <DarkTouch className="w-full" size={"lg"}>
                    <p>Submit</p>
                  </DarkTouch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithCode = (props: { profile: UserProfileSchema | undefined }) => (
  <Tabs defaultValue="requests" className="w-full ">
    <Header title="Today" extra={props.profile?.accountType}>
      <Triggers />
    </Header>
    <Requests />
    <Drafts />
    <Tools userId={props.profile?.userId} />
  </Tabs>
);

export const Triggers = () => {
  return (
    <div className="flex items-center space-x-2">
      <TabList>
        <Trigger value="requests">Requests</Trigger>
        <Trigger value="drafts">Drafts</Trigger>
        <Trigger value="tools">Tools</Trigger>
      </TabList>
    </div>
  );
};
