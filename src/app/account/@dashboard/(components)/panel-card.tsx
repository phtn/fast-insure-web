import type { ClassName, DualIcon } from "@/app/types.index";
import type { ReactNode } from "react";

export const PanelCard = (props: {
  title: string;
  tag?: string;
  icon: DualIcon;
  className?: ClassName;
  children?: ReactNode;
}) => {
  return (
    <div className="flex h-[130px] flex-col rounded-xl border-[0.33px] border-neutral-400 bg-zap p-4 text-coal shadow-lg">
      <div className="flex h-full w-full justify-between">
        <div>
          <div className="leading-2 font-medium tracking-tight text-neutral-800">
            {props.title}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-tight text-neutral-400">
            {props.tag}
          </div>
        </div>
        <div>
          <props.icon className="size-6 stroke-1 text-neutral-500" />
        </div>
      </div>

      {props.children}
    </div>
  );
};

export const PanelContent = (props: {
  metricValue: string | number | undefined;
  metricKey?: string | undefined;
}) => {
  return (
    <div className="flex w-full items-center justify-end self-baseline text-2xl font-semibold tracking-tight">
      <div className="flex w-full flex-col items-end">
        <div className="animate-jump-in">{props.metricValue}</div>
        <div className="text-xs font-light opacity-80">{props.metricKey}</div>
      </div>
    </div>
  );
};
