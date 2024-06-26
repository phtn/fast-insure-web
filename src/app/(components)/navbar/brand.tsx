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
      <div className="flex w-[250.5px] items-center justify-start border-r-[1.5px] border-neutral-300 bg-[#e6e6e6]">
        <Logo />
      </div>
    </div>
  );
};

function Logo() {
  return (
    <Link role="button" aria-label="Home" href={"/"}>
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
