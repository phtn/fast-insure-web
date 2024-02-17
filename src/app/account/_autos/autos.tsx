"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { redirect } from "next/navigation";
import { TabsContent } from "@@components/tabs";
import { AddAuto } from "./add-auto";
import { useGetAutos } from "./hooks";
import { RefreshCcwIcon } from "lucide-react";
import { AutoItem } from "./auto-item";

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
              All My Autos
            </h2>
            <AddAuto />
          </div>
          {loading ? (
            <div className="flex items-center space-x-4">
              <RefreshCcwIcon className="h-4 w-4 animate-spin text-ash" />
              <p className="text-sm text-clay">Loading ...</p>
            </div>
          ) : (
            <p className="text-sm text-clay">
              Registered Autos ({autos.length})
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="flex space-x-6 pb-4">
          {autos.map((item) => (
            <AutoItem key={item.id} autoItem={item} />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};
