import { useCallback, type ReactNode } from "react";
import { SidebarAffiliate, SidebarUser } from "./sidebar-nav";
import tw from "tailwind-styled-components";
import { opts } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/(ui)/breadcrumb";
import { Hoverboard } from "@/app/(ui)/hoverboard";

type SidebarProps = {
  children: ReactNode;
  isAffiliate: boolean;
};
export default function Sidebar({ children, isAffiliate }: SidebarProps) {
  const SidebarOptions = useCallback(() => {
    const options = opts(<SidebarAffiliate />, <SidebarUser />);
    return <>{options.get(isAffiliate)}</>;
  }, [isAffiliate]);

  const pathname = usePathname();

  const crumb = pathname.slice(1);
  return (
    <Container>
      <div className="flex h-[calc(100vh-72px)] w-full flex-col place-items-center">
        <div className="h-full w-[1080px] bg-zap/10 backdrop-blur-lg md:min-w-[1080px] portrait:w-screen">
          <div className="h-full items-center md:block">
            <div className="flex h-full flex-col space-y-0 md:space-x-2 lg:flex-row lg:space-x-6">
              <SidebarNav>
                <SidebarOptions />
              </SidebarNav>
              <div className="flex-1 space-y-3 px-4 py-[0px] md:px-0">
                <div className="hidden items-center text-[12px] tracking-tight text-clay/80 md:flex lg:h-[42px]">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={pathname} className="capitalize">
                          {crumb === `account` ? `autos` : crumb}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
}

type SidebarNavProps = {
  children: ReactNode;
};
const SidebarNav = ({ children }: SidebarNavProps) => {
  return (
    <Aside>
      <Hoverboard
        snapPoints={[47, 102, 148, 194, 286]}
        parentStyle={`md:h-[248px] md:mx-3`}
        offset={80}
      >
        {children}
      </Hoverboard>
    </Aside>
  );
};

const Footer = () => (
  <div className="flex h-[36px] w-screen items-center justify-between border-t-[0.33px] border-ash px-4 text-xs text-clay">
    <div>Fast Insure Inc &copy; {new Date().getFullYear()}</div>
  </div>
);

const Aside = tw.aside`
  lg:h-full md:border-r-[0.33px] z-50 border-ash lg:w-1/6
  portrait:border-b-[0.33px] portrait:bg-paper portrait:w-screen
  `;

const Container = tw.div`
  h-[calc(100vh-72px)] flex justify-center w-full
  bg-gradient-to-br from-zap from-40% via-blue-400/20 to-zap to-100%
  `;
