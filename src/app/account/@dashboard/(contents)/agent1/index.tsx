import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Requests } from "./requests";
import { Tools } from "./tools";
import { TabList, Trigger } from "../../(components)/styles";
import { Drafts } from "./drafts";
import { type UserProfileSchema } from "@/server/resource/account";
import {
  ActivationFormResource,
  type CodeListSchema,
  type ActivationFormSchema,
} from "@/server/resource/code";
import { useCallback, useState } from "react";
import { errHandler, opts } from "@/utils/helpers";
import { InputCode } from "@/app/(ui)/input";
import { DarkTouch } from "@/app/(ui)/touch";
import { LoaderIcon, ShieldCheckIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/libs/db";
import { Form } from "@/app/(ui)/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activationDefaults } from "./activation";
import { onError, onSuccess } from "@/utils/toast";
import { useProfile } from "@/app/account/@signin/hooks";
import { AgentContextProvider } from "../../(context)/context";
import { useUpdateService } from "../../(hooks)/useUpdateService";

const AgentContent = (props: { profile: UserProfileSchema | undefined }) => {
  const { profile } = props;
  const PageOptions = useCallback(() => {
    const setupComplete = profile?.setupComplete;
    const options = opts(
      <WithCode profile={profile} />,
      <SetupInit
        setupComplete={setupComplete}
        userId={profile?.userId}
        displayName={profile?.displayName}
      />,
    );
    return <>{options.get(!!setupComplete)}</>;
  }, [profile]);
  return (
    <AgentContextProvider>
      <PageOptions />
    </AgentContextProvider>
  );
};

const SetupInit = (props: {
  displayName: string | undefined;
  userId: string | undefined;
  setupComplete: boolean | undefined;
}) => {
  const CardOptions = useCallback(() => {
    const setupReady = typeof props.setupComplete !== "undefined";
    const options = opts(
      <ActivationCard userId={props.userId} agentName={props?.displayName} />,
      <ActivationLoading />,
    );
    return <>{options.get(setupReady)}</>;
  }, [props.setupComplete, props.userId, props.displayName]);

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
        <div className="relative flex h-[500px] items-center justify-center">
          <div className="absolute flex w-full animate-pulse items-center justify-center opacity-50 duration-4000">
            <div className="absolute h-[300px] w-[300px] animate-spin rounded-full bg-void/0 bg-[url('/svg/h.svg')] bg-center bg-no-repeat opacity-50 duration-4000" />
          </div>
          <CardOptions />
        </div>
      </div>
    </div>
  );
};

const ActivationLoading = () => (
  <div className="flex h-[550px] w-[400px] items-center">
    <div className="h-full w-full space-y-4">
      <div className="flex h-full w-full flex-col space-y-6 overflow-hidden rounded-md border-[0.33px] border-ash/80 bg-white/50 p-4 py-4 shadow-lg backdrop-blur-lg">
        <div className="flex items-center justify-start space-x-2 px-2 py-4 text-coal">
          <LoaderIcon className="size-5 animate-spin text-cyan-500" />
          <p className="text-lg font-medium tracking-tight">Authorizing...</p>
        </div>
      </div>
    </div>
  </div>
);

