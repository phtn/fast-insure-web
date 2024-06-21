"use client";

import { Button } from "@@ui/button";
import { cn } from "@@utils/cn";
import Link from "next/link";
import { MenuList } from "./menubar";

export default function BrandNav() {
  return (
    <section className="flex items-center justify-between space-x-12">
      {/* <Link role="button" aria-label="Home" href={"/"}>
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
      </Link> */}

      <Logo />
      <MenuList className="mx-6 hidden md:flex" />
    </section>
  );
}

function Logo() {
  return (
    <Link role="button" aria-label="Home" href={"/"}>
      <Button
        variant="ghost"
        className={cn("flex items-center justify-start portrait:px-0")}
      >
        <div className="h-[28px] w-[100px] bg-[url('/logo/fast_light_bg.svg')] bg-cover bg-center" />
      </Button>
    </Link>
  );
}
