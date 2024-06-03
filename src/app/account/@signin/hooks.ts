import { useCallback, useState } from "react";

export type UserSigninType = "SIGNIN" | "SIGNUP";

export const useAccountTypes = () => {
  const [signinType, setSignin] = useState<UserSigninType>("SIGNIN");

  // const setAccountType = useCallback(
  //   (type: UserAccountType) => {
  //     if (type !== accountType) {
  //       setAccount((prev) => (prev === "MANAGER" ? "AGENT" : "MANAGER"));
  //     }
  //   },
  //   [accountType],
  // );

  const setSigninType = useCallback(
    (type: UserSigninType) => {
      if (type !== signinType) {
        setSignin((prev) => (prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"));
      }
    },
    [signinType],
  );

  return { signinType, setSigninType };
};
