"use client";
import { Link2Icon, PlusIcon, UserPlusIcon } from "lucide-react";
import { Header } from "./(components)/header";
import { Card } from "./(components)/card";
import { ConnectGroup } from "./(components)/connect-group";
import { useConnect } from "./hooks";
import { AutosPage } from "./(autos)/autos";

const AffiliateContent = () => {
  return (
    <div className="w-full ">
      <Header title="Today">
        <ConnectGroup />
      </Header>
      <div className="my-[16px]">
        <div className="grid grid-cols-1 gap-6 border-0 border-sky-500 md:grid-cols-2">
          <Card
            title="Create Payment Link"
            description="Get paid by sharing a link with your clients."
            onClick={() => console.log("create")}
            onClickCrypto={() => console.log("")}
            icon={Link2Icon}
            iconStyle="-rotate-45"
            actionIcon={PlusIcon}
            actionLabel="Create"
          />
          <Card
            title="Create Client Account"
            description="Add a new client to your list."
            onClick={() => console.log("create")}
            onClickCrypto={() => console.log("")}
            icon={UserPlusIcon}
            actionIcon={PlusIcon}
            actionLabel="Create"
          />
        </div>
      </div>
    </div>
  );
};

const UserContent = () => {
  return (
    <div className="w-full">
      <AutosPage />
      <div className="my-[16px]">
        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            title="Add Autos"
            description="Get paid by sharing a link with your clients."
            onClick={() => console.log("create")}
            icon={CarIcon}
            iconStyle=""
            trigger={<AddAuto />}
            actionLabel="Add"
          />
        </div> */}
      </div>
    </div>
  );
};

export const DashboardContent = () => {
  const { getAccoutType } = useConnect();
  const accountType = getAccoutType();
  const isAffiliate = accountType === "AFFILIATE";
  return isAffiliate ? <AffiliateContent /> : <UserContent />;
};
