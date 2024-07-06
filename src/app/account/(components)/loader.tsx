import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";

export const Loader = () => (
  <div className="flex h-[300px] items-center justify-center space-x-4">
    <p className="text-md font-sans font-medium tracking-tighter text-clay">
      Updating
    </p>
    <ViewfinderCircleIcon
      strokeWidth={1}
      className="size-8 animate-spin text-indigo-500 opacity-80"
    />
  </div>
);
