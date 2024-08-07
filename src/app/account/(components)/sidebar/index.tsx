import { type ReactNode, useCallback } from "react";
import { opts } from "@/utils/helpers";
import { Hoverboard } from "@/app/(ui)/hoverboard";
import { SidebarNav } from "./navs";
import { managerItems, agentItems, activationItems } from "./data";
import type {
  GroupItem,
  NavProps,
  ProfileCardProps,
  SidebarProps,
} from "./types";
import { Aside, BodyWrap, Container, ContentWrap, Inner } from "./styles";
import Image from "next/image";
import { MoreHorizontalIcon } from "lucide-react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Sidebar({
  children,
  accountType,
  profile,
}: SidebarProps) {
  const AgentOptions = useCallback(() => {
    const isSetupComplete = !!profile && profile.setupComplete;
    const options = opts(
      <SidebarNav groupitems={agentItems} />,
      <SidebarNav groupitems={activationItems} />,
    );
    return <>{options.get(isSetupComplete)}</>;
  }, [profile]);

  const NavOptions = useCallback(() => {
    const isManager = !!accountType && accountType === "MANAGER";
    const options = opts(
      <ManagerNav groupitems={managerItems} />,
      <AgentOptions />,
    );
    return <Nav profile={profile}>{options.get(isManager)}</Nav>;
  }, [accountType, AgentOptions, profile]);

  return (
    <AccountPage>
      <ContentWrap>
        <NavOptions />
        <BodyWrap>{children}</BodyWrap>
      </ContentWrap>
    </AccountPage>
  );
}

const AccountPage = (props: { children: ReactNode }) => {
  return (
    <Container>
      <Inner>
        <div className="h-full w-screen">
          <div className="h-full items-center md:block">{props.children}</div>
        </div>
        <Footer />
      </Inner>
    </Container>
  );
};

const ManagerNav = (props: { groupitems: GroupItem[] }) => {
  return (
    <div>
      <SidebarNav groupitems={props.groupitems} />
    </div>
  );
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const userName = // profile?.displayName ??
    profile?.email?.substring(0, profile?.email.indexOf("@"));
  const UsernameOptions = useCallback(() => {
    const options = opts(
      <div>{userName}</div>,
      <MoreHorizontalIcon className="size-4 animate-pulse text-cyan-950" />,
    );
    return <>{options.get(!!userName)}</>;
  }, [userName]);
  const TitleOptions = useCallback(() => {
    const options = opts(
      <div>{profile?.accountType}</div>,
      <MoreHorizontalIcon className="size-3 animate-pulse text-cyan-950" />,
    );
    return <>{options.get(!!profile?.accountType)}</>;
  }, [profile?.accountType]);

  const PfpOptions = useCallback(() => {
    const withPhoto = typeof profile?.photoURL === "string";
    const options = opts(
      <PfPhoto photoURL={profile?.photoURL ?? ""} />,
      <PfPlaceholder />,
    );

    return <>{options.get(withPhoto)}</>;
  }, [profile?.photoURL]);

  return (
    <div className="relative z-50 mx-3.5 h-[100px] rounded-lg border-0 border-neutral-300 bg-gradient-to-r from-paper via-paper to-neutral-900 p-[8px] shadow-md portrait:hidden">
      <div className="flex h-[46px] w-full items-start px-1">
        <div className="flex items-center space-x-3">
          <PfpOptions />
          <div className="space-y-[0.5px]">
            <div className="font-k2d text-sm font-semibold leading-none tracking-tight text-cyan-950">
              <UsernameOptions />
            </div>
            <div className="font-jet text-[8px] font-light leading-none text-sky-950/80">
              <TitleOptions />
            </div>
          </div>
        </div>
      </div>
      <div className="grid h-[46px] w-full grid-cols-3 space-x-2 px-1">
        <Stat label="requests" value={profile?.draftCount ?? 0} />
        <Stat label="pts" value={profile?.fastPoints ?? 0} />
      </div>
    </div>
  );
};

const PfPhoto = (props: { photoURL: string }) => {
  return (
    <Image
      className="size-[28px] rounded-full"
      width={0}
      height={0}
      unoptimized
      priority
      alt="pfp"
      src={props.photoURL}
    />
  );
};
const PfPlaceholder = () => {
  return (
    <div className="flex size-[28px] items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-sky-700">
      <UserIcon className="size-[16px] text-white/70" />
    </div>
  );
};

const Stat = (props: { label: string; value: number }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <div className="flex flex-col items-start justify-center">
        <div className="animate-jump-in font-sans text-sm font-semibold leading-none tracking-tight text-cyan-950">
          {props.value}
        </div>
        <div className="font-jet text-[10px] font-light tracking-tight text-sky-950/80">
          {props.label}
        </div>
      </div>
    </div>
  );
};

const Nav = ({ children, profile }: NavProps) => {
  return (
    <Aside>
      <ProfileCard profile={profile} />

      <div className="absolute z-50 flex h-[47px] items-end px-6 py-2 text-[10px] font-medium uppercase tracking-[0.25px] text-neutral-500 portrait:hidden">
        workspace
      </div>
      <Hoverboard
        snapPoints={[86.5, 140, 193, 286]}
        parentStyle={`lg:h-[248px] lg:mx-5`}
        offset={0}
      >
        {children}
      </Hoverboard>
    </Aside>
  );
};

const Footer = () => (
  <div className="flex h-[36px] w-screen items-center justify-between border-t-[0.33px] border-ash px-4 text-xs text-clay portrait:border-t-0">
    <div className="flex items-center space-x-2 text-[10px]">
      <Image
        alt={`fast tech logo`}
        src={`/logo/fast_tech_v4.svg`}
        width={0}
        height={0}
        className="h-[8px] w-auto"
      />
      <p>&copy; {new Date().getFullYear()}</p>
    </div>
  </div>
);
