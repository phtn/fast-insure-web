import { Avatar, AvatarFallback, AvatarImage } from "@@components/avatar";
import { Button } from "@@components/button";
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
    <footer className="flex flex-col md:pt-[200px] pt-[100px] justify-end bg-orange-50">
      <div className="container px-4 pt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
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
    <div className="mb-8">
      <Image
        alt="FastInsure Logo"
        className="h-[48px] w-[174px]"
        height="60"
        src="/logo/fi_logo_v1.svg"
        style={{
          aspectRatio: "60/60",
          objectFit: "cover",
        }}
        width="60"
      />
    </div>
    <h2 className="mb-8 max-w-[32ch] text-center md:max-w-[36ch] text-[14px] font-medium text-zinc-500">
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
)

const Contact = () => (
  <div className="col-span-1 my-6">
    <h3 className="mb-1 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <LaptopIcon className="mr-[8px] text-[20px] text-zinc-600" />
      Office
    </h3>
    <p className="text-[13px] tracking-wide text-neutral-500">
      ServCorp PSE Building
    </p>
    <p className="text-[13px] tracking-wide text-neutral-500">
      Fort Bonifacio, Taguig
    </p>
    <h3 className="mb-1 mt-5 flex items-center text-[17px] font-semibold tracking-tight text-blue-950">
      <MobileIcon className="mr-[8px] text-zinc-700" />
      Phone
    </h3>
    <p className="text-[13px] tracking-wide text-neutral-500">
      +63 901-000-7040
    </p>
    <h3 className="mb-1 mt-5 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <EnvelopeClosedIcon className="mr-[8px] text-zinc-700/60" />
      E-mail
    </h3>
    <p className="text-[13px] tracking-wide text-zinc-500">
      info@fastinsure.ph
    </p>
    <h3 className="mb-1 mt-5 flex items-center text-[16px] font-bold tracking-tight text-blue-950">
      <GlobeIcon className="mr-[8px] text-zinc-700/60" />
      Web
    </h3>
    <p className="text-[13px] tracking-wide text-zinc-500">
      https://fastinsure.ph
    </p>
  </div>
)

const Menu = () => (
  <div className="col-span-1 my-6 flex flex-col items-start">
    <h3 className="mb-4 text-[16px] font-bold text-blue-950">
      Menu
    </h3>
    <ul className="space-y-3 text-sm text-zinc-700">
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
)

const Rights = () => (
  <div className="mt-[75px] flex h-[75px] items-center justify-between border-t border-slate-400/80 text-zinc-500">
    <p className="text-xs md:text-sm">
      © {new Date().getFullYear()} Fast Insure, Inc. All rights reserved.
    </p>
    <a className="mx-2 text-xs md:text-sm" href="#">
      Privacy Policy
    </a>
  </div>
)

const Social = () => (
  <div className="flex w-full col-span-2 md:col-span-1 justify-center">
    <div className="flex flex-col items-center">
      <Button variant='outline' size='lg' className="mb-8 inline-flex rounded-lg w-[250px] items-center">
        Get a Quote
      </Button>
      <h3 className="mb-4 text-sm font-semibold md:text-base">
        Connect with us.
      </h3>
      <div className="mb-8 flex space-x-8">
        <GitHubLogoIcon className="h-4 w-4 text-black" />
        <FramerLogoIcon className="h-4 w-4 text-black" />
        <InstagramLogoIcon className="h-4 w-4 text-black" />
        <LinkedInLogoIcon className="h-4 w-4 text-black" />
      </div>
      <Input
        placeholder="type your email..."
        type="email"
        className="w-[250px] bg-zinc-800 text-blue-50 border-0 rounded-lg h-[44px] mb-4"
      />
      <Button variant='default' size='lg' className="mb-4 w-[250px] rounded-lg">
        Get our Newsletter!
      </Button>

    </div>
  </div>
)



const ILink = tw(Link)`
  flex items-center transition-all duration-500 ease-in-out 
  group-hover:translate-x-[12px] group-hover:text-blue-950 
`;

const LinkItem = tw.li`
  group ml-[-14px] py-1 rounded-lg hover:bg-white transition-all duration-500 w-fit pr-6
`;
