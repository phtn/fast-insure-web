import { Avatar, AvatarFallback, AvatarImage } from "@@components/avatar";
import {
  CalendarIcon,
  CubeIcon,
  EnvelopeClosedIcon,
  FramerLogoIcon,
  GitHubLogoIcon,
  GlobeIcon,
  HomeIcon,
  InstagramLogoIcon,
  LaptopIcon,
  LinkedInLogoIcon,
  MobileIcon,
  Pencil1Icon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";
import tw from "tailwind-styled-components";
import { Input } from "./_components/input";
import { DarkTouch } from "./_components/touch";

const iconcls = `h-3.5 w-3.5 scale-0 text-blue-500 transition-all duration-500 ease-in-out group-hover:mr-2 group-hover:flex group-hover:scale-100`;

interface ILink {
  id: number;
  title: string;
  icon: ReactElement;
  href: string;
}

const iLinkData: ILink[] = [
  { id: 0, title: "Home", icon: <HomeIcon className={iconcls} />, href: "/" },
  {
    id: 1,
    title: "Products",
    icon: <CubeIcon className={iconcls} />,
    href: "/products",
  },
  {
    id: 2,
    title: "Claims",
    icon: <Pencil2Icon className={iconcls} />,
    href: "#",
  },
  {
    id: 3,
    title: "Car Loan",
    icon: <Pencil1Icon className={iconcls} />,
    href: "/carloans",
  },
  {
    id: 4,
    title: "i-Cash",
    icon: <Pencil1Icon className={iconcls} />,
    href: "#",
  },
  {
    id: 5,
    title: "Events",
    icon: <CalendarIcon className={iconcls} />,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="flex w-full flex-col justify-end bg-paper pt-[100px] md:pt-[200px]">
      <div className="px-4 pt-24">
        <div className=" container grid grid-cols-1 gap-8 md:grid-cols-5">
          <PostScript />
          <Contact />
          <Menu />
          <Social />
        </div>
        <Rights />
      </div>
    </footer>
  );
}

const PostScript = () => (
  <div className="col-span-2 flex flex-col items-center">
    <div className="mb-8 h-[48px] w-[174px]">
      <Image
        alt="FastInsure Logo"
        className="aspect-auto h-auto object-cover"
        height={48}
        src="/logo/fi_logo_v1.svg"
        width={174}
      />
    </div>
    <h2 className="mb-8 max-w-[32ch] text-center text-[14px] font-medium text-clay md:max-w-[36ch]">
      Get in-touch with us and explore our range of coverage options and
      discover how we can protect what matters most to you.
    </h2>
    <h3 className="mb-4 text-[18px] font-bold tracking-tight text-blue-950">
      Special thanks to our partner.
    </h3>
    <div className="mt-4">
      <Avatar className="mr-2 h-10 w-44">
        <AvatarImage
          src={`https://www.autoprotect.ph/img/autoprotect_logo.png`}
          alt={"AutoProtect Logo"}
          className="rounded-sm"
        />
        <AvatarFallback>AP</AvatarFallback>
      </Avatar>
    </div>
  </div>
);

const Contact = () => (
  <div className="col-span-1 my-6">
    <h3 className="mb-1 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <LaptopIcon className="mr-[8px] text-[20px] text-zinc-600" />
      Office
    </h3>
    <p className="text-[13px] tracking-wide text-coal">ServCorp PSE Building</p>
    <p className="text-[13px] tracking-wide text-coal">
      Fort Bonifacio, Taguig
    </p>
    <h3 className="mb-1 mt-5 flex items-center text-[17px] font-semibold tracking-tight text-blue-950">
      <MobileIcon className="mr-[8px] text-zinc-700" />
      Phone
    </h3>
    <p className="text-[13px] tracking-wide text-coal">+63 901-000-7040</p>
    <h3 className="mb-1 mt-5 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <EnvelopeClosedIcon className="mr-[8px] text-zinc-700/60" />
      E-mail
    </h3>
    <p className="text-[13px] tracking-wide text-coal">info@fastinsure.ph</p>
    <h3 className="mb-1 mt-5 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <GlobeIcon className="mr-[8px] text-zinc-700/60" />
      Web
    </h3>
    <p className="text-[13px] tracking-wide text-coal">https://fastinsure.ph</p>
  </div>
);

const Menu = () => (
  <div className="col-span-1 my-6 flex flex-col items-start">
    <h3 className="mb-4 text-[16px] font-bold text-blue-950">Menu</h3>
    <ul className="space-y-3 text-sm text-coal">
      {iLinkData.map((item) => (
        <LinkItem key={item.id}>
          <ILink href={item.href}>
            {item.icon}
            {item.title}
          </ILink>
        </LinkItem>
      ))}
    </ul>
  </div>
);

const Rights = () => (
  <div className="mt-[75px] flex h-[75px] w-full items-center justify-between border-t border-slate-400/80 text-coal">
    <p className="text-xs md:text-sm">
      © {new Date().getFullYear()} Fast Insure, Inc. All rights reserved.
    </p>
    <a className="mx-2 text-xs md:text-sm" href="#">
      Privacy Policy
    </a>
  </div>
);

const Social = () => (
  <div className="col-span-2 flex w-full justify-center md:col-span-1">
    <div className="flex flex-col items-center space-y-6">
      <DarkTouch size="md" className="w-[250px]">
        Get a Quote
      </DarkTouch>
      <h3 className="text-sm font-semibold md:text-base">Connect with us.</h3>
      <div className="flex space-x-8">
        <GitHubLogoIcon className="h-4 w-4 text-black" />
        <FramerLogoIcon className="h-4 w-4 text-black" />
        <InstagramLogoIcon className="h-4 w-4 text-black" />
        <LinkedInLogoIcon className="h-4 w-4 text-black" />
      </div>
      <Input
        placeholder="type your email..."
        type="email"
        className="h-[44px] w-[250px] rounded-lg border-0 bg-ash text-coal"
      />
      <DarkTouch size="md" className="w-[250px]">
        Get our Newsletter!
      </DarkTouch>
    </div>
  </div>
);

const ILink = tw(Link)`
  flex items-center transition-all duration-500 ease-in-out 
  group-hover:translate-x-[12px] group-hover:text-blue-950 
`;

const LinkItem = tw.li`
  group ml-[-14px] py-1 rounded-lg hover:bg-white transition-all duration-500 w-fit pr-6
`;
