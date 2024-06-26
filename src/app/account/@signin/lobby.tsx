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

const Lobby = () => {
  const { loginType, set } = useAccountTypes();

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
    <div className="flex h-[calc(100vh-144px)] w-full items-center justify-center px-[36px]">
      <div className="w-fit">
        <div className="w-full pt-[14px]">
          <Title signIn={signIn} />
          <Login signinType={loginType} />
          <div className="flex justify-center py-4 text-xs text-heli">or</div>
          <GoogleSignin />
        </div>

        {/* <div className="h-[0.33px] w-full bg-gradient-to-r from-ash to-zap" /> */}
        <div className="flex h-[72px] w-full items-center justify-center">
          <div className="flex items-center justify-between space-x-2">
            <p className="font-sans text-xs tracking-tight text-heli/70">
              {signIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              className="font-sans text-xs tracking-normal text-cyan-500 underline underline-offset-[2px]"
              variant="ghost"
              size="sm"
              onClick={() => setLoginType(signIn ? "SIGNUP" : "SIGNIN")}
            >
              {signIn ? "Sign up" : "Sign in"}
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
    <div className="flex w-full justify-center border-t-[0.33px] border-ash bg-zap">
      <div className="flex h-[72px] w-full items-center justify-center text-[12px] font-light text-heli md:w-[1080px]">
        <div className="flex w-full items-center justify-start border-r-[1px] border-ash/30">
          <div className="flex w-fit items-center justify-end tracking-tighter">
            <span className="pr-2 font-medium portrait:px-2 portrait:text-[10px]">
              FastInsure Technologies, Inc.
            </span>{" "}
            <span className="portrait:hidden">
              All rights reserved. {new Date().getFullYear()}
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-end tracking-tight portrait:text-[10px]">
          <div className="flex w-[150px] items-center justify-start space-x-2">
            <div>Privacy</div>
            <DotIcon className="text-ash" />
            <div>Terms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LobbyContainer = tw.div`
 border-b-[0.0px] border-ash
  `;
const LobbyInner = tw.div`
 grid grid-cols-1 md:grid-cols-2
`;

export default Lobby;

// const sign = (e: FormEvent<HTMLButtonElement>) => {
//   e.preventDefault();
//   signInWithGoogle()
//     .then((response) => {
//       console.log(`response`, response);
//       console.log(`creds`, googleCreds);
//     })
//     .catch((e: Error) =>
//       onError("Unable to continue with Google.", `${e.name}`, "Try again."),
//     );
// };
