"use client";
import { Link2Icon, PlusIcon } from "lucide-react";
import { Header } from "./(components)/header";
import { Card } from "./(components)/card";

export const DashboardContent = () => {
  return (
    <div className="w-full">
      <Header title="Today" />
      <div className="my-[16px]">
        <div className="grid grid-cols-1 gap-6 border-0 border-sky-500 md:grid-cols-2">
          <Card
            title="Create Payment Link"
            description="Get paid by sharing a link with your customers."
            onClick={() => console.log("create")}
            icon={Link2Icon}
            iconStyle="-rotate-45"
            actionIcon={PlusIcon}
            actionLabel="Create"
          />
        </div>
      </div>
    </div>
  );
};
