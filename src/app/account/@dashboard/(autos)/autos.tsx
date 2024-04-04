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
import { RefreshCcwIcon } from "lucide-react";
import { useCallback, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { type VehicleSchema } from "./active-form";
import { AutoItem } from "./auto-item";
import { AuthContext } from "@/app/(context)/context";

export const AutosPage = () => {
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
    <div className="space-y-4 border-none p-0 outline-none">
      <DescriptionOptions />
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
  );
};

const Refreshing = () => (
  <div className="flex items-center space-x-4 font-sans tracking-tight">
    <RefreshCcwIcon className="h-4 w-4 animate-spin text-ash" />
    <p className="text-sm text-clay">Refreshing ...</p>
  </div>
);

const Counter = ({ length }: { length: number | undefined }) => (
  <p className="font-sans text-sm tracking-tight text-clay">
    Registered Autos ({length})
  </p>
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
