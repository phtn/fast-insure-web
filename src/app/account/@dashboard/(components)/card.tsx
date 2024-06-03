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
      <div className="p-6">
        <div className="flex items-center justify-between">
          <props.icon size={24} className={cn("", props.iconStyle)} />
          {props.children}
        </div>
        <div className="mb-12 mt-6 h-fit w-fit rounded-xl bg-gradient-to-r from-void/5 to-transparent p-3">
          <div className="font-sans text-lg font-semibold tracking-tight">
            {props.title}
          </div>
          <div className="text-[14px] font-light opacity-80">
            {props.description}
          </div>
        </div>
        <div className="flex h-[40px] items-center space-x-4">
          <Touch
            iconClass={props.actionIconStyle}
            className="h-[36px] rounded-sm"
            onClick={onClick}
            tail={loading ? LoaderIcon : ArrowRightIcon}
            tailClass={cn(loading ? "animate-spin" : "", `text-blue-500`)}
          >
            {props.actionLabel}
          </Touch>
          <p className="px-4 font-mono font-medium uppercase tracking-wide">
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
