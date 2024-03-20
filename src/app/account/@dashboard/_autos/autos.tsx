"use client";

import { db } from "@/libs/db";
import { opts } from "@/utils/helpers";
import { onError } from "@/utils/toast";
import { TabsContent } from "@@ui/tabs";
import {
  collection,
  doc,
  type DocumentData,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { RefreshCcwIcon } from "lucide-react";
import { useCallback, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { type VehicleSchema } from "./active-form";
import { AutoItem } from "./auto-item";
import { AuthContext } from "@/app/(context)/context";

export const Autos = () => {
  const userCreds = useContext(AuthContext);
  const autosRef = collection(
    doc(db, `users/${userCreds?.user?.uid}`),
    "autos",
  ).withConverter(AutoDataConverter);
  const [autos, loading, error] = useCollectionData(autosRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (error) {
      onError(error.code, error.name);
    }
  }, [error]);

  const DescriptionOptions = useCallback(() => {
    const options = opts(<Refreshing />, <Counter length={autos?.length} />);
    return <>{options.get(loading)}</>;
  }, [loading, autos?.length]);

  return (
    <TabsContent
      value="autos"
      className="space-y-8 border-none p-0 outline-none"
    >
      <DescriptionOptions />
      <div className="flex space-x-6 px-24 pb-4">
        {autos?.map((item) => (
          <AutoItem
            className="h-[350px] w-[350px] space-y-2 rounded-lg bg-white drop-shadow"
            key={item.id}
            autoItem={item}
          />
        ))}
      </div>
    </TabsContent>
  );
};

const Refreshing = () => (
  <div className="flex items-center space-x-4">
    <RefreshCcwIcon className="h-4 w-4 animate-spin text-ash" />
    <p className="text-sm text-clay">Refreshing ...</p>
  </div>
);

const Counter = ({ length }: { length: number | undefined }) => (
  <p className="text-sm text-clay">Registered Autos ({length})</p>
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
