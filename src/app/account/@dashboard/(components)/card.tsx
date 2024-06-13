import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { type LucideIcon, ArrowRightIcon, LoaderIcon } from "lucide-react";
import type { ReactNode } from "react";
import tw from "tailwind-styled-components";

type CardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconStyle?: string;
  actionIcon?: LucideIcon;
  actionIconStyle?: string;
  actionLabel: string;
  onClick: () => void;
  style?: string;
  extra?: string;
  value?: number | string | undefined;
  loading?: boolean;
  children?: ReactNode;
};
export const Card = (props: CardProps) => {
  const { loading, onClick } = props;
  return (
    <CardContainer className={cn(props.style ?? defaultStyle)}>
      <div className="px-2 py-6">
        <div className="mb-4 flex h-full items-center space-x-2 rounded-xl bg-gradient-to-r from-void/5 to-transparent pl-3">
          <div className="mr-1 flex h-full items-center justify-center border-r-[0.33px] border-ghost/20 px-2">
            <props.icon
              size={36}
              fill="#fafafa36"
              className={cn(
                "",
                props.iconStyle,
                `stroke-1 text-white opacity-80`,
              )}
            />
            {props.children}
          </div>

          <div className="h-fit w-fit py-3">
            <div className="font-sans text-lg font-semibold tracking-tight">
              {props.title}
            </div>
            <div className="text-[14px] font-light opacity-80">
              {props.description}
            </div>
          </div>
        </div>

        <div className="flex h-[40px] items-center space-x-4 p-4">
          <Touch
            iconClass={props.actionIconStyle}
            className="h-[36px]"
            onClick={onClick}
            tail={loading ? LoaderIcon : ArrowRightIcon}
            tailClass={cn(loading ? "animate-spin" : "", `text-blue-500`)}
          >
            {props.actionLabel}
          </Touch>
          <p className="px-4 font-mono font-medium uppercase tracking-widest">
            {props.extra}
          </p>
        </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = tw.div`
  overflow-clip rounded-lg border-[0.33px] border-clay/50 xl:pr-[2px]
  shadow-md
  `;

const defaultStyle = `
  bg-gradient-to-r from-blue-200 to-cyan-200
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  `;

//
//
