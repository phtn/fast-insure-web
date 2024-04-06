"use client";

import Link from "next/link";
import { cn } from "@@utils/cn";
import { usePathname } from "next/navigation";
import tw from "tailwind-styled-components";
import { Hoverpill } from "@/app/(ui)/hoverboard";

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
  const pathname = usePathname();
  return (
    <Hoverpill
      snapPoints={[100, 115, 257, 367, 426]}
      offset={124}
      parentStyle="w-fit"
    >
      <Menubar className={cn(className)} {...props}>
        {data.map((item) => (
          <Item
            key={item.id}
            href={item.href}
            className={cn(pathname === item.href ? `text-prime` : ``)}
          >
            {item.title}
          </Item>
        ))}
      </Menubar>
    </Hoverpill>
  );
}

const Menubar = tw.nav`
  flex h-[46px] items-center justify-between
  relative top-[-23px] left-[-20px] w-[364px]
  `;

const Item = tw(Link)`
  text-clay text-sm tracking-tighter font-sans font-semibold
  hover:text-prime
  transition-colors duration-200 delay-100 ease-in
  flex items-center justify-center

  h-[46px] w-fit px-5
`;
