import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { type LucideIcon } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconStyle?: string;
  actionIcon: LucideIcon;
  actionIconStyle?: string;
  actionLabel: string;
  onClick: () => void;
};

export const Card = (props: CardProps) => {
  const {
    title,
    iconStyle,
    actionIconStyle,
    actionLabel,
    description,
    onClick,
  } = props;
  return (
    <div className="overflow-clip rounded-lg border-[0.33px] border-ash bg-copper p-[2px]">
      <div className=" bg-[url('/svg/dots.svg')] bg-cover p-6">
        <props.icon size={24} className={cn("text-coal", iconStyle)} />
        <div className="text-md mt-6 font-medium text-coal">{title}</div>
        <div className="mb-12 text-[14px] font-light text-gray-500">
          {description}
        </div>
        <div className="h-[40px] space-x-4">
          <div className="h-full w-fit">
            <Touch
              icon={props.actionIcon}
              iconClass={actionIconStyle}
              size={"sm"}
              className="h-[32px]"
              onClick={onClick}
            >
              {actionLabel}
            </Touch>
          </div>
        </div>
      </div>
    </div>
  );
};
