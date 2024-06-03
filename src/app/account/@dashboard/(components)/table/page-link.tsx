import { type ReactNode } from "react";

export type PageLinkProps = {
  children: ReactNode;
  id: string | undefined;
  page: string;
};

export const PageLink = (props: PageLinkProps) => {
  return (
    <div className="flex w-full justify-center md:active:scale-[95%]">
      <div className="h-fit w-fit rounded-lg border-[0.33px] border-gray-300 bg-ash/30 p-1 shadow-neutral-200 group-hover:border-sky-600 group-hover:bg-white group-hover:shadow-sm">
        {props.children}
      </div>
    </div>
  );
};
