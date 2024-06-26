"use client";

import { motion } from "framer-motion";
import tw from "tailwind-styled-components";
import { Brand } from "./brand";
import { UserMenu } from "./usermenu";
import { usePathname } from "next/navigation";
// import { useContext } from "react";
// import { AuthContext } from "@/app/(context)/context";

export const Navbar = () => {
  const pathname = usePathname();
  const accountPath = pathname.split("/")[1] === "account";
  const titlePath = pathname.split("/")[2];

  return (
    <Container
      initial={{ height: 56, opacity: 0 }}
      animate={{ height: 56, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Inner>
        <Brand />
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex items-start text-xl font-medium capitalize tracking-tighter text-coal">
            {!!accountPath && titlePath}
          </div>
          <UserMenu />
        </div>
      </Inner>
    </Container>
  );
};

const Container = tw(motion.div)`
  z-20 absolute sticky top-0
  bg-zap flex justify-start
`;

const Inner = tw.div`
  flex w-full items-center
  `;
