import tw from "tailwind-styled-components";

export const Welcome = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-clip border-t-[0.33px] border-neutral-300 sm:flex portrait:hidden">
      <Polaris />

      <div className="z-40 flex h-full w-full items-center justify-center border-0 border-pink-400 bg-white/15 px-4 backdrop-blur-xl">
        <div className="relative ml-6 h-3/5 w-full space-y-8">
          <Slogan />
          <MemberCard />
        </div>
      </div>
    </div>
  );
};

const Slogan = () => (
  <div className="flex w-3/4 justify-center">
    <span className="-rotate-1 bg-gradient-to-b from-dyan to-fast bg-clip-text font-sans text-lg font-medium tracking-tight text-transparent">
      Accelerate. Business. Growth.
    </span>
  </div>
);

const Polaris = () => (
  <div className="absolute h-3/4 w-3/4 justify-end border-[0.33px]">
    <div className="h-120 w-64 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300" />
    <div className="h-96 w-64 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300" />
    <div className="h-120 w-72 rotate-45 rounded-full border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-200/80" />
  </div>
);

const MemberCard = () => (
  <CardContainer>
    <CardInner>
      <div className=" flex h-full flex-col justify-between">
        <div className="flex h-[100px] items-center justify-between">
          <p></p>
          <div className="h-[80px] w-[80px] bg-[url('/svg/caesar_v2.svg')] bg-contain bg-no-repeat" />
        </div>
        <div className="flex h-[50px] w-[50px] items-end justify-center rounded-md">
          <span className="font-thin tracking-widest text-blue-300">02</span>
        </div>
      </div>
    </CardInner>
  </CardContainer>
);

const CardContainer = tw.div`
      rotate-[3deg] rounded-[12px] w-fit
      shadow-lg shadow-neutral-500 transition-all duration-700
      hover:rotate-[0deg] hover:scale-110 hover:cursor-pointer hover:shadow-xl hover:drop-shadow-xl
      `;
const CardInner = tw.div`
      group px-10 rounded-[12px] border-b-[2px] border-r-[2px] border-zinc-400/90
      // bg-[url('/svg/print_v2.svg')] bg-cover bg-bottom object-fit
      transition-all duration-700 w-[375px]
      pt-6 pb-9 h-[250px]
      bg-dyan brightness-80
      `;
