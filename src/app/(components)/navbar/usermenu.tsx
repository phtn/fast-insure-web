import { AuthContext } from "@/app/(context)/context";
import { Hoverdrop } from "@/app/(ui)/hoverboard";
import { auth } from "@/libs/db";
import { type UserProfileSchema } from "@/server/resource/account";
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
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {
  ArrowUpRightSquareIcon,
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
import { useRouter } from "next/navigation";
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
        href: "/account/sign-in/user",
        style: "fill-sky-400/20",
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
        href: "/account/sign-in/user",
        style: "fill-teal-400/30",
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
        style: "fill-indigo-400/30",
      },
    ],
  },
];

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "Fast Points",
        desc: ".",
        value: "2",
        icon: GiftIcon,
        href: "/#",
        style: "fill-yellow-300/50 stroke-fuchsia-800",
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
        href: "/#",
        style: "fill-emerald-300/40 stroke-emerald-900",
      },
    ],
  },
];

export const LogoutOption = () => {
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);
  const logout = () => {
    onPromise(
      signOut(),
      loading ? `Logging out...` : "",
      "signout",
      "You're logged out.",
      error,
    );
    router.push("account/sign-in/user");
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

  const profile = useContext(AuthContext)?.profile;
  const closePopover = () => setOpen(false);

  const isAuthed = !!profile && profile.userId !== undefined;
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
        profile={profile}
        open={open}
      />,
      <NotAuthedContent
        selectedValue={selectedValue}
        onSelect={handleSelect}
        open={open}
      />,
    );
    return <>{options.get(isAuthed)}</>;
  }, [selectedValue, isAuthed, open, profile]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="text-dyan/80">
          <div className="flex size-[40px] items-center justify-center overflow-clip">
            <SquircleIcon
              className={cn(
                `absolute size-[40px] fill-dyan/5 stroke-[0px] transition-colors duration-200 ease-in hover:fill-dyan/10`,
                open ? `fill-dyan/15` : ``,
              )}
            />
            <ChevronUpIcon
              className={cn(
                `pointer-events-none absolute size-[16px] scale-0 transition-transform duration-300 ease-out`,
                open ? `scale-[100%]` : ``,
              )}
            />
            <ChevronDownIcon
              className={cn(
                `pointer-events-none absolute size-[16px] scale-0 transition-transform duration-300 ease-out`,
                !open ? `scale-[100%]` : ``,
              )}
            />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="my-0 mr-2 w-[250px] p-0">
        <Hoverdrop
          parentStyle="h-[272px] bg-transparent"
          pillStyle="lg:h-[56px] w-[232px] mx-2 lg:group-hover:bg-neutral-200 rounded-xl"
          snapPoints={[
            70,
            147.5,
            isAuthed ? 214 : 213,
            isAuthed ? 280 : 279.5,
            344,
            387,
            396,
          ]}
          offset={25}
        >
          <Command className="absolute bg-transparent lg:-mt-[54px]">
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
  open: boolean;
};

const NotAuthedContent = ({
  onSelect,
  selectedValue,
  open,
}: NotAuthedContentProps) => {
  return (
    <CommandList className="bg-transparent">
      {notAuthedGroup.map((group) => (
        <CommandGroup key={group.label}>
          {group.values.map((item) => (
            <ItemMotion
              key={item.value}
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                delay: open ? (+item.value + 1) * 0.08 : 0,
              }}
              href={item.href ?? `#`}
            >
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
            </ItemMotion>
          ))}
        </CommandGroup>
      ))}
    </CommandList>
  );
};

type AuthedContentProps = {
  profile: UserProfileSchema | undefined;
  onSelect: (item: ItemVal) => () => void;
  selectedValue: Group | undefined;
  open: boolean;
};

export const AuthedContent = ({
  onSelect,
  selectedValue,
  profile,
}: AuthedContentProps) => {
  return (
    <CommandList>
      <CommandGroup>
        <Link href={`/account/overview`} role="button" aria-label="Account">
          <Item>
            <IconContainer>
              <Sqc strokeWidth={0} />
              <UserCircle
                strokeWidth={1}
                className={cn(iconClass, `fill-sky-400/30 stroke-indigo-800`)}
              />
            </IconContainer>
            <ItemContent label={`Account`} desc={`${profile?.email}`} />
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
                <ItemContent
                  label={item.label}
                  desc={
                    item.value === "2" ? `${profile?.fastPoints ?? 0} pts` : ""
                  }
                />
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
  group-hover:fill-ash/0
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

const ItemMotion = motion(Link);
