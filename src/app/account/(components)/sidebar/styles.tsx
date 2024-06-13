import tw from "tailwind-styled-components";

export const Container = tw.div`
  h-[calc(100vh-72px)] flex justify-center w-full
  bg-gradient-to-br from-zap from-40% via-blue-400/20 to-zap to-100%
  `;

export const Aside = tw.aside`
  lg:h-full lg:w-1/6 lg:bg-zap/0
  lg:border-r-[0.33px] z-50 border-ash bg-ghost
  lg:border-b-[0px] md:border-b-[0.33px] portrait:bg-gradient-to-br portrait:from-paper portrait:to-stone-400/50 portrait:w-screen
  border-b-[0.33px] bg-paper
  `;

export const ContentWrap = tw.div`
  flex h-full flex-col md:space-x-2 lg:flex-row lg:space-x-6
  `;

export const BodyWrap = tw.div`
  flex-1 space-y-3 px-4 py-[0px] md:px-0
  portrait:p-0 portrait:space-y-0
  `;

export const GreetWrap = tw.div`
  hidden items-center
  text-[12px] text-clay tracking-tight font-medium
  lg:h-[32px]
  `;

export const GroupContainer = tw.div`
  flex overflow-x-scroll px-2

  md:space-x-8 md:px-24
  lg:flex-col lg:space-x-0 lg:space-y-2 lg:px-6
  portrait:space-x-4
  `;

export const GroupItem = tw.div`
  flex w-full space-x-2 portrait:space-x-0
  font-sans font-medium text-clay tracking-tighter
  transition-colors duration-200 delay-200 ease-in
  hover:text-blue-500
  relative z-50
  `;

export const ItemContent = tw.div`
  flex h-[46px] w-full items-center
  `;

export const IconContainer = tw.div`
  flex items-center justify-center h-[46px] w-[46px]
  `;

export const iconClass = `
  md:size-[20px] size-[18px]
  group-hover:scale-[120%]
  transition-transform duration-200 delay-200 ease-out
  `;
export const activeStyle = `
  text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500
  `;
