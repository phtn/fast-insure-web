"use client";

import { TheTip, TooltipTrigger } from "@/app/(ui)/tooltip";
import { Title } from "../(autos)/autos";
import { Card } from "../(components)/card";
import { Disc3Icon, PlusIcon, RefreshCw, SparklesIcon } from "lucide-react";
import { type ItemPageProps } from "./page";
import { useCheckout } from "../(autos)/hooks";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/(context)/context";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/libs/db";
import { type VehicleDataSchema } from "@/server/resource/autos";
import { getBnewPriceByClass } from "./helpers";
import { PaymentOptions } from "../(components)/payments";

export const ItemContent = ({ params }: ItemPageProps) => {
  const userCreds = useContext(AuthContext);
  const userId = userCreds?.user?.uid;

  const [value, loading] = useDocument(
    doc(db, `users/${userId}/autos/`, `${params.id}`),
    { snapshotListenOptions: { includeMetadataChanges: true } },
  );

  const [vehicle, setVehicle] = useState<VehicleDataSchema | null>(null);

  useEffect(() => {
    if (value) {
      console.log(value.data());
      setVehicle(value.data() as VehicleDataSchema);
    }
  }, [value]);

  const [isRenewal, setIsRenewal] = useState(false);
  const { handleCheckout } = useCheckout({
    vehicle,
    userId,
    isRenewal,
  });
  return (
    <div>
      <div className="flex items-center space-x-6">
        <TheTip content="Compulsory Third Party Liability">
          <TooltipTrigger>
            <Title className="flex items-center space-x-4">
              <span>CTPL Insurance</span>
              {loading ? (
                <Disc3Icon
                  className="size-4 animate-spin text-fast"
                  strokeWidth={1}
                />
              ) : null}
            </Title>
          </TooltipTrigger>
        </TheTip>
      </div>

      <div className="my-[16px] rounded-lg border border-ash/50 p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="font-sans text-sm">Name: {vehicle?.auto_name}</p>
          </div>
          <div>
            <p className="font-sans text-sm">vin: {vehicle?.vin}</p>
          </div>
        </div>
      </div>

      <div className="my-[16px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            title="Brand New Vehicle"
            description="Fresh from auto dealership."
            onClick={() => console.log("")}
            // onClick={handleCheckout(
            //   String(
            //     getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
            //   ),
            // )}
            onClickCrypto={handleCheckout(
              String(
                getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
              ),
            )}
            icon={SparklesIcon}
            iconStyle=""
            actionIcon={PlusIcon}
            actionLabel="Checkout"
            trigger={
              <PaymentOptions
                handleICash={() => console.log("")}
                loading={loading}
              />
            }
            value={getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR")}
            loading={loading}
          />
          <Card
            title="Renewal"
            description="Policy renewal."
            onClick={() => console.log("renew")}
            onClickCrypto={handleCheckout(
              String(
                getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
              ),
            )}
            icon={RefreshCw}
            actionIcon={PlusIcon}
            actionLabel="Renew"
          />
        </div>
      </div>
    </div>
  );
};
