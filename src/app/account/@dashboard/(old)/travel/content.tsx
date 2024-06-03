"use client";

import { TheTip, TooltipTrigger } from "@/app/(ui)/tooltip";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { Title } from "../(autos)/autos";
import { Card } from "../../(components)/card";
import { useState } from "react";

export const ProtectionContent = () => {
  const [loading] = useState(false);
  return (
    <div>
      <div className="flex items-center space-x-6">
        <TheTip content="Compulsory Third Party Liability">
          <TooltipTrigger>
            <Title className="flex items-center space-x-4">
              <span>Travel Insurance</span>
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

      <div className="my-[16px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            title="International"
            description="Travelling abroad."
            onClick={() => console.log("")}
            iconStyle=""
            icon={PlusIcon}
            actionLabel="Checkout"
            value={""}
            loading={false}
          />
          <Card
            title="Domestic"
            description="Travel within the Philippines"
            onClick={() => console.log("")}
            iconStyle=""
            icon={PlusIcon}
            actionLabel="Checkout"
            value={""}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};
