import { type ReactNode } from "react";

type HeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/**
 * @name Header
 * @description Dashboard header component
 */
export const Header = (props: HeaderProps) => {
  const { title, description, children } = props;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-k2d text-2xl font-semibold text-coal">{title}</h1>
        {children}
      </div>
      {description}
      <div className="my-2 h-[0px] bg-ash" />
    </div>
  );
};
