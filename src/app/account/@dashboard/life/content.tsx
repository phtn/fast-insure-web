"use client";

import { RefreshCwIcon, UserIcon } from "lucide-react";
import { Card } from "../(components)/card";
import { PaymentOptions } from "../(components)/payments";
import { TheTip, TooltipTrigger } from "@/app/(ui)/tooltip";
import { Title } from "../(autos)/autos";

// import { motion } from "framer-motion";
// import { type MouseEvent, useCallback, useRef, useState } from "react";
// import tw from "tailwind-styled-components";

export const Content = () => {
  return (
    <div>
      <div className="mb-[16px] flex items-center space-x-6">
        <TheTip content="Personal Accident Insurance">
          <TooltipTrigger>
            <Title className="flex items-center space-x-4">
              <span>Personal Accident Insurance</span>
              {/* {loading ? (
                        <Disc3Icon
                          className="size-4 animate-spin text-fast"
                          strokeWidth={1}
                        />
                      ) : null} */}
            </Title>
          </TooltipTrigger>
        </TheTip>
      </div>
      <div className="my-[16px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            title="Life Insurance (New)"
            description="Fresh from auto dealership."
            onClick={() => console.log("")}
            onClickCrypto={() => console.log("")}
            // onClick={handleCheckout(
            //   String(
            //     getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
            //   ),
            // )}
            // onClickCrypto={handleCheckout(
            //   String(
            //     getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
            //   ),
            // )}
            icon={UserIcon}
            iconStyle=""
            actionLabel="Checkout"
            trigger={
              <PaymentOptions
                handleICash={() => console.log("")}
                loading={false}
              />
            }
            value={"1000"}
            loading={false}
          />
          <Card
            title="Renewal"
            description="Policy renewal."
            onClick={() => console.log("renew")}
            onClickCrypto={() => console.log("renew")}
            // onClickCrypto={handleCheckout(
            //   String(
            //     getBnewPriceByClass(vehicle?.vehicle_cat ?? "PR").toFixed(2),
            //   ),
            // )}
            icon={RefreshCwIcon}
            actionLabel="Renew"
          />
        </div>
        ;
      </div>
    </div>
  );
};

// const Container = tw(motion.div)`
//   group
//   h-[216px] w-[216px] rounded-md border border-clay p-[8px]
//   `;
// const Pill = tw(motion.div)`
//   relative h-[100px] w-[100px] rounded-md
//   group-hover:bg-ash transition-colors duration-200
//   `;
