import { type ReactNode } from "react";

export function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="h-fit w-full dark:bg-black bg-blue-950 dark:bg-dot-white/[0.2] bg-dot-[#3b82f6]/[0.5] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-blue-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}

