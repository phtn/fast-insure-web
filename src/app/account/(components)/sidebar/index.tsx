import { type ReactNode, useCallback } from "react";
import { opts } from "@/utils/helpers";
import { Hoverboard } from "@/app/(ui)/hoverboard";
import { SidebarNav } from "./navs";
import { managerItems, agentItems } from "./data";
import type { NavProps, SidebarProps } from "./types";
import { Aside, BodyWrap, Container, ContentWrap, GreetWrap } from "./styles";

export default function Sidebar({
  children,
  accountType,
  profile,
}: SidebarProps) {
  const AgentOptions = useCallback(() => {
    const isAgentOne = !!accountType && accountType === "AGENT1";
    const options = opts(
      <SidebarNav groupitems={agentItems} />,
      <SidebarNav groupitems={agentItems} />,
    );
    return <>{options.get(isAgentOne)}</>;
  }, [accountType]);

  const AccountOptions = useCallback(() => {
    const isManager = !!accountType && accountType === "MANAGER";
    const options = opts(
      <SidebarNav groupitems={managerItems} />,
      <AgentOptions />,
    );
    return <>{options.get(isManager)}</>;
  }, [accountType, AgentOptions]);

  return (
    <AccountPage>
      <ContentWrap>
        <Nav>
          <AccountOptions />
        </Nav>
        <BodyWrap>
          <GreetWrap>Hello, {profile?.displayName}</GreetWrap>
          {children}
        </BodyWrap>
      </ContentWrap>
    </AccountPage>
  );
}

const AccountPage = (props: { children: ReactNode }) => {
  return (
    <Container>
      <div className="flex h-[calc(100vh-72px)] w-full flex-col place-items-center">
        <div className="h-full w-screen bg-zap/10 backdrop-blur-lg xl:w-[1080px]">
          <div className="h-full items-center md:block">{props.children}</div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

const Nav = ({ children }: NavProps) => {
  return (
    <Aside>
      <Hoverboard
        snapPoints={[37, 86.5, 140, 194, 286]}
        parentStyle={`lg:h-[248px] lg:mx-3`}
        offset={80}
      >
        {children}
      </Hoverboard>
    </Aside>
  );
};

const Footer = () => (
  <div className="flex h-[36px] w-screen items-center justify-between border-t-[0.33px] border-ash px-4 text-xs text-clay">
    <div>Fast Insure Technologies, Inc. &copy; {new Date().getFullYear()}</div>
  </div>
);
