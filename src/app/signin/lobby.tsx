"use client";

import { type AccountType } from "@/server/resource/account";
import { opts, toggleState } from "@/utils/helpers";
import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
  LogInIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import tw from "tailwind-styled-components";
import { type z } from "zod";
import { Button } from "../_components/button";
import { XGrid } from "../_components/grid";
import { AuthContext } from "../context";
import { Login } from "./login";

export const Lobby = () => {
  const router = useRouter();
  const userCreds = useContext(AuthContext);
  useEffect(() => {
    if (userCreds?.user) {
      router.push(`/account`);
    }
  }, [userCreds, router]);

  return (
    <>
      <Welcome />
      <Main />
    </>
  );
};

const Main = () => {
  const [newAccount, setNewAccount] = useState(false);
  return (
    <MainWrap>
      <TopSection newAccount={newAccount} />
      <MidSection newAccount={newAccount} />
      <BottomSection newAccount={newAccount} setNewAccount={setNewAccount} />
    </MainWrap>
  );
};

const Welcome = () => (
  <div className="hidden items-center justify-center pt-16 sm:flex">
    <div className="relative left-[50px] h-full w-full overflow-clip md:rounded-2xl">
      <XGrid>
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-transparent from-65% to-amber-500/20">
          <div className="relative right-[75px] h-[260px] w-[260px] bg-[url('/svg/caesar_gold_v1.svg')] bg-contain bg-center bg-no-repeat opacity-70" />{" "}
          <div className="relative right-[75px] flex h-[100px] items-start">
            <span className="bg-gradient-to-b from-blue-400 to-blue-300 bg-clip-text font-sans text-3xl font-extrabold tracking-tight text-transparent">
              Accelerate
            </span>
          </div>
          <div className="relative right-[75px] h-[200px] w-[300px] max-w-[26ch] text-center">
            <span className="font-sans text-[14px] text-blue-100/70 ">
              Join Accelerate, an exclusive group of leaders, that believe in
              leading the future with forward-thinkers, innovators, and
              visionaries who are dedicated to accelerating progress through
              technology.
            </span>
          </div>
          <div className="relative right-[75px] h-[5px] w-[69px] rounded-full border-0 bg-gradient-to-br from-blue-500 to-cyan-200 text-center"></div>
        </div>
      </XGrid>
    </div>
  </div>
);

const TopSection = ({ newAccount }: { newAccount: boolean }) => (
  <div className="row-span-1 flex w-full items-center justify-between px-6 md:items-end md:px-24">
    <div className="flex flex-col">
      <h1 className="font-sans text-3xl font-bold tracking-tighter text-blue-950 md:text-5xl">
        {newAccount ? `Create new account.` : `Sign in.`}
      </h1>
      <p className="bg-gradient-to-r from-blue-950 to-zinc-500 bg-clip-text px-[4px] py-2 font-medium text-transparent md:text-[16px]">
        Personalize & Manage your coverage status.
      </p>
    </div>
    <div className="hidden w-[250px] items-end justify-center md:flex md:h-[210px]">
      <div className="-mb-40 w-[300px] bg-[url('/svg/dev_v1.svg')] bg-contain bg-no-repeat md:h-[210px]" />
    </div>
  </div>
);

type CardProps = {
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  newAccount?: boolean;
  setAccountType?: Dispatch<SetStateAction<z.infer<typeof AccountType>>>;
};

const SignCards = ({ onClick, setAccountType }: CardProps) => {
  return (
    <div className="h-fit w-screen md:w-full md:overflow-x-scroll">
      <div className="grid w-[800px] grid-cols-2 bg-white/10 px-4 backdrop-blur-xl md:w-full md:px-8">
        <div className="flex w-full scale-[80%] items-center justify-center md:w-[400px]">
          <AgentCard
            onClick={(e) => {
              onClick(e);
              setAccountType && setAccountType("AFFILIATE");
            }}
          />
        </div>
        <div className="flex w-[400px] scale-[80%] items-center">
          <PersonalCard
            onClick={(e) => {
              onClick(e);
              setAccountType && setAccountType("PERSONAL");
            }}
          />
        </div>
      </div>
    </div>
  );
};

type ActiveSignUpProps = {
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  newAccount?: boolean;
  accountType: z.infer<typeof AccountType>;
};

