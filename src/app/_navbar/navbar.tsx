import { MenuIcon } from "lucide-react";
import BrandNav from "./brandnav";
import { MainNav } from "./mainnav";
import { Mode, Help, MobileMenu } from "./mode";
import { UserNav } from "./usernav";
import { Button } from "../_components/button";

export const Navbar = () => {
  return (
    <div className="from-33% via-66% absolute w-full border-0 bg-gradient-to-r from-orange-50 via-blue-200 to-orange-50 md:px-16">
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
    </div>
  );
};
