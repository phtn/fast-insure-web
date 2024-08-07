"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type HTMLAttributes } from "react";
import {
  GroupContainer,
  GroupItem,
  IconContainer,
  ItemContent,
  activeStyle,
  iconClass,
} from "./styles";
import type { SidebarNavProps } from "./types";

export const SidebarNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement> & SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex overflow-scroll lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {props.groupitems.map((group) => (
        <GroupContainer key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href}>
              <GroupItem
                className={cn(
                  pathname === item.href
                    ? `bg-ghost/80 portrait:bg-transparent`
                    : ``,
                )}
              >
                <IconContainer>
                  {item?.icon ? (
                    <item.icon strokeWidth={1} className={cn(iconClass)} />
                  ) : null}
                </IconContainer>
                <ItemContent
                  className={cn(pathname === item.href ? activeStyle : ``)}
                >
                  <p className="w-full">{item.label}</p>
                </ItemContent>
              </GroupItem>
            </Link>
          ))}
        </GroupContainer>
      ))}
    </nav>
  );
};

export const AgentOneNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement> & SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("", className)} {...props}>
      {props.groupitems.map((group) => (
        <div
          key={group.label}
          className="flex md:space-x-4 lg:flex-col lg:space-x-0 portrait:space-x-4"
        >
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`}>
              <GroupItem
                className={cn(
                  pathname === item.href
                    ? `bg-gray-100 portrait:bg-transparent`
                    : ``,
                )}
              >
                <IconContainer>
                  {item?.icon ? (
                    <item.icon
                      strokeWidth={1}
                      className={cn(
                        iconClass,
                        pathname === item.href ? `text-cyan-400` : ``,
                      )}
                    />
                  ) : null}
                </IconContainer>
                <ItemContent
                  className={cn(pathname === item.href ? `text-cyan-500` : ``)}
                >
                  <p className="w-full portrait:hidden">{item.label}</p>
                </ItemContent>
              </GroupItem>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};
