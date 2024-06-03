import { cn } from "@/utils/cn";
import { getToday } from "@/utils/helpers";
import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  extra?: string | undefined;
};

/**
 * @name Header
 * @description Dashboard header component
 */
export const Header = (props: HeaderProps) => {
  const { title, description, children, extra } = props;
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="font-k2d text-2xl font-semibold text-coal">
              {title}
            </h2>
            <p
              className={cn(
                !extra ? `hidden` : `rounded-lg px-2 py-1 text-sm font-bold`,
                extra === "MANAGER"
                  ? `bg-amber-100 text-amber-700`
                  : `bg-slate-100 text-slate-500`,
              )}
            >
              {extra?.substring(0, 1)}
            </p>
          </div>
          <p className="font-mono text-xs text-heli">{getToday()}</p>
        </div>
        {children}
      </div>
      {description}
      <div className="my-2 h-[0px] bg-ash" />
    </div>
  );
};
