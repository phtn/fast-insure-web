import { type ReactNode } from "react";
import { SidebarNav } from "./sidebar-nav";

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-72px)] w-full justify-center px-4 md:px-14 lg:px-16">
      <div className="w-full md:w-[1080px]">
        <div className="w-full items-center md:block">
          <div className="h-[8px] lg:h-[24px]" />
          <div className="flex flex-col space-y-0 md:space-x-2 lg:flex-row lg:space-x-6 lg:space-y-0">
            <aside className="lg:w-1/6">
              <SidebarNav />
            </aside>
            <div className="flex-1 py-[8px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
