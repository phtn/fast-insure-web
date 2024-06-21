"use client";

import { Button } from "@@ui/button";
import { cn } from "@@utils/cn";
import Link from "next/link";
import { MenuList } from "./menubar";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";

export default function BrandNav() {
  const pathname = usePathname();
  const accountPath = pathname.split("/")[1];

  const NavContent = useCallback(() => {
    const accountRoute = accountPath === "account";
    const options = opts(<AccountNav />, <FastLanding />);
    return <>{options.get(accountRoute)}</>;
  }, [accountPath]);

  return <NavContent />;
}

const AccountNav = () => {
  return (
    <div className="flex h-[42px] w-full">
      <div className="flex w-[246.5px] items-end justify-center border-r border-gray-300 bg-[#e6e6e6]">
        <Logo />
      </div>
    </div>
  );
};

// accountPath === "account" ? "hidden h-[0px]" : "h-[72px]",

function Logo() {
  return (
    <Link role="button" aria-label="Home" href={"/"}>
      <Button variant="ghost" className={cn("flex items-center portrait:px-0")}>
        <div className="h-[32px] w-[72px] bg-[url('/logo/fast_light_bg.svg')] bg-cover bg-center" />
      </Button>
    </Link>
  );
}
const FastLanding = () => {
  return (
    <section className={"flex items-center justify-between space-x-12"}>
      <Logo />
      <MenuList className="mx-6 hidden md:flex" />
    </section>
  );
};

{
  /* <Link role="button" aria-label="Home" href={"/"}>
        <Button
          variant="ghost"
          className={cn("flex items-center justify-start portrait:px-0")}
        >
          <motion.div
            initial={{ x: -500, skewX: `${85}deg` }}
            animate={{ x: 0, skewX: `${0}deg`, opacity: 1 }}
            transition={{
              damping: 1,
              duration: 1,
              delay: 3.5,
            }}
            className="h-[28px] w-[100px] bg-[url('/logo/fi_logo_v1.svg')] bg-cover bg-center"
          />
        </Button>
      </Link> */
}
