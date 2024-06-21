import { type ReactNode, useCallback } from "react";
import { opts } from "@/utils/helpers";
import { Hoverboard } from "@/app/(ui)/hoverboard";
import { SidebarNav } from "./navs";
import { managerItems, agentItems } from "./data";
import type { GroupItem, NavProps, SidebarProps } from "./types";
import { Aside, BodyWrap, Container, ContentWrap, Inner } from "./styles";
import Image from "next/image";

export default function Sidebar({ children, accountType }: SidebarProps) {
  const AgentOptions = useCallback(() => {
    const isAgentOne = !!accountType && accountType === "AGENT1";
    const options = opts(
      <SidebarNav groupitems={agentItems} />,
      <SidebarNav groupitems={agentItems} />,
    );
    return <>{options.get(isAgentOne)}</>;
  }, [accountType]);

  const NavOptions = useCallback(() => {
    const isManager = !!accountType && accountType === "MANAGER";
    const options = opts(
      <ManagerNav groupItems={managerItems} />,
      <AgentOptions />,
    );
    return <Nav>{options.get(isManager)}</Nav>;
  }, [accountType, AgentOptions]);

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
        <div className="h-full w-screen bg-zap/10 backdrop-blur-lg">
          <div className="h-full items-center md:block">{props.children}</div>
        </div>
        <Footer />
      </Inner>
    </Container>
  );
};

const ManagerNav = (props: { groupItems: GroupItem[] }) => {
  return (
    <div className="space-y-4">
      <SidebarNav groupitems={props.groupItems} />
    </div>
  );
};

const Nav = ({ children }: NavProps) => {
  return (
    <Aside>
      <div className="m-3.5 h-[100px] rounded-lg bg-white shadow-md"></div>
      <Hoverboard
        snapPoints={[37, 86.5, 140, 194, 286]}
        parentStyle={`lg:h-[248px] border lg:mx-4`}
        offset={200}
      >
        {children}
      </Hoverboard>
    </Aside>
  );
};

const Footer = () => (
  <div className="flex h-[36px] w-screen items-center justify-between border-t-[0.33px] border-ash px-4 text-xs text-clay">
    {/* <div>Fast Insure Technologies, Inc. &copy; {new Date().getFullYear()}</div> */}
    <div className="flex items-center space-x-2 text-[10px]">
      <Image
        alt={`fast tech logo`}
        src={`/logo/fast_tech.svg`}
        width={0}
        height={0}
        className="h-[8px] w-auto"
      />
      <p>&copy; {new Date().getFullYear()}</p>
    </div>
  </div>
);
