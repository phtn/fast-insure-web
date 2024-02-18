"use client";

import { checkoutSession } from "@/trpc/icash/checkout";
import { opts, toggleState } from "@/utils/helpers";
import { onError } from "@/utils/toast";
import { Badge } from "@@components/badge";
import { Button } from "@@components/button";
import { DarkTouch, Touch } from "@@components/touch";
import {
  ArrowRightIcon,
  AtSignIcon,
  BadgeCheckIcon,
  CalendarDaysIcon,
  EyeIcon,
  EyeOffIcon,
  MapPinnedIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { payload } from "../_autos/data";
import { useUserProfile } from "./hooks";

export const Content = () => {
  const [visible, setVisible] = useState(false);
  const { profile, joinDate, address } = useUserProfile();
  const handleCheckout = () => {
    checkoutSession(payload)
      .then((res) => console.log(res.data))
      .catch((err: Error) => onError(err.name, err.message));
  };

  const toggleVisible = () => toggleState(setVisible);

  const VerifyOptions = useCallback(() => {
    const verified = !!profile?.isVerified;
    const options = opts(
      <VerifiedBadge />,
      <DarkTouch variant="secondary" size="sm" tail={ArrowRightIcon}>
        Get Verified
      </DarkTouch>,
    );
    return <>{options.get(verified)}</>;
  }, [profile?.isVerified]);
  return (
    <div className="mt-4 h-[450px] justify-center space-y-6 rounded-md border border-white bg-white">
      <div className="z-50 -mt-[75px] flex w-full justify-between px-8 md:px-44">
        <div className="h-[150px] w-[150px] rounded-full border-[4px] border-white bg-ash"></div>
        <div className="mt-[80px] flex items-center space-x-4">
          <Touch
            icon={visible ? EyeIcon : EyeOffIcon}
            size="sm"
            variant="default"
            onClick={toggleVisible}
          />
          <Badge variant="outline" className="flex items-center space-x-2">
            <span>Last login: 2 days ago</span>
            <BadgeCheckIcon strokeWidth={1} className="h-4 w-4" />
          </Badge>
          <VerifyOptions />
        </div>
      </div>
      <div className="space-y-6 px-8 md:px-44">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold tracking-tight text-coal">
              {profile.completeName || `Add your name!`}
            </h3>
            <Touch variant="primary" size="sm" tail={ArrowRightIcon}>
              Complete Setup
            </Touch>
          </div>
          <Button
            className=""
            variant="outline"
            size="sm"
            onClick={handleCheckout}
          >
            c
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <AtSignIcon className="h-3 w-3 text-clay" />
            <p className="text-xs text-clay">{profile.email}</p>
          </div>
          <div className="flex items-center space-x-1">
            <MapPinnedIcon className="h-3 w-3 text-clay" />
            <p className="text-xs text-clay">{address.city ?? ""}</p>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarDaysIcon className="h-3 w-3 text-clay" />
            <p className="text-xs text-clay">{joinDate}</p>
          </div>
        </div>
        <div className="border-t- space-y-4 border-double ">
          <div className="mt-10 font-bold text-coal">Summary</div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex h-[175px] items-center justify-center rounded-lg bg-indigo-100 text-indigo-500">
              Auto Protection (0)
            </div>
            <div className="flex h-[175px] items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              Life / Personal Protection (0)
            </div>
            <div className="flex h-[175px] items-center justify-center rounded-lg bg-pink-50 text-pink-500">
              Travel Protection (0)
            </div>
          </div>
        </div>
        <div className="h-[210px]"></div>
      </div>
    </div>
  );
};

const VerifiedBadge = () => (
  <Badge variant="dark" className="flex items-center space-x-2">
    <span>Verified</span>
    <BadgeCheckIcon strokeWidth={1} className="h-4 w-4" />
  </Badge>
);
