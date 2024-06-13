import { XGrid } from "@@ui/grid";

export const Welcome = () => (
  <div className="h-full items-center justify-center sm:flex portrait:hidden">
    <div className="h-full w-full overflow-clip">
      <XGrid>
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-transparent from-65% to-amber-500/20">
          <div className="h-[260px] w-[260px] bg-[url('/svg/caesar_gold_v1.svg')] bg-contain bg-center bg-no-repeat opacity-70" />{" "}
          <div className="flex h-[100px]">
            <span className="bg-gradient-to-b from-blue-400 to-blue-300 bg-clip-text font-sans text-3xl font-extrabold tracking-tight text-transparent">
              Accelerate
            </span>
          </div>
          <div className=" w-[300px] max-w-[26ch] text-center">
            <span className="font-sans text-[14px] text-blue-100/70 ">
              Join Accelerate, an exclusive group of leaders, that believe in
              leading the future with forward-thinkers, innovators, and
              visionaries who are dedicated to accelerating progress through
              technology.
            </span>
          </div>
          {/* <div className="relative right-[75px] h-[5px] w-[69px] rounded-full border-0 bg-gradient-to-br from-blue-500 to-cyan-200 text-center"></div> */}
        </div>
      </XGrid>
    </div>
  </div>
);
