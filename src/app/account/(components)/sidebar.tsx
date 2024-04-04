import { useCallback, type ReactNode } from "react";
import { SidebarAffiliate, SidebarUser } from "./sidebar-nav";
import tw from "tailwind-styled-components";
import { opts } from "@/utils/helpers";

type SidebarProps = {
  children: ReactNode;
  isAffiliate: boolean;
};
export default function Sidebar({ children, isAffiliate }: SidebarProps) {
  const SidebarOptions = useCallback(() => {
    const options = opts(<SidebarAffiliate />, <SidebarUser />);
    return <>{options.get(isAffiliate)}</>;
  }, [isAffiliate]);
  return (
    <Container>
      <div className="w-full md:w-[1080px]">
        <div className="w-full items-center md:block">
          <div className="h-[8px] lg:h-[24px]" />
          <div className="flex flex-col space-y-0 md:space-x-2 lg:flex-row lg:space-x-6 lg:space-y-0">
            <aside className="lg:w-1/5 xl:w-1/6">
              <SidebarOptions />
            </aside>
            <div className="flex-1 py-[8px]">{children}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = tw.div`
  flex h-[calc(100vh-72px)] w-full justify-center px-4 md:px-14 lg:px-16
  from-copper via-heli/5 via-[66%] to-sky-100
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  `;
