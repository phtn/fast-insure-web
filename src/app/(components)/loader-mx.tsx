import {
  ArrowsPointingOutIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

export const LoaderMX3 = (props: { text?: string }) => (
  <div className="flex h-[200px] w-full items-center justify-center space-x-4">
    <div className="flex items-center">
      <div className="font-mono text-xs font-medium tracking-tight text-neutral-400">
        <p className="animate-fade-left bg-gradient-to-r from-neutral-400 to-sky-800/50 bg-clip-text text-transparent animate-duration-500">
          {props.text ?? "Refreshing"}
        </p>
      </div>
      <div className="relative flex size-10 animate-fade-right items-center justify-center">
        <ArrowsPointingOutIcon className="absolute size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
        <div className="absolute animate-pulse">
          <ArrowTrendingUpIcon className="size-[18px] animate-spin stroke-1 text-amber-400/50 animate-duration-1000" />
        </div>
        <div className="absolute">
          <BoltIcon className="size-[16px] animate-spin stroke-1 text-white animate-duration-2000" />
        </div>
        <div className="absolute animate-pulse">
          <ArrowTrendingUpIcon className="size-[16px] animate-spin stroke-1 text-amber-400 animate-duration-3000" />
        </div>
        <div className="absolute animate-pulse">
          <ArrowTrendingUpIcon className="size-[14px] animate-spin stroke-1 text-teal-400 animate-duration-700" />
        </div>
        <div className="absolute rotate-45">
          <ArrowsPointingOutIcon className="size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
        </div>

        <BoltIcon className="absolute size-[60px] animate-spin stroke-1 text-white blur-lg  animate-duration-2000" />
      </div>
    </div>
  </div>
);

export const LoaderMX2 = () => (
  <div className="relative flex size-10 animate-fade-up items-center justify-center">
    <ArrowsPointingOutIcon className="absolute size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[18px] animate-spin stroke-1 text-amber-400/50 animate-duration-1000" />
    </div>
    <div className="absolute">
      <BoltIcon className="size-[16px] animate-spin stroke-1 text-white animate-duration-2000" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[16px] animate-spin stroke-1 text-amber-400 animate-duration-3000" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[14px] animate-spin stroke-1 text-teal-400 animate-duration-700" />
    </div>
    <div className="absolute rotate-45">
      <ArrowsPointingOutIcon className="size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
    </div>

    <BoltIcon className="absolute size-[60px] animate-spin stroke-1 text-white blur-lg  animate-duration-2000" />
  </div>
);

export const LoaderMX4 = () => (
  <div className="relative flex size-10 animate-fade-right items-center justify-center">
    <ArrowsPointingOutIcon className="absolute size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[18px] animate-spin stroke-1 text-amber-400/50 animate-duration-1000" />
    </div>
    <div className="absolute">
      <BoltIcon className="size-[16px] animate-spin stroke-1 text-white animate-duration-2000" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[16px] animate-spin stroke-1 text-amber-400 animate-duration-3000" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[14px] animate-spin stroke-1 text-teal-400 animate-duration-700" />
    </div>
    <div className="absolute rotate-45">
      <ArrowsPointingOutIcon className="size-[16px] animate-spin stroke-1 text-dyan animate-duration-5000" />
    </div>

    <BoltIcon className="absolute size-[60px] animate-spin stroke-1 text-white blur-lg  animate-duration-2000" />
  </div>
);

const LoaderMX = () => (
  <div className="flex h-[200px] w-full items-center justify-center space-x-4">
    <div className="flex items-center">
      <LoaderMX4 />
    </div>
  </div>
);

export default LoaderMX;