const ActiveSignUp = ({
  onClick,
  newAccount,
  accountType,
}: ActiveSignUpProps) => {
  return (
    <div className="grid grid-cols-1 px-24 md:grid-cols-5">
      <div className="col-span-1 flex w-full items-center md:col-span-3">
        <div className="rotate-[3deg] rounded-[24px] shadow-lg shadow-zinc-500 transition-all duration-700 hover:rotate-[0deg] hover:scale-110 hover:cursor-pointer hover:shadow-xl">
          <MemberCard>
            <div className=" flex h-full flex-col justify-between">
              <div className="flex h-[100px] items-center justify-between">
                <p></p>
                <div className="h-[100px]  w-[100px] bg-[url('/svg/caesar_v2.svg')] bg-contain bg-no-repeat" />
              </div>
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-md">
                <span className="text-2xl font-thin tracking-widest text-blue-300">
                  02
                </span>
              </div>
            </div>
          </MemberCard>
        </div>
      </div>
      <div className="col-span-1 flex w-[350px] items-center md:col-span-2">
        <LoginWrap>
          <div className="group flex skew-x-[10deg] items-center justify-between transition-all duration-500 hover:skew-x-[-10]">
            <div className="skew-x-[-10deg] rounded-lg bg-void px-4 py-1 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-wide text-blue-300">
                <span className="mr-1 font-bold text-blue-200">
                  {accountType}
                </span>{" "}
                account
              </p>
            </div>
            <Button onClick={onClick} size="icon" variant="casper" className="">
              <SparkleIcon
                className="h-4 w-4 rotate-[30deg] transition-all duration-500 hover:rotate-[-125deg]"
                strokeWidth={2}
                fill="orange"
              />
            </Button>
          </div>
          <div className="rounded-[16px] p-2">
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-xl font-bold tracking-tighter text-blue-950">
                {newAccount ? `Sign up with email.` : `Email & Password`}
              </h2>
            </div>
            <div>
              <span className="text-[12px] text-coal">
                Type your email and create a password.
              </span>
            </div>
          </div>
          <Login
            action={newAccount ? `Create account` : `Sign in`}
            newAccount={newAccount ?? false}
            accountType={accountType}
          />

          <div className="flex h-[28px] items-end justify-center">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-4 w-4 text-sky-600" />
              <p className="text-[12px] text-clay">
                Secure End-to-End Encryption Enabled.
              </p>
            </div>
          </div>
        </LoginWrap>
      </div>
    </div>
  );
};

const Hint = () => (
  <div className="group flex scale-[80%] items-center justify-start px-6 py-2 hover:cursor-pointer md:px-20 md:py-2">
    <p className="rounded-full border-[0.33px] border-blue-300/20 bg-gradient-to-r from-slate-400/40 to-orange-50/50 px-12 py-3 text-[15px] font-bold text-blue-950/90 shadow transition-all duration-700 group-hover:text-blue-900">
      Select Account Type
    </p>
  </div>
);

const MidSection = ({ newAccount }: { newAccount: boolean }) => {
  const [active, setActive] = useState(false);
  const [accountType, setAccountType] =
    useState<z.infer<typeof AccountType>>("PERSONAL");

  const handleSelect = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleState(setActive);
  };
  const handleToggle = () => {
    toggleState(setActive);
  };

  const ViewOptions = useCallback(() => {
    const options = opts(
      <ActiveSignUp
        onClick={handleToggle}
        newAccount={newAccount}
        accountType={accountType}
      />,
      <SignCards setAccountType={setAccountType} onClick={handleSelect} />,
    );
    return <>{options.get(active)}</>;
  }, [active, newAccount, accountType]);

  const HintOptions = useCallback(() => {
    const options = opts(<div className="py-4" />, <Hint />);
    return <>{options.get(active)}</>;
  }, [active]);
  return (
    <MidWrap>
      <HintOptions />
      <ViewOptions />
    </MidWrap>
  );
};

