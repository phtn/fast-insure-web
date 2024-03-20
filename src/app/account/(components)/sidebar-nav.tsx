"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes } from "react";
import { sidebarNavGroup } from "./sidebar-data";
import tw from "tailwind-styled-components";

export const SidebarNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 overflow-scroll lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {sidebarNavGroup.map((group) => (
        <div
          key={group.label}
          className="flex space-x-4 lg:flex-col lg:space-x-0"
        >
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className="group">
              <GroupItem>
                <item.icon
                  strokeWidth={1.5}
                  className={cn(
                    iconClass,
                    pathname === item.href ? `text-blue-600` : ``,
                  )}
                />
                <GroupItemContent
                  label={item.label}
                  link={item.href}
                  pathname={pathname}
                />
              </GroupItem>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

type GroupItemContentProps = {
  link: string | undefined;
  label: string;
  desc?: string;
  pathname: string;
};

const GroupItemContent = ({ label, pathname, link }: GroupItemContentProps) => {
  return (
    <div
      className={cn(
        "mx-1 flex flex-col justify-center",
        pathname === link ? `text-blue-600` : ``,
      )}
    >
      <p>{label}</p>
    </div>
  );
};

const GroupItem = tw.div`
  flex rounded-md px-1 py-2
  font-sans font-medium text-sm text-coal
  transition-colors duration-300
  hover:bg-paper hover:text-blue-500
  `;

const iconClass = `
  ml-0 lg:ml-1 mr-0 lg:mr-1 lg:h-[28px] lg:w-[28px] rounded p-[6px] h-[24px] w-[24px]
  `;
