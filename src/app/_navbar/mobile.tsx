import { cn } from "@/utils/cn";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@@components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@components/popover";
import { motion } from "framer-motion";
import {
  CandyIcon,
  CarFrontIcon,
  CircleUserIcon,
  ClipboardPenLineIcon,
  DotIcon,
  MenuIcon,
  Wallet2Icon,
  type LucideIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "../_components/button";
import { AuthContext } from "../context";

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
  {
    label: "Misc",
    values: [
      {
        label: "Sign in",
        desc: "Customize your profile.",
        value: "67890",
        icon: CircleUserIcon,
        href: "/signin",
      },
    ],
  },
];

type Group = (typeof groups)[number]["values"][number];

export const MobileMenu = () => {
  const user = useContext(AuthContext)?.user;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();
  const handleClick = () => {
    console.log("menu clicked");
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
          <Button variant={"ghost"} size={"icon"} onClick={handleClick}>
            <MenuIcon className="h-5 w-5 text-blue-950" />
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="mr-1 mt-3 w-[220px] border-blue-100 p-0">
        <Command>
          <CommandList>
            <Link href="/account">
              <CommandItem className="py-3">
                <UserCircleIcon className="mx-1 mr-3 h-[36px] w-[36px] rounded p-[6px] text-blue-500" />
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-blue-950">
                    {user?.uid ? user.email : "Sign in"}
                  </p>
                  <p className="text-[11px] font-normal leading-[11px] text-blue-900">
                    {user?.email}
                  </p>
                </div>
              </CommandItem>
            </Link>
            {/* <CommandInput placeholder="Search products..." /> */}
            {/* <CommandEmpty>Nothing found.</CommandEmpty> */}
            {groups.map((group) => (
              <CommandGroup key={group.label}>
                {group.values.map((item) => (
                  <Link key={item.value} href={item.href ?? `#`}>
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setSelectedValue(item);
                        setOpen(false);
                      }}
                      className={cn(
                        `items-center py-3 text-sm font-bold`,
                        selectedValue?.value === item.value
                          ? "text-blue-500"
                          : "text-blue-950",
                      )}
                    >
                      <item.icon
                        className={cn(
                          `mr-4 h-[28px] w-[28px] rounded p-[6px]`,
                          selectedValue?.value === item.value
                            ? "bg-blue-950 text-blue-100"
                            : "text-zinc-400",
                        )}
                      />
                      <div className="flex flex-col justify-center">
                        <p className="">{item.label}</p>
                        <p className="text-[11px] font-normal leading-[11px] text-zinc-600">
                          {item.desc}
                        </p>
                      </div>
                      <DotIcon
                        className={cn(
                          "ml-auto h-10 w-10",
                          selectedValue?.value === item.value
                            ? "animate-pulse text-blue-500 opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          {/* <CommandSeparator /> */}
          {/* <CommandList>
            <CommandGroup>
              <CommandItem
                className="mx-1 border-t pb-1 pt-2 text-sm font-bold tracking-tight"
                onSelect={() => {
                  //
                }}
              >
                <CircleUserIcon className="mr-2 h-4 w-4 text-blue-500" />
                Sign in
              </CommandItem>
            </CommandGroup>
          </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
