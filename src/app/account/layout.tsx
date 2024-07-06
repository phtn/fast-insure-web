"use client";

import { auth } from "@/libs/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { useConnect } from "./@dashboard/hooks";
import Sidebar from "./(components)/sidebar";
import { LoaderMX3 } from "../(components)/loader-mx";

type AccountLayoutProps = {
  dashboard: React.ReactNode;
  signin: React.ReactNode;
};

const AccountLayout = ({ dashboard, signin }: AccountLayoutProps) => {
  const [user, loading] = useAuthState(auth);
  const { accountType, profile } = useConnect();

  if (loading) return <LoaderMX3 />;

  if (user) {
    return (
      <Sidebar profile={profile} accountType={accountType}>
        {dashboard}
      </Sidebar>
    );
  } else {
    return signin;
  }
};

export default AccountLayout;
