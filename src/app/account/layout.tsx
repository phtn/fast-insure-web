"use client";

import { auth } from "@/libs/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./(components)/loader";
import { useConnect } from "./@dashboard/hooks";
import dynamic from "next/dynamic";
import LoaderMX from "../(components)/loader-mx";

const DynamicSidebar = dynamic(() => import("./(components)/sidebar"), {
  loading: LoaderMX,
});

type AccountLayoutProps = {
  dashboard: React.ReactNode;
  signin: React.ReactNode;
};

const AccountLayout = ({ dashboard, signin }: AccountLayoutProps) => {
  const [user, loading] = useAuthState(auth);
  const { accountType, profile } = useConnect();

  console.log(process.env.NEXT_PUBLIC_LIVE_CODES);
  if (loading) return <Loader />;

  if (user) {
    return (
      <DynamicSidebar profile={profile} accountType={accountType}>
        {dashboard}
      </DynamicSidebar>
    );
  } else {
    return signin;
  }
};

export default AccountLayout;