const ActivationCard = (props: {
  userId: string | undefined;
  agentName: string | undefined;
}) => {
  const [loading, setLoading] = useState(false);

  const codesRef = collection(db, "codes");
  const [codelist] = useCollection(codesRef);

  const allCodes = codelist?.docs.map((doc) => {
    const data = doc.data();
    return { ...data, id: doc.id } as CodeListSchema & { id: string };
  });

  const userRef = collection(db, `users`);
  const [users] = useCollection(userRef);

  const allUsers = users?.docs.map((user) => user.data()) as
    | UserProfileSchema[]
    | undefined;
  const managers = allUsers?.filter((user) => user?.accountType === "MANAGER");

  const form = useForm<ActivationFormSchema>({
    resolver: zodResolver(ActivationFormResource),
    defaultValues: activationDefaults,
  });

  const { handleUpdateProfile } = useProfile();
  const { handleUpdateCodeList, handleUpdateManagerCodeList } =
    useUpdateService();

  const onSubmit = (data: ActivationFormSchema) => {
    const { agentCode, branchCode } = data;
    const datestring = new Date().getTime();

    const branchCodes = allCodes?.filter(
      (branch) =>
        branch.branchCode === branchCode.toLowerCase() && !branch.activated,
    );
    const foundCode = branchCodes?.find(
      (item) => item.code.toUpperCase() === agentCode,
    );

    const foundManager = managers?.find(
      (manager) => manager.branchCode?.toLowerCase() === branchCode,
    );

    if (!branchCodes?.length) {
      errors.errBranch();
      return;
    }
    if (!agentCode) {
      errors.errAgent();
      return;
    }

    handleUpdateProfile({
      userId: props.userId,
      payload: { ...data, setupComplete: true, setupProgress: 1 },
    })
      .then(() => {
        handleUpdateCodeList({
          id: foundCode?.id,
          userId: props?.userId,
          payload: { activated: true },
        })
          .then(() => {
            handleUpdateManagerCodeList({
              id: foundCode?.id,
              managerId: foundManager?.userId,
              payload: {
                assignedId: props?.userId,
                assignedName: props?.agentName,
                activated: true,
                dateAssigned: new Date(datestring).toISOString(),
              },
            })
              .then(() => {
                setLoading(false);
                onSuccess(
                  "Account activation successfull!",
                  "Welcome to your dashboard.",
                );
              })
              .catch((e: Error) => errHandler(e, setLoading));
          })
          .catch((e: Error) => errHandler(e, setLoading));
      })
      .catch((e: Error) => errHandler(e, setLoading));
  };

  return (
    <div className="flex h-[550px] w-[400px] items-center">
      <div className="h-full w-full space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-full w-full flex-col space-y-6 overflow-hidden rounded-md border-[0.33px] border-ash/80 bg-white/50 p-4 py-4 shadow-lg backdrop-blur-lg">
              <div className="flex items-center justify-start space-x-2 px-2 py-4 text-coal">
                <ShieldCheckIcon className="size-6 text-cyan-500" />
                <p className="text-lg font-medium tracking-tight">
                  Account activation.
                </p>
              </div>

              <div className="flex items-center px-4 py-2">
                <p className="text-xs">
                  <span className="mr-2 rounded-full bg-cyan-500 px-1.5 py-0.5 font-bold text-white">
                    1
                  </span>
                  Enter your branch code.
                </p>
              </div>
              <div className="flex px-2">
                <InputCode
                  placeholder="branch code"
                  {...form.register("branchCode")}
                  name="branchCode"
                />
              </div>
              <div className="px-4 py-2">
                <p className="text-xs">
                  <span className="mr-2 rounded-full bg-cyan-500 px-1.5 py-0.5 font-bold text-white">
                    2
                  </span>
                  Enter your agent code and submit.
                </p>
              </div>
              <div className="flex px-2">
                <InputCode
                  placeholder="agent code"
                  {...form.register("agentCode")}
                  name="agentCode"
                />
              </div>
              <div className="w-full px-4">
                <DarkTouch
                  className="w-full"
                  size={"lg"}
                  type="submit"
                  tail={loading ? LoaderIcon : undefined}
                  tailClass="animate-spin"
                >
                  <p>Submit</p>
                </DarkTouch>
              </div>
            </div>
          </form>
        </Form>
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

const errors = {
  errBranch: () =>
    onError(
      "Invalid Branch code.",
      "Please enter a valid branch code. (E1501)",
    ),
  errAgent: () =>
    onError("Invalid Agent code.", "Please enter a valid agent code. (E2501)"),
  errBranchNull: () =>
    onError("Enter Branch code.", "Please enter a valid agent code. (E3501)"),
  errAgentNull: () =>
    onError("Enter Agent code.", "Please enter a valid agent code. (E3501)"),
};

export default AgentContent;
