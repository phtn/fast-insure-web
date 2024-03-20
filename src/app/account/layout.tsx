"use client";

import { auth } from "@/libs/db";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./(components)/sidebar";

type AccountLayoutProps = {
  dashboard: React.ReactNode;
  signin: React.ReactNode;
};

const AccountLayout = ({ dashboard, signin }: AccountLayoutProps) => {
  const [user] = useAuthState(auth);
  if (user) {
    return <Sidebar>{dashboard}</Sidebar>;
  } else {
    return signin;
  }
};

export default AccountLayout;
