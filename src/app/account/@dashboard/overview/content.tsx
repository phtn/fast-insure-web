"use client";
import LoaderMX from "@/app/(components)/loader-mx";
import { useConnect } from "../hooks";
import dynamic from "next/dynamic";

const DynamicManager = dynamic(() => import("../(users)/manager"), {
  loading: LoaderMX,
});
const DynamicAgent = dynamic(() => import("../(users)/agent1"), {
  loading: LoaderMX,
});

export const DashboardContent = () => {
  const { accountType, profile } = useConnect();
  if (!accountType) return <LoaderMX />;
  return accountType === "MANAGER" ? (
    <DynamicManager profile={profile} />
  ) : (
    <DynamicAgent profile={profile} />
  );
};
