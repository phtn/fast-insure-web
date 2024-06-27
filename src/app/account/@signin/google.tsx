import { Touch } from "@/app/(ui)/touch";

import { useGoogleSignin } from "./hooks";

export const GoogleSignin = () => {
  const { handleSigninWithGoogle } = useGoogleSignin();

  return (
    <div className="flex w-full items-center">
      <Touch
        onClick={handleSigninWithGoogle}
        size={"lg"}
        className="h-[56px] w-[320px] rounded-xl"
      >
        <div className="flex h-full w-full items-center space-x-3">
          <p className="h-[18px] bg-gradient-to-r from-clay to-clay/70 bg-clip-text px-1 font-sans text-[16px] font-medium tracking-tighter text-transparent">
            Sign in with Google
          </p>
          <div
            className={`h-[48px] w-[48px] bg-[url('/svg/g_logo.svg')] bg-center bg-no-repeat`}
          />
        </div>
      </Touch>
    </div>
  );
};
