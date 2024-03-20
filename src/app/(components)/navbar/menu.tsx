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
  {
    id: 2,
    title: "Auto Loans",
    description: "All Products",
    href: "/autoloans",
  },
  { id: 3, title: "Business", description: "All Products", href: "#" },
];

export function MenuList({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  return (
    <nav
      className={cn(
        "flex h-[40px] items-end space-x-6 font-medium lg:space-x-12",
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
  bg-gradient-to-tr from-coal to-slate-700 bg-clip-text
  text-sm tracking-wide text-transparent transition-colors
  group font-sans font-medium hover:from-blue-600 hover:to-prime
  leading-[12px]
`;

const Underline = tw.span`
 block max-w-0 group-hover:max-w-full bg-gradient-to-r from-blue-600 to-blue-100 rounded-full transition-all duration-500 h-[2.5px] mt-[4px] mx-[1px]
`;

const Activeline = tw.span`
 block bg-gradient-to-r from-blue-600 to-blue-100 rounded-full transition-all duration-500 h-[2.5px] mt-[4px] mx-[1px]
`;
