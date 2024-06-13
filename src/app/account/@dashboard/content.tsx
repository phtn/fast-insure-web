"use client";
import { useConnect } from "./hooks";
import { Loader } from "../(components)/loader";
import dynamic from "next/dynamic";

const DynamicManager = dynamic(() => import("./(contents)/manager"), {
  loading: Loader,
});
const DynamicAgent = dynamic(() => import("./(contents)/agent1"), {
  loading: Loader,
});

export const DashboardContent = () => {
  const { accountType, profile } = useConnect();
  if (!accountType) return <Loader />;
  return accountType === "MANAGER" ? (
    <DynamicManager profile={profile} />
  ) : (
    <DynamicAgent profile={profile} />
  );
};
