"use client";

import { auth } from "@/libs/db";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./(components)/sidebar";
import { Loader } from "./(components)/loader";
import { useConnect } from "./@dashboard/hooks";

type AccountLayoutProps = {
  dashboard: React.ReactNode;
  signin: React.ReactNode;
};

const AccountLayout = ({ dashboard, signin }: AccountLayoutProps) => {
  const [user, loading] = useAuthState(auth);
  const { getAccoutType } = useConnect();
  const accountType = getAccoutType();
  const isAffiliate = accountType === "AFFILIATE";
  if (loading) return <Loader />;

  if (user) {
    return <Sidebar isAffiliate={isAffiliate}>{dashboard}</Sidebar>;
  } else {
    return signin;
  }
};

export default AccountLayout;
