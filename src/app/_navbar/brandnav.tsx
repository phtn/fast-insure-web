"use client";

import { Button } from "@@components/button";
import { cn } from "@@utils/cn";
import { motion } from "framer-motion";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";

export default function BrandNav() {
  return (
    <Link role="button" aria-label="Home" href={"/"}>
      <Button
        variant="ghost"
        className={cn("flex items-center justify-center")}
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
        <ChevronsUpDownIcon className="ml-auto hidden h-5 w-5 shrink-0 text-blue-950" />
      </Button>
    </Link>
  );
}
