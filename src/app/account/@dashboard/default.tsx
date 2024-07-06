"use client";

import { auth } from "@/libs/db";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const DefaultPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.uid) {
      router.push(`/account/overview`);
    }
  }, [router, user]);
  return <div className="p-6"></div>;
};
export default DefaultPage;
