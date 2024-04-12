import { Disc3Icon } from "lucide-react";

export const Loader = () => (
  <div className="flex h-[calc(100vh-108px)] items-center justify-center space-x-4">
    <p className="text-md font-sans font-medium tracking-tighter text-clay">
      Updating
    </p>
    <Disc3Icon strokeWidth={1} className="h-8 w-8 animate-spin text-clay" />
  </div>
);
