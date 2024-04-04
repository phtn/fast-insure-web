import { Disc3Icon } from "lucide-react";

export const Loader = () => (
  <div className="flex h-[calc(100vh-108px)] items-center justify-center">
    <Disc3Icon strokeWidth={1.5} className="h-8 w-8 animate-spin text-clay" />
  </div>
);
