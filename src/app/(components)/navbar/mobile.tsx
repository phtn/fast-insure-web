import { cn } from "@/utils/cn";
import { Command, CommandGroup, CommandItem, CommandList } from "@@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@ui/popover";
import { motion } from "framer-motion";
import {
  CandyIcon,
  CarFrontIcon,
  ClipboardPenLineIcon,
  DotIcon,
  MenuIcon,
  Wallet2Icon,
  type LucideIcon,
  UserCogIcon,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "@@ui/button";
import { ItemContent, LogoutOption, Subtext, iconClass } from "./usermenu";
import { AuthContext } from "@/app/(context)/context";

type Item = {
  label: string;
  desc: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

type GroupItem = {
  label: string;
  values: Item[];
};

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "Products",
        desc: "17 items",
        value: "0",
        icon: CandyIcon,
        href: "/products",
      },
      {
        label: "Claims",
        desc: "File a claim",
        value: "1",
        icon: ClipboardPenLineIcon,
        href: "/products",
      },
      {
        label: "Auto Loans",
        desc: "Get approved today!",
        value: "2",
        icon: CarFrontIcon,
        href: "/autoloans",
      },
      {
        label: "i-Cash",
        desc: "Earn & Shop online",
        value: "3",
        icon: Wallet2Icon,
        href: "/autoloans",
      },
    ],
  },
];

type Group = (typeof groups)[number]["values"][number];

export const MobileMenu = () => {
  const user = useContext(AuthContext)?.user;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();

  const closePopover = () => setOpen(false);

  const handleSelect = (item: Item) => () => {
    setSelectedValue(item);
    closePopover();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.div
          initial={{ x: 150, opacity: 0, skewX: `${-85}deg` }}
          animate={{ x: 0, skewX: `${0}deg`, opacity: 1 }}
          transition={{
            damping: 1,
            duration: 0.3,
            delay: 4.5,
          }}
        >
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon className="h-5 w-5 text-blue-950" />
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="mr-1 mt-3 w-[220px] border-blue-100 p-0">
        <Command>
          <CommandList>
            <div className="m-4">
              <Link href={"/signin"}>
                <CommandItem className="my-2" onSelect={() => console.log("")}>
                  <UserCogIcon
                    strokeWidth={1.5}
                    className="mr-3 h-[32px] w-[32px] p-[6px] text-fast transition-colors duration-300"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-medium">Account</p>
                    <Subtext>{user?.email}</Subtext>
                  </div>
                </CommandItem>
              </Link>
            </div>
            {groups.map((group) => (
              <CommandGroup key={group.label}>
                {group.values.map((item) => (
                  <Link key={item.value} href={item.href ?? `#`}>
                    <CommandItem key={item.value} onSelect={handleSelect(item)}>
                      <item.icon
                        strokeWidth={1}
                        className={cn(
                          iconClass,
                          selectedValue?.value === item.value
                            ? "bg-blue-950 text-zap"
                            : "text-coal",
                        )}
                      />
                      <ItemContent label={item.label} desc={item.desc} />
                      <DotIcon
                        className={cn(
                          "ml-auto h-10 w-10",
                          selectedValue?.value === item.value
                            ? "text-blue-500 opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandList>
            <CommandGroup>
              <LogoutOption />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