const AgentCard = ({ onClick }: CardProps) => (
  <AgentWrap>
    <div className="flex h-fit flex-col justify-center space-y-4">
      <div className="-mt-2 h-[80px] w-[80px] bg-[url('/svg/caesar_v2.svg')] bg-contain bg-center bg-no-repeat" />
      <div className="py-4">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-blue-50">
          Affiliate Account
        </h2>
        <p className="py-[4px] text-blue-200/80">Sign in as agent.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className="z-50 w-full rounded-lg border border-slate-800/50 bg-gradient-to-br from-blue-50 from-30% via-orange-100 via-50% to-cyan-200 to-100% bg-size-200 bg-pos-0 py-3 text-lg font-bold text-blue-950 shadow-2xl transition-all duration-700 ease-in-out hover:bg-pos-100 md:rounded-3xl md:py-4 md:hover:scale-105"
      >
        <div className="bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-2xl" />
        <span className="relative z-20 text-lg md:text-lg">Select</span>
      </button>
    </div>
  </AgentWrap>
);

const PersonalCard = ({ onClick }: CardProps) => (
  <PersonalWrap>
    <div className=" flex h-fit flex-col justify-end space-y-4">
      <div className="mb-[28px] h-[32px] w-[32px] bg-[url('/svg/ninja_v1.svg')] bg-contain bg-center bg-no-repeat" />
      <div className="-mb-2 py-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Personal Account
        </h2>
        <p className="py-[4px] text-slate-700/80">Sign in as Policy Holder.</p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className="z-50 w-full rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-950 from-30% via-indigo-300/40 via-70% to-orange-300/80 to-95% bg-size-200 bg-pos-0 px-8 py-3 text-lg font-bold text-blue-50 shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 hover:bg-pos-100 hover:text-sky-950 md:rounded-3xl md:py-4"
      >
        <div className="bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-2xl" />
        <span className="relative z-20 text-lg">Select</span>
      </button>
    </div>
  </PersonalWrap>
);

type BottomSectionProps = {
  newAccount: boolean;
  setNewAccount: Dispatch<SetStateAction<boolean>>;
};
const BottomSection = ({ newAccount, setNewAccount }: BottomSectionProps) => (
  <div className="flex items-start justify-between pb-2 pt-6 md:px-0">
    <div className="flex h-fit w-full items-end">
      <div className="flex h-[75px] w-full items-end justify-between px-8">
        <div />
        <div className="flex items-center justify-center space-x-2 md:justify-evenly md:space-x-4">
          <p className="text-xs text-coal">
            {newAccount
              ? `Already have an account?`
              : `Don't have and account yet?`}
          </p>
          <Button
            onClick={() => {
              toggleState(setNewAccount);
            }}
            className="flex items-center space-x-2 px-4"
            variant="ghost"
            size="sm"
          >
            <p>{newAccount ? `Sign in` : `Sign up`}</p>
            {newAccount ? (
              <LogInIcon className="h-4 w-4" />
            ) : (
              <ArrowUpRightIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            className="flex items-center space-x-3 px-4"
            variant="tertiary"
            size="sm"
          >
            <p>Affiliate</p>
            <BadgeCheckIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const MainWrap = tw.div`
  w-full md:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-zinc-100 to-lime-200 grid grid-rows-3 col-span-2 
  md:rounded-2xl overflow-clip drop-shadow-3xl
  relative md:right-[75px] bg-orange-50 h-[calc(100vh-200px)] 
`;
const AgentWrap = tw.div`
  md:px-10 px-6 md:rounded-[38px] rounded-[24px] pt-6 md:pb-9 pb-6 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-slate-700/90 via-slate-950/95 to-stone-50
  shadow-xl group hover:scale-105 transition-all duration-500
`;
const PersonalWrap = tw.div`
  md:px-10 px-6 md:rounded-[38px] rounded-[24px] md:py-8 py-6 h-fit w-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] 
  from-sky-300 via-cyan-400 to-indigo-500
  shadow-xl group hover:scale-105 transition-all duration-500
`;
const MemberCard = tw.div`
  group px-10 rounded-[24px] border-b-[3px] border-r-[2px] border-zinc-400/90 
  bg-[url('/svg/print_v2.svg')] pt-6 pb-9 h-[250px] bg-cover
  transition-all duration-700 w-[375px] bg-bottom object-fit
`;
const LoginWrap = tw.div`
  bg-blue-200/20 backdrop-blur-xl group rounded-lg h-fit w-full p-3
`;
const MidWrap = tw.div`
  flex flex-col row-span-2 h-fit justify-center items-start 
`;
