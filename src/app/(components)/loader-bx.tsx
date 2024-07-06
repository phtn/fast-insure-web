import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";

export const LoaderBX = () => (
  <div className="animate-jump-in animate-delay-1000">
    <ViewfinderCircleIcon className="size-6 animate-spin stroke-1 text-gray-400 duration-1000" />
  </div>
);

export const LoaderBX2 = (props: { text?: string }) => (
  <div className="flex h-[200px] w-full items-center justify-center space-x-4">
    <div className="flex items-center">
      <div className="font-mono text-xs font-medium tracking-tight text-neutral-400">
        <p className="animate-fade-left bg-gradient-to-r from-neutral-500 to-neutral-400 bg-clip-text text-transparent animate-duration-500">
          {props.text ?? "Refreshing"}
        </p>
      </div>
      <div className="relative flex size-10 animate-fade-right items-center justify-center">
        <ArrowPathIcon className="absolute size-[24px] animate-spin stroke-1 text-dyan/60 animate-duration-3000" />
        <div className="absolute animate-jump-in">
          <EyeIcon className="size-[14px] animate-spin stroke-1 text-emerald-500 animate-duration-1000" />
        </div>
        <EllipsisHorizontalIcon className="absolute z-50 size-5 animate-spin stroke-[2px] text-neutral-50 animate-duration-5000" />
      </div>
    </div>
  </div>
);
