import { type ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  info?: string;
  children?: ReactNode;
};

export const Jumbotron = (props: Props) => {
  const { title, info, description, children } = props;
  return (
    <div className="w-full md:py-24 py-16 lg:py-32">
      <div className="px-8 md:px-24">
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter text-blue-50 underline decoration-blue-300 underline-offset-[8px] sm:text-4xl md:text-5xl md:underline-offset-[12px] lg:text-6xl/none">
              {title}
            </h1>
            <p className="mx-auto text-[16px] text-orange-100 font-medium md:text-xl">
              {description}
            </p>
            <p className="text-left text-[14px] text-slate-300 md:max-w-[48ch] md:text-[16px] dark:md:text-gray-200/80 dark:text-gray-300">
              {info}
            </p>
          </div>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

