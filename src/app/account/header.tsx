import { type LucideIcon } from "lucide-react";
import { createElement, type ReactElement, type ReactNode } from "react";

type HeaderProps = {
  title: string;
  description: string | ReactElement;
  icons?: LucideIcon[];
  icon?: LucideIcon;
  children?: ReactNode;
};
export const Header = (props: HeaderProps) => {
  const { title, description, icons, children } = props;

  return (
    <div className="flex items-center justify-between px-8 md:px-24 ">
      <div className="space-y-2">
        <div className="flex items-center space-x-6">
          <h2 className="text-2xl font-semibold tracking-tighter text-coal">
            {title}
          </h2>
          {props?.icon ? (
            <props.icon
              className="text-blue-500"
              strokeWidth={1}
              fill="rgba(255,255,255, 0.5)"
            />
          ) : null}
          {icons?.map((item) =>
            createElement(
              item,
              {
                strokeWidth: 1,
                fill: "rgba(255,255,255, 0.5)",
                className: `text-blue-500`,
              },
              null,
            ),
          )}
          {children}
        </div>
        <div className="text-sm text-clay">{description}</div>
      </div>
    </div>
  );
};
