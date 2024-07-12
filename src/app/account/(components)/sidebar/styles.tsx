import tw from "tailwind-styled-components";

export const Container = tw.div`
  h-full flex justify-start w-full
  bg-gradient-to-br from-zap from-40% via-blue-400/20 to-zap to-100%
  `;

export const Inner = tw.div`
  h-[calc(100vh-56px)] flex flex-col
  `;

export const Aside = tw.aside`
  lg:h-full lg:w-[250px] lg:bg-neutral-900

  portrait:bg-white portrait:border-b-[0.33px] border-neutral-300
  portrait:to-stone-400/50 portrait:w-screen
  `;

export const ContentWrap = tw.div`
  flex h-full flex-col lg:flex-row lg:space-x-0
  `;

export const BodyWrap = tw.div`
  h-full
  space-y-3 py-[0px] md:px-0
  w-[calc(100vw-230px)] overflow-clip
  portrait:p-0 portrait:space-y-0
  portrait:w-full
  `;

export const GreetWrap = tw.div`
  hidden items-center
  text-[12px] text-clay tracking-tight font-medium
  lg:h-[32px]
  `;

export const GroupContainer = tw.div`
  flex items-start overflow-x-scroll
  md:space-x-4 portrait:space-x-4
  lg:flex-col lg:space-x-0 lg:space-y-2
  `;

export const GroupItem = tw.div`
  flex w-full space-x-2 w-[210px] pl-2 rounded-lg
  relative z-50 group/item

  font-sans font-medium tracking-tighter text-sm text-sky-50/70

  portrait:space-x-0 portrait:w-fit portrait:text-xs portrait:text-dyan
  `;

export const ItemContent = tw.div`
  h-[46px] w-full flex items-center
  transition-colors duration-200 ease-in-out
  portrait:h-[36px]
  `;

export const IconContainer = tw.div`
  flex items-center justify-center h-[44px] w-[44px] portrait:h-[36px]
  `;

export const iconClass = `
  md:size-[18px] size-[18px]
  text-sky-700 group-hover:text-sky-600
  transition-colors duration-300
  `;
export const activeStyle = `
  text-sky-950
  `;
//from-cyan-600 to-blue-500
