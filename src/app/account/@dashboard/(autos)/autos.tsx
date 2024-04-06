"use client";

import { db } from "@/libs/db";
import { opts } from "@/utils/helpers";
import { onError } from "@/utils/toast";
import {
  collection,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { Loader2Icon } from "lucide-react";
import { useCallback, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { type VehicleSchema } from "./active-form";
import { AutoItem } from "./auto-item";
import { AuthContext } from "@/app/(context)/context";
import tw from "tailwind-styled-components";
import { AddAuto } from "./add-auto";
import { cn } from "@/utils/cn";
import { TheTip, TooltipTrigger } from "@/app/(ui)/tooltip";

export const AutosPage = () => {
  const userCreds = useContext(AuthContext);
  const autosRef = collection(
    doc(db, `users/${userCreds?.user?.uid}`),
    "autos",
  ).withConverter(AutoDataConverter);
  const [autos, loading, error] = useCollectionData(autosRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  if (error) {
    onError(error.code, error.name);
  }

  const ExtrasOptions = useCallback(() => {
    const options = opts(<Refreshing />, <Counter length={autos?.length} />);
    return <>{options.get(loading)}</>;
  }, [loading, autos?.length]);

  return (
    <div className="space-y-4 border-none p-0 outline-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Title>Autos</Title>
          <TheTip content="Add new auto">
            <TooltipTrigger>
              <AddAuto />
            </TooltipTrigger>
          </TheTip>

          <TheTip content={loading ? `...loading autos` : `Total vehicles`}>
            <TooltipTrigger>
              <ExtrasOptions />
            </TooltipTrigger>
          </TheTip>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {autos?.map((item) => (
          <AutoItem
            className="space-y-2 overflow-hidden rounded-lg border-[0.33px] border-ash bg-white shadow-sm"
            key={item.id}
            autoItem={item}
          />
        ))}
      </div>
    </div>
  );
};

const Refreshing = () => (
  <Cover>
    <Inner className={cn(`bg-ash/50`)}>
      <Loader2Icon
        strokeWidth={1}
        className="text-slate-600 h-3 w-3 animate-spin"
      />
    </Inner>
  </Cover>
);

const Counter = ({ length }: { length: number | undefined }) => (
  <Cover>
    <Inner className={cn(`bg-ash/80`)}>{length}</Inner>
  </Cover>
);

const AutoDataConverter: FirestoreDataConverter<VehicleSchema> = {
  toFirestore(auto: VehicleSchema): DocumentData {
    return {
      make: auto.make,
      isActive: auto.isActive,
      category: auto.vehicle_cat,
    };
  },
  fromFirestore(snapshot, options): VehicleSchema {
    const data = snapshot.data(options) as VehicleSchema;
    return {
      id: snapshot.id,
      name: data.auto_name ?? "",
      make: data.make ?? "",
      type: data.vehicle_cat ?? "",
    };
  },
};

const Title = tw.p`
  font-sans text-lg font-semibold tracking-tighter
  `;

const Cover = tw.div`
  rounded-full border-[0.33px] border-zap p-[1px] backdrop-blur-lg
  flex justify-center bg-gradient-to-br from-blue-100 via-blue-paper to-zap to-100%
  `;
const Inner = tw.div`
  flex h-[18px] w-[18px] items-center justify-center rounded-full border-[0.33px] border-ash/50
  text-[12px] text-fast
  `;
