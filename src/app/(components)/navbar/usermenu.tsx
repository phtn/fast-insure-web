import { AuthContext } from "@/app/(context)/context";
import { auth } from "@/libs/db";
import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";
import { onPromise } from "@/utils/toast";
import { Button } from "@@ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@ui/popover";
import { type User } from "firebase/auth";
import {
  ArrowUpRightSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DotIcon,
  GiftIcon,
  HelpCircleIcon,
  LogInIcon,
  LogOutIcon,
  SquircleIcon,
  UserCircle2Icon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import tw from "tailwind-styled-components";

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

const notAuthedGroup: GroupItem[] = [
  {
    label: "Sign in",
    values: [
      {
        label: "Sign in",
        desc: "Sign with email",
        value: "0",
        icon: LogInIcon,
        href: "/account",
      },
    ],
  },
  {
    label: "New Account",
    values: [
      {
        label: "Create New Account",
        desc: "Register for free!",
        value: "1",
        icon: ArrowUpRightSquareIcon,
        href: "/account",
      },
    ],
  },
];

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "Gifts",
        desc: "Claim your gifts.",
        value: "2",
        icon: GiftIcon,
        href: "/autoloans",
      },
    ],
  },
  {
    label: "Misc",
    values: [
      {
        label: "Support",
        desc: "Customize your profile.",
        value: "67890",
        icon: HelpCircleIcon,
        href: "#",
      },
    ],
  },
];

export const LogoutOption = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const logout = () => {
    onPromise(
      signOut(),
      loading ? `Logging out...` : "",
      "signout",
      "You're logged out.",
      error,
    );
  };
  return (
    <CommandItem
      className="group w-full rounded-md px-4 py-4 pt-4 hover:border-coal hover:bg-coal"
      onSelect={logout}
    >
      <div className="flex w-full items-center">
        <p className="font-sans font-bold text-coal group-hover:text-zap">
          Logout
        </p>
        <LogOutIcon className="ml-auto h-5 w-5 text-zap" />
      </div>
    </CommandItem>
  );
};

type Group = (typeof groups)[number]["values"][number];

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();

  const creds = useContext(AuthContext);
  const closePopover = () => setOpen(false);

  const SignOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(<LogoutOption />, <div />);
    return <>{options.get(isAuthed)}</>;
  }, [creds]);

  const MenuOptions = useCallback(() => {
    const handleSelect = (item: Item) => () => {
      setSelectedValue(item);
      closePopover();
    };
    const isAuthed = creds?.user !== null;
    const options = opts(
      <AuthedContent
        onSelect={handleSelect}
        selectedValue={selectedValue}
        user={creds?.user}
      />,
      <NotAuthedContent
        selectedValue={selectedValue}
        onSelect={handleSelect}
      />,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds, selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <div className="flex size-[46px] items-center justify-center overflow-clip">
            <SquircleIcon
              strokeWidth={0}
              className={cn(
                `absolute size-[46px] fill-ash/20 transition-colors duration-200 ease-in hover:fill-ash/40`,
                open ? `fill-ash/50` : ``,
              )}
            />
            <ChevronUpIcon
              strokeWidth={2}
              className={cn(
                `pointer-events-none absolute size-[18px] scale-0 transition-transform duration-300 ease-out`,
                open ? `scale-[100%]` : ``,
              )}
            />
            <ChevronDownIcon
              strokeWidth={2}
              className={cn(
                `pointer-events-none absolute size-[18px] scale-0 transition-transform duration-300 ease-out`,
                !open ? `scale-[100%]` : ``,
              )}
            />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mr-1 mt-3 w-[300px] rounded-lg border p-0">
        <Command>
          <MenuOptions />
          <CommandSeparator className="bg-paper" />
          <CommandList>
            <CommandGroup>
              <SignOptions />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type NotAuthedContentProps = {
  onSelect: (item: Item) => () => void;
  selectedValue: Group | undefined;
};

const NotAuthedContent = ({
  onSelect,
  selectedValue,
}: NotAuthedContentProps) => {
  return (
    <CommandList className="pt-2">
      {notAuthedGroup.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`}>
              <CommandItem key={item.value} onSelect={onSelect(item)}>
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
  );
};

type AuthedContentProps = {
  user: User | null | undefined;
  onSelect: (item: Item) => () => void;
  selectedValue: Group | undefined;
};

export const AuthedContent = ({
  onSelect,
  selectedValue,
  user,
}: AuthedContentProps) => {
  return (
    <CommandList>
      <div className="m-4">
        <Link href="/account" role="button" aria-label="Account">
          <CommandItem className="my-2">
            <UserCircle2Icon
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

      <CommandSeparator className="bg-paper" />

      {groups.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className="group">
              <CommandItem key={item.value} onSelect={onSelect(item)}>
                <item.icon
                  strokeWidth={1.5}
                  className={cn(
                    iconClass,
                    selectedValue?.value === item.value
                      ? "bg-blue-950 text-zap"
                      : "text-fast",
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
  );
};

type ItemContentProps = {
  label: string;
  desc: string;
};

export const ItemContent = ({ label }: ItemContentProps) => {
  return (
    <div className="mx-1 flex flex-col justify-center">
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export const Subtext = tw.p`
  text-xs leading-[14px] text-clay
  `;
export const iconClass = `
  ml-1 mr-3 h-[32px] w-[32px] rounded p-[6px]
  transition-colors duration-300 group-hover:bg-blue-950 group-hover:text-blue-100
  `;
