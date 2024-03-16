"use client";

import Link from "next/link";
import { cn } from "@@utils/cn";
import { usePathname } from "next/navigation";
import tw from "tailwind-styled-components";

interface MenuData {
  id: number;
  title: string;
  description: string;
  href: string;
}

const data: MenuData[] = [
  { id: 0, title: "Products", description: "All Products", href: "/products" },
  { id: 1, title: "Claims", description: "All Products", href: "#" },
  {
    id: 2,
    title: "Auto Loan",
    description: "All Products",
    href: "/autoloans",
  },
  { id: 3, title: "i-Cash", description: "All Products", href: "#" },
];

export function MenuList({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center space-x-6 font-medium lg:space-x-12",
        className,
      )}
      {...props}
    >
      {data.map((item) => (
        <Item key={item.id} href={item.href}>
          {item.title}
          {pathName === item.href ? <Activeline /> : <Underline />}
        </Item>
      ))}
    </nav>
  );
}

const Item = tw(Link)`
  bg-gradient-to-tr from-coal to-zinc-500 bg-clip-text
  text-sm tracking-wider text-transparent transition-colors
  group font-k2d hover:from-fast hover:to-blue-500
`;

const Underline = tw.span`
 block max-w-0 group-hover:max-w-full bg-gradient-to-r from-blue-900 to-blue-600 rounded-full transition-all duration-500 h-[3px] mx-[2.5px]
`;

const Activeline = tw.span`
 block group-hover:max-w-full bg-gradient-to-r from-rose-600 to-blue-600 rounded-full transition-all duration-500 h-[3px] mx-[2.5px]
`;
