import { HistoryIcon } from "lucide-react";

export const Recents = () => {
  return (
    <div className="flex h-full w-full border-t-[0.33px] border-dyan/20  bg-gradient-to-b from-white via-white to-transparent py-5">
      <div className="h-[calc(100vh-230px)]">
        <div className="flex items-center space-x-2 px-5 text-neutral-500">
          <HistoryIcon className="size-5 stroke-1" />
          <p className="font-medium tracking-tight">Recents</p>
        </div>
        <div className="w-full overflow-auto"></div>
      </div>
    </div>
  );
};
