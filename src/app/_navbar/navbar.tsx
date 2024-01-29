'use client'

import tw from "tailwind-styled-components";
import BrandNav from "./brandnav";
import { MainNav } from "./mainnav";
import { Mode, Help, MobileMenu } from "./mode";
import { UserNav } from "./usernav";
import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <Container initial={{ scaleY: 0, height: 0 }} animate={{ scaleY: 1, height: 64 }} transition={{ duration: 0.5, delay: 2.5 }}>
      <div className="flex h-16 items-center justify-between px-4">
        <BrandNav />
        <MainNav className="mx-6 hidden md:flex" />
        <div className="hidden w-[200px] items-center justify-between md:flex">
          <Help />
          <Mode />
          <UserNav />
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </Container>
  );
};

const Container = tw(motion.div)`
  from-33% via-66% z-50 absolute w-full border-0 
  bg-gradient-to-r from-orange-50 via-blue-200 to-orange-50 md:px-16
`
