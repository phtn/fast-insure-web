import { cn } from "@/utils/cn";
import { basedOnTime } from "@/utils/helpers";
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
    <div className="flex items-center justify-center py-2">
      <div className="flex h-full w-full items-center justify-between portrait:px-2">
        <div className="flex w-full items-start space-x-3 whitespace-nowrap portrait:space-x-1.5">
          <div
            className={cn(
              `flex size-5 items-center justify-center border-[2px] border-zap text-[10px] shadow-md`,
              !extra ? `hidden` : `rounded-full font-semibold`,
              extra === "MANAGER"
                ? `bg-cyan-500 text-zap`
                : `bg-slate-200 text-slate-600`,
            )}
          >
            {extra?.substring(0, 1)}
          </div>
          <div className=" portrait:text-xs">
            <p className="text-[10px] font-light">{basedOnTime()}</p>
            <p
              className={cn(
                "font-k2d font-semibold text-coal/80",
                title.length <= 2 ? `uppercase` : `capitalize`,
              )}
            >
              {title}
            </p>
          </div>
        </div>
        {children}
      </div>
      {description}
      <div className="my-2 h-[0px] bg-ash" />
    </div>
  );
};
