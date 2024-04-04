import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { PlusIcon, type LucideIcon } from "lucide-react";
import { type ReactElement } from "react";
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
  trigger?: ReactElement;
};
export const Card = (props: CardProps) => {
  const {
    title,
    iconStyle,
    actionIconStyle,
    actionLabel,
    description,
    onClick,
    trigger,
  } = props;
  return (
    <CardContainer>
      <div className="bg-[url('/svg/dots.svg')] bg-cover p-6">
        <props.icon size={24} className={cn("text-coal", iconStyle)} />
        <div className="text-md mt-6 font-sans font-semibold tracking-tighter text-coal">
          {title}
        </div>
        <div className="mb-12 text-[14px] font-light text-gray-500">
          {description}
        </div>
        <div className="h-[40px] space-x-4">
          <div className="h-full w-fit">
            {trigger ? (
              trigger
            ) : (
              <Touch
                iconClass={actionIconStyle}
                icon={PlusIcon}
                size={"sm"}
                className="h-[32px]"
                onClick={onClick}
              >
                {actionLabel}
              </Touch>
            )}
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = tw.div`
  overflow-clip rounded-lg border-[0.33px] border-ash xl:pr-[2px]
  from-zap via-white to-sky-100
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  `;
