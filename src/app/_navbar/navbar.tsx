import BrandNav from "./brandnav";
import { MainNav } from "./mainnav";
import { Mode, Help } from "./mode";
import { UserNav } from "./usernav";

export const Navbar = () => {
  return (
    <div className="from-33% via-66% absolute w-full border-b bg-gradient-to-r from-orange-50 via-blue-200 to-orange-50 px-16">
      <div className="flex h-16 items-center justify-between px-4">
        <BrandNav />
        <MainNav className="mx-6" />
        <div className="flex w-[200px] items-center justify-between">
          <Help />
          <Mode />
          <UserNav />
        </div>
      </div>
    </div>
  );
};
