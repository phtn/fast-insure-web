"use client";

import { Button } from "@@ui/button";
import { DotIcon } from "lucide-react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import tw from "tailwind-styled-components";
import { useAccountTypes } from "./hooks";
import { Login } from "./login";
import { Welcome } from "./welcome";
import type { FormProps } from "./types";
import { GoogleSignin } from "./google";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/libs/db";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const Lobby = () => {
  const { loginType, set } = useAccountTypes();
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!!user) {
      router.push("account/overview");
    }
  }, [user, router]);

  return (
    <LobbyContainer>
      <LobbyInner>
        <LoginForm setLoginType={set} loginType={loginType} />
        <Welcome />
      </LobbyInner>
      <TermsFooter />
    </LobbyContainer>
  );
};

const LoginForm = (props: FormProps) => {
  const { loginType, setLoginType } = props;
  const signIn = loginType === "SIGNIN";
  return (
    <div className="flex h-[calc(100vh-110px)] w-full items-center justify-center border-t-[0.33px] border-neutral-300 px-[36px]">
      <div className="mb-12 w-fit">
        <div className="w-full pt-[14px]">
          <Title signIn={signIn} />
          <Login signinType={loginType} />
          <div className="flex justify-center py-4 text-xs text-neutral-500">
            or
          </div>
          <GoogleSignin />
        </div>

        {/* <div className="h-[0.33px] w-full bg-gradient-to-r from-ash to-zap" /> */}
        <div className="flex h-[72px] w-full items-center justify-center">
          <div className="flex items-center space-x-3">
            <p className="font-sans text-xs tracking-tight text-neutral-500">
              {signIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              className="flex h-9 items-center space-x-2 font-sans text-xs font-medium tracking-normal hover:bg-cyan-300/15"
              variant="ghost"
              size="sm"
              onClick={() => setLoginType(signIn ? "SIGNUP" : "SIGNIN")}
            >
              <div>{signIn ? "Sign up" : "Sign in"}</div>
              <ArrowUpRightIcon className="stroke-1.5 size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = (props: { signIn: boolean }) => (
  <div className="flex h-fit flex-col">
    <h1 className="font-sans text-xl font-semibold tracking-tighter text-dyan">
      {props.signIn ? `Sign in to your account.` : `Create new account.`}
    </h1>
  </div>
);

const TermsFooter = () => {
  return (
    <div className="flex w-full justify-center border-t-[0.33px] border-neutral-300 bg-zap">
      <div className="flex h-[50px] w-full items-center justify-start text-[12px] font-light text-heli">
        <div className="flex w-full items-center justify-start">
          <div className="flex h-[50px] items-center justify-between px-4 text-xs text-neutral-400">
            <div className="flex items-center space-x-2 text-[10px]">
              <Image
                alt={`fast tech logo`}
                src={`/logo/fast_tech_v4.svg`}
                width={0}
                height={0}
                className="h-[8.5px] w-auto"
              />
              <p>&copy; &nbsp; {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center text-[12px] tracking-tight portrait:text-[10px]">
          <div className="flex w-full items-center justify-end space-x-2 px-4">
            <LinkItem url="privacy" label="privacy" />
            <DotIcon className="text-ash" />
            <LinkItem url="terms" label="terms" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkItem = (props: { url: string; label: string }) => (
  <div className="group text-neutral-500">
    <Link href={`/${props.url}`}>
      <p className="capitalize group-hover:text-dyan group-hover:underline group-hover:decoration-cyan-600 group-hover:decoration-dotted">
        {props.label}
      </p>
    </Link>
  </div>
);

const LobbyContainer = tw.div`
 border-b-[0.0px] border-ash
  `;
const LobbyInner = tw.div`
 grid grid-cols-1 md:grid-cols-2
`;

export default Lobby;
