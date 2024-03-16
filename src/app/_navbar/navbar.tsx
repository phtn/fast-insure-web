"use client";

import { motion } from "framer-motion";
import tw from "tailwind-styled-components";
import BrandNav from "./brandnav";
import { MobileMenu } from "./mobile";
// import { Help, Mode } from "./mode";
import { UserMenu } from "./usermenu";

export const Navbar = () => {
  return (
    <Container
      initial={{ scaleY: 0, height: 0, opacity: 0 }}
      animate={{ scaleY: 1, height: 72, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <div className="flex h-[72px] w-full items-center justify-between px-4 md:w-[1080px]">
        <BrandNav />
        <div className="hidden items-center justify-between md:flex">
          {/* <Help /> */}
          {/* <Mode /> */}
          <UserMenu />
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </Container>
  );
};

const Container = tw(motion.div)`
  z-50 absolute w-full border-b-[0.33px] sticky top-0 md:px-16
  bg-zap flex justify-center
`;
