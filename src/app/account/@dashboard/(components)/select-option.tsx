import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(ui)/select";
import { type LucideIcon } from "lucide-react";
import {
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { InputLabel } from "./input-label";
import { cn } from "@/utils/cn";

type SelectOptionBase = {
  value: string;
  display: string;
  disabled: boolean;
};

export type SelectOptionType = {
  label: string;
  complete: string;
  value: string;
  disabled: boolean;
  url?: string;
  hot?: boolean;
};

type SelectFieldProps<T> = {
  title: string;
  label: string;
  icon: LucideIcon;
  loading: boolean;
  options: SelectOptionType[];
  onValueChange: Dispatch<SetStateAction<T>>;
  transformer: (list: SelectOptionType[]) => SelectOptionBase[] | undefined;
  position: "top" | "mid" | "bottom" | "single";
  extra?: React.ReactElement | string;
  placeholder?: string;
};

export const SelectOption = <T,>(props: SelectFieldProps<T>) => {
  const { onValueChange, options, label, loading, transformer, position } =
    props;
  const Container = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <>
          {position === "top" ? (
            <TopSelect>{children}</TopSelect>
          ) : position === "mid" ? (
            <MidSelect>{children}</MidSelect>
          ) : position === "single" ? (
            <SingleSelect>{children}</SingleSelect>
          ) : (
            <BottomSelect>{children}</BottomSelect>
          )}
        </>
      );
    },
    [position],
  );

  const parsedList = transformer(options);

  const onChange = (value: string) => {
    onValueChange(value as T);
  };
  return (
    <Select onValueChange={onChange}>
      <Container>
        <SelectTrigger
          className="h-full bg-transparent"
          caretLoading={loading}
          caretStyle="portrait:w-10 w-12 stroke-1 opacity-100 text-ghost"
        >
          <props.icon
            className="size-5 w-[40px] text-ghost portrait:w-[44px]"
            strokeWidth={1.5}
          />

          <div className="flex h-[64px] w-full flex-col items-start bg-white">
            <InputLabel label={label} />
            <div className="text-dyan flex h-full w-full items-center justify-between px-3 text-[15px] font-medium">
              <SelectValue className="text-xs" />
            </div>
          </div>
        </SelectTrigger>
      </Container>
      <Content>
        <SelectGroup>
          {parsedList?.map((option, i) => (
            <StyledItem
              className={cn(
                i === 0
                  ? `text-sky-300`
                  : option.disabled
                    ? `text-gray-200`
                    : `text-cyan-100`,
              )}
              key={option.value}
              disabled={option.disabled}
              value={option.value}
            >
              <ItemDisplay display={option.display} />
            </StyledItem>
          ))}
        </SelectGroup>
      </Content>
    </Select>
  );
};

const ItemDisplay = ({ display }: { display: string }) => {
  const split = display.split("@");
  return (
    <div className="flex w-full items-center space-x-4 portrait:space-x-2">
      {split[2] ? (
        <Image
          width={0}
          height={0}
          src={`${split[2] ?? ""}`}
          alt={`${split[0]}`}
          className="size-5"
          style={{ width: 24, height: "auto" }}
        />
      ) : null}
      <div className="py-1 text-[16px] font-semibold portrait:text-[14px]">
        {split[0]}
      </div>
      <div className="text-[13px] font-light portrait:text-[12px]">
        {split[1]}
      </div>
    </div>
  );
};

// from-cyan-200 via-orange-50
const Content = tw(SelectContent)`
  border-[0.33px] border-dyan/20 -ml-[0.5px]
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-800 via-zinc-700/50 to-yello-500 backdrop-blur-lg
  `;
const StyledItem = tw(SelectItem)`
  flex h-[64px] px-4 portrait:px-2 w-full cursor-pointer
  font-sans font-medium tracking-tight text-zap
  transition-colors duration-300 ease-out
  hover:bg-zap/10
  `;

const TopSelect = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  border-coal/40
  border-[0.33px] border-copper/40
  rounded-lg rounded-b-none
  `;
const MidSelect = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  border-[0.33px] border-coal/40
  border-b-coal/40 border-t-0
  rounded-none
  `;
const BottomSelect = tw.div`
  flex h-[64px] w-full items-center overflow-clip
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  border-[0.33px] border-coal/40
  rounded-lg rounded-t-none
  border-t-0
  `;

const SingleSelect = tw.div`
  flex h-[64px] overflow-clip
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  border-[0.33px] border-coal/40 rounded-lg

  `;
