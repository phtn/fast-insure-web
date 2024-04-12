import { AuthContext } from "@/app/(context)/context";
import { Hoverdrop } from "@/app/(ui)/hoverboard";
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
  LogInIcon,
  LogOutIcon,
  SquircleIcon,
  type LucideIcon,
  LifeBuoyIcon,
  UserCircle,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useContext, useState, type HTMLProps } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import tw from "tailwind-styled-components";

interface ItemVal {
  label: string;
  desc: string;
  value: string;
  icon: LucideIcon;
  href?: string;
  style?: HTMLProps<HTMLElement>["className"];
}

type GroupItem = {
  label: string;
  values: ItemVal[];
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
        style: "group-hover:fill-sky-400/20",
      },
    ],
  },
  {
    label: "Register",
    values: [
      {
        label: "Create Account",
        desc: "Register for free!",
        value: "1",
        icon: UserPlusIcon,
        href: "/account",
        style: "group-hover:fill-teal-400/30",
      },
    ],
  },
  {
    label: "Products",
    values: [
      {
        label: "View Products",
        desc: "See all our products",
        value: "2",
        icon: ArrowUpRightSquareIcon,
        href: "/products",
        style: "group-hover:fill-indigo-400/30",
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
        style: "group-hover:fill-yellow-300/50 group-hover:stroke-fuchsia-800",
      },
    ],
  },
  {
    label: "Misc",
    values: [
      {
        label: "Support",
        desc: "Need help?",
        value: "3",
        icon: LifeBuoyIcon,
        href: "#",
        style: "group-hover:fill-emerald-300/40 group-hover:stroke-emerald-900",
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
    <LogoutItem onSelect={logout}>
      <div className="flex w-full items-center justify-between">
        <Label>Logout</Label>
        <LogOutIcon className="size-4" />
      </div>
    </LogoutItem>
  );
};

type Group = (typeof groups)[number]["values"][number];

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();

  const creds = useContext(AuthContext);
  const closePopover = () => setOpen(false);

  const isAuthed = creds?.user !== null;
  const SignOptions = useCallback(() => {
    const options = opts(<LogoutOption />, <div />);
    return <>{options.get(isAuthed)}</>;
  }, [isAuthed]);

  const MenuOptions = useCallback(() => {
    const handleSelect = (item: ItemVal) => () => {
      setSelectedValue(item);
      closePopover();
    };
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
  }, [creds, selectedValue, isAuthed]);

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

      <PopoverContent className="my-2 w-[250px] p-0">
        <Hoverdrop
          parentStyle="h-[272px]"
          pillStyle="lg:h-[56px] lg:group-hover:bg-blue-200/30 mx-2 rounded-2xl"
          snapPoints={[
            0,
            80,
            147.5,

            isAuthed ? 214 : 213,
            isAuthed ? 280 : 279.5,
            348,
            387,
            396,
          ]}
          offset={30}
        >
          <Command className="absolute lg:-mt-[54px]">
            <MenuOptions />
            <CommandSeparator />
            <CommandList>
              <SignOptions />
            </CommandList>
          </Command>
        </Hoverdrop>
      </PopoverContent>
    </Popover>
  );
};

type NotAuthedContentProps = {
  onSelect: (item: ItemVal) => () => void;
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
              <Item key={item.value} onSelect={onSelect(item)}>
                <IconContainer>
                  <Sqc strokeWidth={0} />
                  <item.icon
                    strokeWidth={1}
                    className={cn(iconClass, item.style)}
                  />
                </IconContainer>
                <ItemContent label={item.label} desc={item.desc} />
                <DotIcon
                  className={cn(
                    "h-10 w-10",
                    selectedValue?.value === item.value
                      ? "text-blue-500 opacity-100"
                      : "opacity-0",
                  )}
                />
              </Item>
            </Link>
          ))}
        </CommandGroup>
      ))}
    </CommandList>
  );
};

type AuthedContentProps = {
  user: User | null | undefined;
  onSelect: (item: ItemVal) => () => void;
  selectedValue: Group | undefined;
};

export const AuthedContent = ({
  onSelect,
  selectedValue,
  user,
}: AuthedContentProps) => {
  return (
    <CommandList>
      <CommandGroup>
        <Link href="/account" role="button" aria-label="Account">
          <Item>
            <IconContainer>
              <Sqc strokeWidth={0} />
              <UserCircle
                strokeWidth={1}
                className={cn(
                  iconClass,
                  `fill-zap/20 stroke-blue-600 group-hover:fill-sky-400/30 group-hover:stroke-indigo-800`,
                )}
              />
            </IconContainer>
            <ItemContent label={`Account`} desc={`${user?.email}`} />
          </Item>
        </Link>
      </CommandGroup>
      <CommandSeparator />

      {groups.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className="group">
              <Item key={item.value} onSelect={onSelect(item)}>
                <IconContainer>
                  <Sqc strokeWidth={0} />
                  <item.icon
                    strokeWidth={1}
                    className={cn(
                      item.style,
                      iconClass,
                      selectedValue?.value === item.value
                        ? item.style
                        : "text-blue-600",
                    )}
                  />
                </IconContainer>
                <ItemContent label={item.label} desc={item.desc} />
                <DotIcon
                  className={cn(
                    "h-10 w-10",
                    selectedValue?.value === item.value
                      ? "text-blue-500 opacity-100"
                      : "opacity-0",
                  )}
                />
              </Item>
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

export const ItemContent = ({ label, desc }: ItemContentProps) => {
  return (
    <div className="flex flex-col justify-center">
      <Label>{label}</Label>
      <Subtext>{desc}</Subtext>
    </div>
  );
};

const Item = tw(CommandItem)`
  h-[50px] space-x-2 w-full relative z-50
  group-hover:text-void
  `;
const Label = tw.p`
  font-sans text-sm font-semibold tracking-tighter whitespace-nowrap
  `;
export const Subtext = tw.p`
  text-[11px] leading-[12px] text-clay w-full
  overflow-x-scroll whitespace-nowrap
  `;

const IconContainer = tw.div`
  size-[46px] flex items-center justify-center
  `;
const Sqc = tw(SquircleIcon)`
  absolute size-[46px] fill-ash/30
  transition-colors duration-200 ease-in
  group-hover:fill-ash/80
  `;
export const iconClass = `
  size-[20px] absolute
  transition-all duration-200
  group-hover:scale-[108%]
  fill-zap/40
  `;
const LogoutItem = tw(CommandItem)`
  relative z-50 h-[50px]
  mx-2 mb-3.5 mt-2 px-4
  text-coal hover:text-rose-700
  transition-colors duration-200 delay-200 ease-out
  `;
