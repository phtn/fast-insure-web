"use client";

import { auth } from "@/libs/db";
import { onPromise } from "@/utils/toast";
import { DarkTouch } from "@@ui/touch";
import { useSignOut } from "react-firebase-hooks/auth";
import { Header } from "../(components)/header";

export const SettingsContent = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleSignOut = () => {
    onPromise(signOut(), "Signing out...", "signout", "Signed out", error);
  };
  return (
    <div className="w-full">
      <Header title="Account Settings" />
      <div className="my-[16px]">
        <div className="w-[100px]">
          <DarkTouch onClick={handleSignOut} className="w-full">
            {loading ? "Signing out..." : "Sign out"}
          </DarkTouch>
        </div>
      </div>
    </div>
  );
};
