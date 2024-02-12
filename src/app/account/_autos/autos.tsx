"use client";

import { PrimaryAutoInfo } from "./data";
import { AccountItem } from "./item";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { redirect } from "next/navigation";
import { TabsContent } from "@@components/tabs";
import { AddAuto } from "./add-auto";
import { useGetAutos } from "./hooks";
import { Button } from "@/app/_components/button";
import {
  CheckCircle,
  CheckCircle2,
  CircleSlash2,
  SendIcon,
  ThumbsUp,
} from "lucide-react";
import { DarkTouch, Touch } from "@/app/_components/touch";

export const Autos = () => {
  const userCreds = useContext(AuthContext);
  const { loading, autos } = useGetAutos({
    userId: userCreds?.user?.uid,
  });

  useEffect(() => {
    if (!userCreds?.user) {
      redirect(`/`);
    }
  }, [userCreds?.user]);

  return (
    <TabsContent value="autos" className="border-none p-0 outline-none">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold tracking-tight text-fast">
              {loading ? `Loading...` : `All My Autos`}
            </h2>
            <AddAuto />
            <Touch size="lg" variant="primary" tail={CheckCircle}>
              Accept
            </Touch>
            <DarkTouch size="lg" tail={CheckCircle}>
              Ignore
            </DarkTouch>
            <Touch size="lg" variant="destroy" tail={CircleSlash2}>
              Cancel
            </Touch>
          </div>
          <p className="text-sm text-clay">All registered vehicles.</p>
        </div>
      </div>

      <div className="relative">
        <div className="flex space-x-6 pb-4">
          {autos.map((item) => (
            <AccountItem
              key={item["auto_name"]}
              vehicleItem={item as PrimaryAutoInfo}
              className="h-auto w-[300px] rounded-lg"
              width={300}
              height={250}
            />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
