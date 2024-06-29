import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { type AcademicCapIcon } from "@heroicons/react/24/solid";
import { type LucideIcon, ArrowRightIcon, LoaderIcon } from "lucide-react";
import type { ReactNode } from "react";
import tw from "tailwind-styled-components";

type CardProps = {
  title: string;
  description: string;
  icon: LucideIcon | typeof AcademicCapIcon;
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
      <div className="px-3 py-6">
        <div className="mb-4 flex h-full items-center space-x-2 rounded-xl bg-gradient-to-r from-void/[5%] from-20% to-transparent pl-3">
          <div className="mr-1 flex h-full items-center justify-center border-r-[0.33px] border-ghost/20 px-2">
            <props.icon
              size={36}
              className={cn(
                "",
                props.iconStyle,
                `size-6 stroke-[1.5px] text-white opacity-90`,
              )}
            />
            {props.children}
          </div>

          <div className="h-fit w-fit py-3">
            <div className="font-sans text-lg font-semibold tracking-tight">
              {props.title}
            </div>
            <div className="text-[12px] font-light">{props.description}</div>
          </div>
        </div>

        <div className="flex h-[40px] w-[200px]  items-center space-x-4 p-4">
          <Touch
            iconClass={cn(props.actionIconStyle, `text-cyan-600`)}
            className="h-[40px] tracking-normal text-cyan-600"
            onClick={onClick}
            tail={loading ? LoaderIcon : ArrowRightIcon}
            tailClass={cn(loading ? "animate-spin" : "", `text-blue-500`)}
          >
            {props.actionLabel}
          </Touch>
          <p className="whitespace-nowrap px-4 font-mono font-medium uppercase tracking-widest">
            {props.extra}
          </p>
        </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = tw.div`
  h-fit rounded-xl border-4 border-zap/50
  shadow-lg hover:scale-[101%] transition-transform duration-300 ease-out
  `;

const defaultStyle = `
  bg-gradient-to-r from-blue-200 to-cyan-200
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  `;

//
//
