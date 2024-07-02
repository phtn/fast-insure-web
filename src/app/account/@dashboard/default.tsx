"use client";
import { LoaderBX } from "@/app/(components)/loader-bx";
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
  return <LoaderBX />;
};
export default DefaultPage;
