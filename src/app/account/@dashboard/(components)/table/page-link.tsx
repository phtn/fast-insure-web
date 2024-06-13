import { type ReactNode } from "react";

export type PageLinkProps = {
  children: ReactNode;
  id: string | undefined;
  page: string;
};

export const PageLink = (props: PageLinkProps) => {
  return (
    <div className="flex w-full justify-center md:active:scale-[95%]">
      <div className="h-fit w-fit rounded-lg bg-white p-1 shadow-neutral-200 group-hover:shadow-md">
        {props.children}
      </div>
    </div>
  );
};
