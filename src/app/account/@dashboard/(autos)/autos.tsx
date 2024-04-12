"use client";

import { AuthContext } from "@/app/(context)/context";
import { TheTip, TooltipTrigger } from "@/app/(ui)/tooltip";
import { db } from "@/libs/db";
import { opts } from "@/utils/helpers";
import { onError } from "@/utils/toast";
import {
  collection,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { Loader2Icon, SquircleIcon } from "lucide-react";
import { useCallback, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import tw from "tailwind-styled-components";
import { type VehicleSchema } from "./active-form";
import { AddAuto } from "./add-auto";
import { AutoItem } from "./auto-item";

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
    <div className="outline-none">
      <div className="m-2 flex items-center space-x-4 sm:m-8 lg:m-0">
        <Title>Autos</Title>

        <div className="flex w-[50px] items-center justify-between">
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
      <div className="m-2 overflow-y-scroll sm:m-8 md:h-[calc(100vh-220px)] lg:m-0 lg:mt-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {autos?.map((item) => (
            <AutoItem
              className="space-y-2 overflow-hidden rounded-lg border-[0.33px] border-ash bg-white shadow-sm"
              key={item.id}
              autoItem={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Refreshing = () => (
  <Inner>
    <Sqc strokeWidth={0} />
    <Spinner strokeWidth={1} />
  </Inner>
);

const Counter = ({ length }: { length: number | undefined }) => (
  <Inner>
    <Sqc strokeWidth={0} />
    <p className="absolute">{length}</p>
  </Inner>
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

export const Title = tw.p`
  font-sans text-lg font-semibold tracking-tighter
  `;
const Spinner = tw(Loader2Icon)`
  text-fast absolute size-[12px] animate-spin
  `;
const Sqc = tw(SquircleIcon)`
  absolute size-[32px] fill-ash/40
  `;
const Inner = tw.div`
  flex items-center justify-center
  text-[12px] text-prime font-semibold
  `;
