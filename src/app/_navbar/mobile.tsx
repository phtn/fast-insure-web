import { cn } from '@/utils/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@components/popover";
import { motion } from 'framer-motion';
import { CandyIcon, CarFrontIcon, CircleUserIcon, ClipboardPenLineIcon, DotIcon, MenuIcon, Wallet2Icon, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../_components/button';

type Item = {
  label: string
  desc: string
  value: string
  icon: LucideIcon
  href?: string
}

type GroupItem = {
  label: string
  values: Item[]
}

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "Products",
        desc: "17 items",
        value: "0",
        icon: CandyIcon,
        href: '/products'
      },
      {
        label: "Claims",
        desc: "File a claim",
        value: "1",
        icon: ClipboardPenLineIcon,
        href: '/products'
      },
      {
        label: "Auto Loans",
        desc: "Get approved today!",
        value: "2",
        icon: CarFrontIcon,
        href: '/autoloans'
      },
      {
        label: "i-Cash",
        desc: "Earn & Shop online",
        value: "3",
        icon: Wallet2Icon,
        href: '/autoloans'
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
        href: '/signin'
      },
    ],
  },
];

type Group = (typeof groups)[number]["values"][number];

export const MobileMenu = () => {
  const [open, setOpen] = useState(false)
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
      <PopoverContent className="mt-3 mr-1 w-[220px] border-blue-100 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search products..." />
            <CommandEmpty>Nothing found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup
                key={group.label}
              >
                {group.values.map((item) => (
                  <Link key={item.value} href={item.href ?? `#`}>
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setSelectedValue(item);
                        setOpen(false);
                      }}
                      className={cn(
                        `py-3 font-bold text-sm items-center`,
                        selectedValue?.value === item.value
                          ? "text-blue-500"
                          : "text-blue-950",
                      )}
                    >
                      <item.icon className={cn(`mr-4 h-[28px] w-[28px] rounded p-[6px]`, selectedValue?.value === item.value ? "bg-blue-950 text-blue-100"
                        : "text-zinc-400")} />
                      <div className='flex flex-col justify-center'>
                        <p className=''>{item.label}</p>
                        <p className='text-[11px] leading-[11px] text-zinc-600 font-normal'>{item.desc}</p>

                      </div>
                      <DotIcon
                        className={cn(
                          "ml-auto h-10 w-10",
                          selectedValue?.value === item.value
                            ? "text-blue-500 animate-pulse opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="font-bold tracking-tight text-sm pt-2 pb-1 border-t mx-1"
                onSelect={() => {
                  //
                }}
              >
                <CircleUserIcon className="mr-2 h-4 w-4 text-blue-500" />
                Sign in
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};
