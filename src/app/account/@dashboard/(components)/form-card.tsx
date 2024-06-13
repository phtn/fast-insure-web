import { cn } from "@/utils/cn";
import { type LucideIcon, Disc3Icon } from "lucide-react";
import { useCallback, type ReactElement, type ReactNode } from "react";
import tw from "tailwind-styled-components";

type CardProps = {
  title?: string;
  description?: string;
  extra?: string | ReactElement;
  icon: LucideIcon;
  iconStyle?: string;
  actionIcon?: LucideIcon;
  onClick?: () => void;
  loading?: boolean;
  children?: ReactNode;
  route: string;
};

// const skyCardStyle = `from-sky-100/90 via-sky-50/95 to-sky-50 h-full w-full`;
const blueCardStyle = `from-teal-200 via-pink-100 to-sky-50 h-full w-full`;
// const pinkCardStyle = `from-indigo-100/90 via-rose-50 to-sky-50 h-full w-full`;
const defaultCardStyle = `from-cyan-50/90 via-slate-100 to-sky-50 h-full w-full`;
const greyCardStyle = `from-slate-100/90 via-gray-100 to-sky-50 h-full w-full`;
const emeraldCardStyle = `from-teal-100 via-blue-100/90 to-sky-50 h-full w-full`;
const lightCardStyle = `from-pink-300 via-yellow-100/90 to-green-100 h-full w-full`;

export const FormCard = (props: CardProps) => {
  const { title, extra, iconStyle, onClick, loading, children, route } = props;

  const themeSelector = useCallback(() => {
    if (route === "vehicle") {
      return lightCardStyle;
    } else if (route === "assured") {
      return emeraldCardStyle;
    } else if (route === "files") {
      return blueCardStyle;
    } else if (route === "upload") {
      return greyCardStyle;
    } else {
      return defaultCardStyle;
    }
  }, [route]);

  return (
    <Cape onClick={onClick}>
      <CardContainer className={themeSelector()}>
        <div className="space-y-4 p-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-3 portrait:space-x-2">
              {loading ? (
                <Disc3Icon
                  strokeWidth={1.5}
                  className="animate-spin stroke-1 text-void/80"
                />
              ) : (
                <props.icon
                  size={18}
                  strokeWidth={1.5}
                  className={cn("stroke-1 text-void", iconStyle)}
                />
              )}
              <div className="font-sans text-[16px] font-medium tracking-tighter text-coal">
                {title}
              </div>
            </div>
            <div className="flex font-mono text-xs font-medium text-void/50">
              {extra}
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </CardContainer>
    </Cape>
  );
};

export const GrayCard = ({ children }: { children: ReactNode }) => (
  <Cape>
    <CardContainer className={defaultCardStyle}>{children}</CardContainer>
  </Cape>
);

export const CustomerCard = ({ children }: { children: ReactNode }) => (
  <Cape>
    <CardContainer className={lightCardStyle}>{children}</CardContainer>
  </Cape>
);

export const GreyCard = ({ children }: { children: ReactNode }) => (
  <Cape>
    <CardContainer className={greyCardStyle}>{children}</CardContainer>
  </Cape>
);

const Cape = tw.div`
    bg-void/80 overflow-scroll
    shadow-sm shadow-slate-300
    rounded-lg portrait:rounded-none portrait:h-fit
    transition-all duration-300
    `;

const CardContainer = tw.div`
  overflow-clip xl:pr-[2px]
  portrait:h-fit
  border-clay/50 border-[0.33px]
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]

  `;
