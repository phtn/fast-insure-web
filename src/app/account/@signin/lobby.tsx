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
// type AccountTypeProps = {
//   accountType: UserAccountType;
//   setType: (type: UserAccountType) => void;
// };

export const Lobby = () => {
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
        {/* <Primary accountType={accountType} setType={setAccountType} /> */}
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

// const Primary = (props: AccountTypeProps) => {
//   return (
//     <div className="flex h-full w-full from-sky-300 via-rose-50 to-lime-400 md:justify-end md:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]">
//       <div className="h-full w-full pt-[28px] md:h-[calc(100vh-144px)] md:w-[540px] md:place-self-end md:pt-[56px]">
//         <div className="flex h-full flex-col items-center">
//           <div className="flex w-full flex-col items-center px-[32px] md:h-[calc(100vh-300px)] md:justify-start md:px-0 md:py-[14px]">
//             <div className="flex h-[86px] w-full flex-col px-[4x] md:h-[100px] md:w-[350px]">
//               <h1 className="font-sans text-2xl font-semibold tracking-tighter text-blue-950 md:text-3xl">
//                 Account type
//               </h1>
//               <p className="bg-gradient-to-r from-coal/80 to-heli bg-clip-text font-medium tracking-tighter text-transparent md:text-[16px]">
//                 Select account type
//               </p>
//             </div>

//             <div className="flex w-full justify-center rounded-xl bg-white/20 shadow-sm backdrop-blur-md md:w-[350px] md:border-[1px]">
//               {/* <PrimaryContent {...props} /> */}
//             </div>
//           </div>
//           <div className="h-[28px] w-full border-0 border-ash md:h-[72px]"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PrimaryContent = ({ accountType, setType }: AccountTypeProps) => {
//   const manager = accountType === "MANAGER";
//   return (
//     <div className="flex h-[150px] w-full flex-col justify-evenly space-y-6 md:h-[250px] md:w-[250px] md:justify-center md:py-[36px]">
//       <Touch
//         icon={manager ? CheckCircle2Icon : Circle}
//         iconFill={manager ? "#fafafa" : undefined}
//         className={cn(
//           `w-full text-[14px] md:w-[250px] `,
//           manager ? "shadow-lg shadow-sky-300/60 " : "",
//         )}
//         size={"lg"}
//         variant={manager ? "secondary" : "default"}
//         onClick={() => setType("MANAGER")}
//       >
//         <div className="flex w-[150px] justify-start pl-3">Manager Account</div>
//       </Touch>
//       <div className="hidden h-[0.33px] w-full md:flex" />
//       <Touch
//         icon={!manager ? CheckCircle2Icon : Circle}
//         iconFill={!manager ? "#fafafa" : undefined}
//         variant={!manager ? "secondary" : "default"}
//         className={cn(
//           `w-full text-[14px] md:w-[250px]`,
//           !manager ? "shadow-lg shadow-sky-500/60 " : "",
//         )}
//         size={"lg"}
//         onClick={() => setType("AGENT")}
//       >
//         <div className="flex w-[150px] justify-start pl-3">Agent Account</div>
//       </Touch>
//     </div>
//   );
// };

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
