"use client";

import { Form } from "@/app/(ui)/form";
import { InputCode } from "@/app/(ui)/input";
import { DarkTouch } from "@/app/(ui)/touch";
import { useProfile } from "@/app/account/@signin/hooks";
import { auth, db } from "@/libs/db";
import {
  ActivationFormResource,
  type ActivationFormSchema,
  type CodeListSchema,
} from "@/server/resource/code";
import { errHandler, getVersion, opts } from "@/utils/helpers";
import { onError } from "@/utils/toast";

import { ArrowDownRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection } from "firebase/firestore";

import { LoaderMX3 } from "@/app/(components)/loader-mx";
import { type UserProfileSchema } from "@/server/resource/account";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { LoaderIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { useUpdateService } from "../(hooks)/useUpdateService";

export const ActivationContent = (props: { agentCode: string }) => {
  const [user, loading] = useAuthState(auth);

  const CardOptions = useCallback(() => {
    const options = opts(
      <ActivationCard
        userId={user?.uid}
        agentName={user?.displayName ?? user?.email}
        agentCode={props.agentCode}
      />,
      <ActivationLoading />,
    );
    return <>{options.get(loading)}</>;
  }, [user, loading, props.agentCode]);
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
            <LoaderMX3 />
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
  agentCode: string;
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

  const activationDefaults: ActivationFormSchema = {
    agentCode: props.agentCode === "user" ? "" : props.agentCode,
  };

  const form = useForm<ActivationFormSchema>({
    resolver: zodResolver(ActivationFormResource),
    defaultValues: activationDefaults,
  });

  const { handleUpdateProfile } = useProfile();
  const { handleUpdateCode } = useUpdateService();

  const onSubmit = (data: ActivationFormSchema) => {
    const branchCodes = allCodes
      ?.filter(
        (c) => c.branchCode?.substring(0, 3) === data.agentCode.substring(0, 3),
      )
      .filter((c) => !c.assigned);

    const codeFound = branchCodes?.find(
      (item) => item.code.toLowerCase() === data.agentCode.toLowerCase(),
    );

    console.log(codeFound);

    const managerFound = managers?.find(
      (manager) =>
        manager.branchCode?.toLowerCase().substring(0, 3) ===
        data.agentCode.toLowerCase().substring(0, 3),
    );

    if (!branchCodes?.length) {
      activationErrors.errBranch();
      return;
    }

    if (!data.agentCode) {
      activationErrors.errAgent();
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

const activationErrors = {
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
