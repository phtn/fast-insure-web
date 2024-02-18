"use client";

import { TabsList, TabsTrigger } from "../_components/tabs";
import Link from "next/link";
import { Touch } from "../_components/touch";
import { usePathname } from "next/navigation";

interface Tablist {
  id: number;
  name: string;
  value: string;
  href: string;
}
const tablist: Tablist[] = [
  { id: 0, name: "Autos", value: "autos", href: "/account" },
  { id: 1, name: "Travel", value: "travel", href: "/account/travel" },
  { id: 2, name: "Life", value: "life", href: "/account/life" },
  { id: 3, name: "Profile", value: "profile", href: "/account/profile" },
];

export const Triggers = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center p-8 md:px-24 md:py-10">
      <TabsList className="border border-ash bg-ash/80">
        {tablist.map((tab) => (
          <div className="w-[68px]" key={tab.id}>
            <Link href={tab.href}>
              <TabsTrigger value={tab.value} className="relative" asChild>
                <Touch
                  className="w-full"
                  size="sm"
                  variant={pathName === tab.href ? `default` : `ghost`}
                >
                  {tab.name}
                </Touch>
              </TabsTrigger>
            </Link>
          </div>
        ))}
      </TabsList>
    </div>
  );
};
