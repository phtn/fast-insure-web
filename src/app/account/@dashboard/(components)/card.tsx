import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { type LucideIcon, Disc3Icon } from "lucide-react";
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
  onClickCrypto: () => void;
  trigger?: ReactElement;
  value?: number | string | undefined;
  loading?: boolean;
};
export const Card = (props: CardProps) => {
  const {
    title,
    iconStyle,
    actionIconStyle,
    actionLabel,
    description,
    onClick,
    onClickCrypto,
    value,
    loading,
    trigger,
  } = props;
  return (
    <CardContainer>
      <div className="bg-[url('/svg/dots.svg')] bg-cover p-6">
        <div className="flex items-center justify-between">
          <props.icon size={24} className={cn("text-prime", iconStyle)} />
          <p className="rounded-lg bg-ash/30 px-2 py-1 font-sans text-2xl font-thin tracking-tight text-prime">
            ₱ <span className=" font-semibold">{value}</span>
          </p>
        </div>
        <div className="text-md mt-6 font-sans font-semibold tracking-tighter text-coal">
          {title}
        </div>
        <div className="mb-12 text-[14px] font-light text-gray-500">
          {description}
        </div>
        <div className="flex h-[40px] items-center space-x-4">
          {/* <Touch
            iconClass={actionIconStyle}
            size={"sm"}
            className="h-[32px]"
            onClick={onClick}
            tail={Disc3Icon}
            tailClass={loading ? "animate-spin" : "size-0 hidden"}
          >
            {actionLabel}
          </Touch> */}
          {trigger}
          <Touch
            iconClass={actionIconStyle}
            size={"sm"}
            className="h-[32px]"
            onClick={onClickCrypto}
            tail={Disc3Icon}
            tailClass={loading ? "animate-spin" : "size-0 hidden"}
          >
            {actionLabel} with Crypto
          </Touch>
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
