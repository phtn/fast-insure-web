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
  const { accountType, profile } = useConnect();

  if (loading) return <Loader />;

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

// import { Children, cloneElement, isValidElement } from "react";

// const childrenWithProps = Children.map(children, (child) => {
//   if (isValidElement(child)) {
//     return cloneElement(child, profile, ...children);
//   }
//   return child;
// });
