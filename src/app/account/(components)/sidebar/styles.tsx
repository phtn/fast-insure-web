import tw from "tailwind-styled-components";

export const Container = tw.div`
  h-full flex justify-start w-full
  bg-gradient-to-br from-zap from-40% via-blue-400/20 to-zap to-100%
  `;

export const Inner = tw.div`
  h-[calc(100vh-56px)] flex flex-col
  `;

export const Aside = tw.aside`
  lg:h-full lg:w-[250px] lg:bg-neutral-200

  lg:border-r-[1.0px] z-50 border-neutral-300
  border-b

  portrait:bg-gradient-to-br portrait:from-paper
  portrait:to-stone-400/50 portrait:w-screen
  `;

export const ContentWrap = tw.div`
  flex h-full flex-col lg:flex-row lg:space-x-0
  `;

export const BodyWrap = tw.div`
  space-y-3 py-[0px] md:px-0
  portrait:p-0 portrait:space-y-0
  w-[calc(100vw-230px)] overflow-clip
  h-full
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
  flex w-full space-x-2 portrait:space-x-0
  font-sans font-medium tracking-tighter text-sm text-cyan-800
  transition-colors duration-200 delay-200 ease-in
  w-[210px] pl-2 rounded-lg
  relative z-50
  `;

export const ItemContent = tw.div`
  flex h-[46px] w-full items-center
  `;

export const IconContainer = tw.div`
  flex items-center justify-center h-[44px] w-[44px]
  `;

export const iconClass = `
  md:size-[18px] size-[18px]
  group-hover:scale-[120%]
  transition-transform duration-200 ease-out
  `;
export const activeStyle = `
  text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-600
  `;
//from-cyan-600 to-blue-500
