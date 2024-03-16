import { auth } from "@/libs/db";
import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";
import { onPromise } from "@/utils/toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@components/popover";
import { type User } from "firebase/auth";
import {
  ArrowUpRightSquareIcon,
  ClipboardPenLineIcon,
  DotIcon,
  FilesIcon,
  GiftIcon,
  HelpCircleIcon,
  LogInIcon,
  UserCircle2Icon,
  Wallet2Icon,
  type LucideIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Button } from "../_components/button";
import { DarkTouch } from "../_components/touch";
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

const notAuthedGroup: GroupItem[] = [
  {
    label: "New Account",
    values: [
      {
        label: "Create New Account",
        desc: "Register for free!",
        value: "0",
        icon: ArrowUpRightSquareIcon,
        href: "/signin",
      },
    ],
  },
];

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "15,000",
        desc: "Account Balance",
        value: "0",
        icon: Wallet2Icon,
        href: "/products",
      },
      {
        label: "Insurance",
        desc: "View all coverage",
        value: "3",
        icon: FilesIcon,
        href: "/autoloans",
      },
      {
        label: "Gifts",
        desc: "Claim your gifts.",
        value: "2",
        icon: GiftIcon,
        href: "/autoloans",
      },
      {
        label: "Claims",
        desc: "File a claim",
        value: "1",
        icon: ClipboardPenLineIcon,
        href: "/products",
      },
    ],
  },
  {
    label: "Misc",
    values: [
      {
        label: "Customer Support",
        desc: "Customize your profile.",
        value: "67890",
        icon: HelpCircleIcon,
        href: "#",
      },
    ],
  },
];

type SignOptionProps = {
  onSelect: () => void;
};

const LogoutOption = ({ onSelect }: SignOptionProps) => (
  <CommandItem
    className="group w-full rounded-md px-4 py-4 pt-4 hover:bg-fast"
    onSelect={onSelect}
  >
    <div className="flex w-full items-center">
      <p className="font-k2d text-sm font-semibold text-fast group-hover:text-zap">
        Logout
      </p>
      <LogOutIcon className="ml-auto h-5 w-5 text-zap" />

      {/* <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 py-1.5 font-mono text-[16px] font-medium text-slate-500 opacity-100">
        <span className="tracking-tight">⌘</span>
        <span className="text-sm">Q</span>
      </kbd> */}
    </div>
  </CommandItem>
);

const SignInOption = ({ onClick }: { onClick: () => void }) => (
  <Link href="/signin">
    <DarkTouch className="w-full" size="md" tail={LogInIcon} onClick={onClick}>
      <CommandItem className="pointer-events-none flex w-full items-center justify-between">
        <p className="text-sm font-bold tracking-tight">Sign in</p>
      </CommandItem>
    </DarkTouch>
  </Link>
);

type Group = (typeof groups)[number]["values"][number];

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();

  const creds = useContext(AuthContext);
  const closePopover = () => setOpen(false);

  const SignOptions = useCallback(() => {
    const logout = () => {
      onPromise(signOut(), "Logging out...", error);
    };
    const isAuthed = creds?.user !== null;
    const options = opts(
      <LogoutOption onSelect={logout} />,
      <SignInOption onClick={closePopover} />,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds, error, signOut]);

  const MenuOptions = useCallback(() => {
    const handleSelect = (item: Item) => {
      console.log(loading ? "Pending..." : "Complete.");
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
  }, [creds, selectedValue, loading]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <UserCircle2Icon
            strokeWidth={1.5}
            className="h-5 w-5 text-blue-950"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mr-1 mt-3 w-[300px] rounded-lg border p-0">
        <Command>
          <MenuOptions />

          <CommandSeparator className="bg-clay/20" />
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
  onSelect: (item: Item) => void;
  selectedValue: Group | undefined;
};

const NotAuthedContent = ({
  onSelect,
  selectedValue,
}: NotAuthedContentProps) => {
  return (
    <CommandList>
      {notAuthedGroup.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`}>
              <CommandItem
                key={item.value}
                onSelect={() => onSelect(item)}
                className={cn(
                  `flex items-center py-2 text-sm font-bold`,
                  selectedValue?.value === item.value
                    ? "text-blue-600"
                    : "text-blue-950",
                )}
              >
                <div>
                  <item.icon
                    strokeWidth={1}
                    className={cn(
                      `mr-4 h-[28px] w-[28px] rounded p-[6px] transition-all duration-300 group-hover:bg-blue-950 group-hover:text-blue-100`,
                      selectedValue?.value === item.value
                        ? "bg-blue-950 text-blue-100"
                        : "bg-ash/30 text-coal",
                    )}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="tracking-tight">{item.label}</p>
                  <p className="text-[11px] font-normal leading-[11px] text-coal">
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
  );
};

type AuthedContentProps = {
  user: User | null | undefined;
  onSelect: (item: Item) => void;
  selectedValue: Group | undefined;
};

const AuthedContent = ({
  onSelect,
  selectedValue,
  user,
}: AuthedContentProps) => {
  return (
    <CommandList>
      <Link href="/account" role="button" aria-label="Account">
        <CommandItem className="group border-0 py-3">
          <UserCircle2Icon
            strokeWidth={1.5}
            className="transition-color mx-1 mr-3 h-[28px] w-[28px] p-[6px] text-clay/80 duration-300 group-hover:text-blue-400"
          />
          <div className="flex flex-col justify-center">
            <p className="font-bold text-blue-950">
              {user?.displayName ?? `Account`}
            </p>
            <p className="text-[11px] font-normal leading-[11px] text-clay/80">
              {user?.email}
            </p>
          </div>
        </CommandItem>
      </Link>

      <CommandSeparator className="bg-clay/20" />

      <CommandEmpty>Nothing found.</CommandEmpty>
      {groups.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className="group">
              <CommandItem
                key={item.value}
                onSelect={() => onSelect(item)}
                className={cn(
                  `font-k2d transition-color items-center py-2 text-sm font-semibold duration-300 hover:text-blue-500`,
                  selectedValue?.value === item.value
                    ? "text-blue-500"
                    : "text-blue-950",
                )}
              >
                <item.icon
                  strokeWidth={1.5}
                  className={cn(
                    `mr-3 h-[28px] w-[28px] rounded p-[6px] transition-all duration-300 group-hover:bg-blue-950 group-hover:text-blue-100`,
                    selectedValue?.value === item.value
                      ? "bg-blue-950 text-zap"
                      : "text-clay/80",
                  )}
                />
                <div className="flex flex-col justify-center">
                  <p className="">{item.label}</p>
                  <p className="text-[11px] font-normal leading-[11px] text-clay/80">
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
  );
};
