import { Header } from "../../(components)/header";
import { Tabs } from "@/app/(ui)/tabs";
import { Requests } from "./requests";
import { Tools } from "./tools";
import {
  TabList,
  TablistContainer,
  TabValue,
  Trigger,
} from "../../(components)/styles";
import { Drafts } from "./drafts";
import { type UserProfileSchema } from "@/server/resource/account";
import {
  ActivationFormResource,
  type CodeListSchema,
  type ActivationFormSchema,
} from "@/server/resource/code";
import { useCallback, useState } from "react";
import { errHandler, getVersion, opts } from "@/utils/helpers";
import { InputCode } from "@/app/(ui)/input";
import { DarkTouch } from "@/app/(ui)/touch";
import { LoaderIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/libs/db";
import { Form } from "@/app/(ui)/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activationDefaults } from "./activation";
import { onError } from "@/utils/toast";
import { useProfile } from "@/app/account/@signin/hooks";
import { AgentContextProvider } from "../../(context)/context";
import { useUpdateService } from "../../(hooks)/useUpdateService";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  TableCellsIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownRightIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const AgentContent = (props: { profile: UserProfileSchema | undefined }) => {
  const { profile } = props;
  const PageOptions = useCallback(() => {
    const setupComplete = !!profile?.setupComplete;
    const options = opts(
      <SetupInit
        setupComplete={setupComplete}
        userId={profile?.userId}
        displayName={profile?.displayName}
      />,

      <WithCode profile={profile} />,
    );
    return <>{options.get(!setupComplete)}</>;
  }, [profile]);
  return (
    <AgentContextProvider>
      <PageOptions />
    </AgentContextProvider>
  );
};

const SetupInit = (props: {
  displayName: string | undefined | null;
  userId: string | undefined;
  setupComplete: boolean | undefined;
}) => {
  const CardOptions = useCallback(() => {
    const setupReady = !!props.setupComplete;
    const options = opts(
      <ActivationCard userId={props.userId} agentName={props?.displayName} />,
      <ActivationLoading />,
    );
    return <>{options.get(!setupReady)}</>;
  }, [props.setupComplete, props.userId, props.displayName]);
  //  bg-gradient-to-br from-cyan-600/90 from-40% via-cyan-400 via-50% to-cyan-900
  return (
    <div className="flex h-fit w-full justify-center py-10">
      <div className="m-4 h-[550px] space-y-10 overflow-hidden rounded-xl border-[0.33px] border-neutral-200 bg-white p-6 shadow-sm backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          <div className="relative z-40 flex items-center rounded-full bg-void/80 px-3.5 py-0.5 text-sm font-semibold tracking-tight">
            <p className="bg-gradient-to-r from-cyan-100 via-sky-50 to-indigo-50 bg-clip-text text-transparent">
              FastInsure Tech
            </p>
          </div>
          <div className="flex items-start font-mono text-[10px] text-stone-500/80">
            Build release v{getVersion()}
          </div>
        </div>
        <div className="relative flex h-[400px] items-center justify-center">
          <Polaris />
          <CardOptions />
        </div>
      </div>
    </div>
  );
};

const Polaris = () => (
  <div className="absolute h-[400] w-auto justify-end">
    <div className="h-120 w-64 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300" />
    <div className="h-96 w-64 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300" />
    <div className="h-120 w-72 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-200/80" />
  </div>
);

const ActivationLoading = () => (
  <div className="flex h-fit w-[400px] items-center">
    <div className="h-full w-full space-y-4">
      <div className="flex h-full w-full flex-col space-y-6 overflow-hidden rounded-md border-[0.33px] border-ash/80 bg-white/50 p-4 py-4 shadow-lg backdrop-blur-lg">
        <div className="flex items-center justify-start space-x-2 px-2 py-4 text-coal">
          <div className="relative flex items-center justify-center rounded-full bg-cyan-600/5">
            <div className="absolute size-8 animate-pulse rounded-full bg-cyan-400/25 p-1" />
            <LoaderIcon className="relative z-20 size-5 animate-spin text-cyan-500" />
          </div>
          <p className="text-lg font-medium tracking-tight">Authorizing...</p>
        </div>
      </div>
    </div>
  </div>
);

const ActivationCard = (props: {
  userId: string | undefined;
  agentName: string | null | undefined;
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
  const { handleUpdateCode } = useUpdateService();

  const onSubmit = (data: ActivationFormSchema) => {
    const { agentCode } = data;

    const branchCodes = allCodes?.filter(
      (branch) =>
        branch.branchCode?.substring(0, 3) ===
          agentCode.toLowerCase().substring(0, 3) && !branch.assigned,
    );

    const codeFound = branchCodes?.find(
      (item) => item.code.toLowerCase() === agentCode.toLowerCase(),
    );

    const managerFound = managers?.find(
      (manager) =>
        manager.branchCode?.toLowerCase().substring(0, 3) ===
        agentCode.toLowerCase().substring(0, 3),
    );

    if (!branchCodes?.length) {
      errors.errBranch();
      return;
    }

    if (!agentCode) {
      errors.errAgent();
      return;
    }

    if (!codeFound || !managerFound) {
      onError("Invalid code entered.");
      return;
    } else {
      handleUpdateProfile({
        userId: props.userId,
        payload: { ...data, setupComplete: true, setupProgress: 1 },
      })
        .then(
          handleUpdateCode({
            id: codeFound.id,
            userId: props.userId,
            payload: { assigned: true },
            message: "Activation Successful!",
          }),
        )
        .catch(errHandler(setLoading));
    }
  };

  return (
    <div className="flex h-fit w-[400px] items-center">
      <div className="h-full w-full space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex h-full w-full flex-col space-y-8 overflow-hidden rounded-md border-[0.33px] border-ash/80 bg-white/60 px-4 py-10 shadow-lg backdrop-blur-lg">
              <div className="flex items-center justify-start space-x-3 p-2 text-coal">
                <div className="relative flex items-center justify-center rounded-full bg-cyan-600/5">
                  <div className="absolute size-8 animate-pulse rounded-full bg-cyan-400/25 p-1" />
                  <ShieldCheckIcon className="stroke z-20 size-5 animate-none text-cyan-600" />
                </div>
                <p className=" font-medium tracking-tight">
                  Account activation.
                </p>
              </div>

              <div className="flex items-center space-x-4 px-4 py-2">
                <ArrowDownRightIcon className="size-3" />
                <p className="font-mono text-xs opacity-80">
                  Enter your agent code.
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

const WithCode = (props: { profile: UserProfileSchema | undefined }) => {
  if (!props?.profile) return;
  const { draftCount, submittedCount } = props.profile;
  return (
    <Tabs defaultValue="requests" className="w-full">
      <Header>
        <Triggers draftCount={draftCount} submittedCount={submittedCount} />
      </Header>
      <Requests />
      <Drafts />
      <Tools />
    </Tabs>
  );
};

export const Triggers = (props: {
  draftCount: number | undefined;
  submittedCount: number | undefined;
}) => {
  return (
    <TablistContainer>
      <TabList>
        <Trigger value="requests">
          <TableCellsIcon className="size-4" />
          <TabValue>{props.submittedCount ?? 0}</TabValue>
        </Trigger>
        <Trigger value="drafts">
          <DocumentTextIcon className="size-4" />
          <TabValue>{props.draftCount ?? 0}</TabValue>
        </Trigger>
        <Trigger value="tools">
          <WrenchIcon className="size-4" />
        </Trigger>
      </TabList>
      <div>
        <ChatBubbleLeftEllipsisIcon className="size-5" />
      </div>
    </TablistContainer>
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
