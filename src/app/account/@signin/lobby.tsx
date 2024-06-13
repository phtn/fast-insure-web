"use client";

import { DotIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import { Login } from "./login";
import { Touch } from "@@ui/touch";
import { type UserSigninType, useAccountTypes } from "./hooks";
import { Button } from "@@ui/button";
import { Welcome } from "./welcome";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@@libs/db";
import { onError, onPromise } from "@/utils/toast";
import { type FormEvent } from "react";

const Lobby = () => {
  const { signinType, setSigninType } = useAccountTypes();
  const [signInWithGoogle, googleCreds, loading, googleError] =
    useSignInWithGoogle(auth);

  const handleSigninWithGoogle = (e: FormEvent<HTMLButtonElement>) => {
    console.log(loading);
    e.preventDefault();
    const signinPromise = new Promise((resolve) => {
      return resolve(
        signInWithGoogle()
          .then((response) => {
            console.log(`response`, response);
            console.log(`creds`, googleCreds);
          })
          .catch((e: Error) =>
            onError(
              "Unable to continue with Google.",
              `${e.name}`,
              "Try again.",
            ),
          ),
      );
    });
    onPromise(
      signinPromise,
      "Signing in...",
      "signin",
      "Sign in successful!",
      googleError,
    );
  };

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

  return (
    <div className="border-b-[0.0px] border-ash">
      <LobbyContainer>
        <Secondary
          setType={setSigninType}
          signinType={signinType}
          sign={handleSigninWithGoogle}
        />
        <div className="bg-blue-300">
          <Welcome />
        </div>
      </LobbyContainer>
      <TermsFooter />
    </div>
  );
};

type SecondaryProps = {
  signinType: "SIGNIN" | "SIGNUP";
  sign: (e: FormEvent<HTMLButtonElement>) => void;
  setType: (type: UserSigninType) => void;
};

const Secondary = (props: SecondaryProps) => {
  const { signinType, setType, sign } = props;
  const userSignin = signinType === "SIGNIN";
  return (
    <div className="flex h-[calc(100vh-144px)] w-full items-center justify-center px-[36px]">
      <div className="w-fit">
        <div className="w-full pt-[14px]">
          <div className="flex h-fit flex-col">
            <h1 className="font-sans text-xl font-semibold tracking-tighter text-fast">
              {userSignin ? `Sign in to your account.` : `Create new account.`}
            </h1>
          </div>

          <Login signinType={signinType} />
          <div className="flex justify-center py-4 text-xs text-heli">or</div>
          <div className="flex w-full items-center">
            <Touch onClick={sign} size={"lg"} className="h-[56px] w-[300px]">
              <div className="flex h-full w-full items-center space-x-3">
                <p className="h-[18px] bg-gradient-to-r from-clay to-clay/70 bg-clip-text px-1 font-sans text-[16px] font-semibold tracking-tighter text-transparent">
                  Sign in with Google
                </p>
                <div
                  className={`h-[48px] w-[48px] bg-[url('/svg/g_logo.svg')] bg-center bg-no-repeat`}
                />
              </div>
            </Touch>
          </div>
        </div>

        <div className="h-[0.33px] w-full bg-gradient-to-r from-ash to-zap" />
        <div className="flex h-[72px] w-full items-center justify-center">
          <div className="flex items-center justify-between space-x-2">
            <p className="font-sans text-sm tracking-tight text-heli">
              {userSignin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Button
              className="font-sans text-sm tracking-tight"
              variant="ghost"
              size="sm"
              onClick={() => setType(userSignin ? "SIGNUP" : "SIGNIN")}
            >
              {userSignin ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TermsFooter = () => {
  return (
    <div className="flex w-full justify-center border-t-[0.33px] border-ash bg-zap">
      <div className="flex h-[72px] w-full items-center justify-center text-[12px] font-light text-heli md:w-[1080px]">
        <div className="flex w-full items-center justify-start border-r-[1px] border-ash">
          <div className="flex w-fit items-center justify-end tracking-tighter">
            <span className="pr-2 font-medium">
              FastInsure Technologies, Inc.
            </span>{" "}
            All rights reserved {new Date().getFullYear()}
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
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
 grid grid-cols-1 md:grid-cols-2
`;

export default Lobby;
