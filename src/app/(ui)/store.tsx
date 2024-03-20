"use client";

import Image from "next/image";

type StoreProps = {
  theme?: "dark" | "light" | "system";
  url?: string;
  store: string;
  logo: string;
  title: string;
};

type StoreButtonProps = {
  onClick?: typeof Function;
} & StoreProps;

export const StoreButton = (props: StoreButtonProps) => {
  const { logo, store, title } = props;
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div
      onClick={handleClick}
      className={
        "flex w-[150px] scale-[95%] cursor-pointer items-center gap-[10px] rounded-[10px] border-[0.5px] border-blue-200/50 bg-slate-900 px-[10px] py-[10px] transition-all duration-300 md:w-fit md:px-[14px] md:hover:scale-[95%]"
      }
    >
      <Image
        src={logo}
        alt={store}
        width={100}
        height={100}
        className="h-auto w-[16px] md:w-auto"
      />
      <div className="font-outfit flex flex-col items-start">
        <span className="text-[10px] md:text-[10px]">{title}</span>
        <span className="text-[14px] font-bold md:text-[16px]">{store}</span>
      </div>
    </div>
  );
};

export const PlayStore = () => (
  <StoreButton
    logo="/stores/playstore.svg"
    title="GET IT ON"
    store="Google Play"
  />
);

export const AppStore = () => (
  <StoreButton
    logo="/stores/appstore_light.svg"
    title="Download on the"
    store="App Store"
  />
);

export const AppGallery = () => (
  <StoreButton
    logo="/stores/appgallery.svg"
    title="EXPLORE IT ON"
    store="AppGallery"
  />
);
