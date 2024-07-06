"use client";

import { Button } from "@@ui/button";
import { cn } from "@@utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/libs/db";

export const Brand = () => {
  const pathname = usePathname();
  const accountPath = pathname.split("/")[1];
  const [user] = useAuthState(auth);

  const NavContent = useCallback(() => {
    const authedAccount = accountPath === "account" && !!user?.uid;
    const options = opts(<AccountNav />, <FastLanding />);
    return <>{options.get(authedAccount)}</>;
  }, [accountPath, user]);

  return <NavContent />;
};

const AccountNav = () => {
  return (
    <div className="flex h-[56px]">
      <div className="flex w-[250px] items-center justify-start border-r-[1.5px] border-neutral-900 bg-neutral-900 portrait:w-[100px] portrait:border-0 portrait:bg-white">
        <Logo />
      </div>
    </div>
  );
};

function Logo() {
  return (
    <Link role="button" aria-label="Home" href={"/"} className="portrait:px-4">
      <Button
        variant="ghost"
        className={cn(
          "flex items-center ring-0 focus-visible:ring-offset-0 portrait:px-0",
        )}
      >
        <Image
          alt="fast-logo"
          src="/logo/fast_light_grey.svg"
          width={0}
          height={0}
          className="h-[32px] w-[72px] fill-neutral-700"
          unoptimized
          priority
        />
      </Button>
    </Link>
  );
}
const FastLanding = () => {
  return (
    <section className={"flex items-center justify-between space-x-12"}>
      <Logo />
      {/* <MenuList className="mx-6 hidden md:flex" /> */}
    </section>
  );
};
