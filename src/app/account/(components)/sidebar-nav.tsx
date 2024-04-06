"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes } from "react";
import { sidebarAffiliate, sidebarUser } from "./sidebar-data";
import tw from "tailwind-styled-components";

export const SidebarAffiliate = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex overflow-scroll lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {sidebarAffiliate.map((group) => (
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

export const SidebarUser = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex overflow-x-scroll px-2 lg:flex-col lg:space-y-2 portrait:space-x-4",
        className,
      )}
      {...props}
    >
      {sidebarUser.map((group) => (
        <div
          key={group.label}
          className="flex lg:flex-col lg:space-x-0 portrait:space-x-4"
        >
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`}>
              <GroupItem>
                <IconContainer>
                  <item.icon
                    strokeWidth={1.5}
                    className={cn(
                      iconClass,
                      pathname === item.href ? `text-blue-500` : ``,
                    )}
                  />
                </IconContainer>
                <ItemContent
                  className={cn(pathname === item.href ? `text-blue-500` : ``)}
                >
                  <p className="w-full">{item.label}</p>
                </ItemContent>
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
        "flex h-[46px] w-full items-center",
        pathname === link ? `text-blue-500` : ``,
      )}
    >
      {label}
    </div>
  );
};

const GroupItem = tw.div`
  flex w-full space-x-2 md:space-x-4
  font-sans font-semibold text-md text-clay tracking-tighter
  transition-colors duration-200 delay-200 ease-in
  md:hover:text-blue-500
  relative z-50
  `;

const ItemContent = tw.div`
  flex h-[46px] w-full items-center
  `;

const IconContainer = tw.div`
  flex items-center justify-center h-[46px] w-[46px]
  `;

const iconClass = `
  md:size-[20px] size-[18px]
  group-hover:scale-[120%]
  transition-transform duration-200 delay-200 ease-out
  `;
