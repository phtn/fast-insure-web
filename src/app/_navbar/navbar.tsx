"use client";

import { motion } from "framer-motion";
import tw from "tailwind-styled-components";
import BrandNav from "./brandnav";
import { MainNav } from "./mainnav";
import { MobileMenu } from "./mobile";
import { Help, Mode } from "./mode";
import { UserMenu } from "./usermenu";

export const Navbar = () => {
  return (
    <Container
      initial={{ scaleY: 0, height: 0 }}
      animate={{ scaleY: 1, height: 64 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <BrandNav />
        <MainNav className="mx-6 hidden md:flex" />
        <div className="hidden w-[200px] items-center justify-between md:flex">
          <Help />
          <Mode />
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
  z-50 absolute w-full border-0 sticky top-0 md:px-16
  bg-gradient-to-r from-paper from-33% via-blue-200 via-66% to-paper 
`;
