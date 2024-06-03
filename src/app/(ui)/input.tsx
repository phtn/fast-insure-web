import * as React from "react";

import { cn } from "@@utils/cn";
import {
  AtSignIcon,
  BanknoteIcon,
  CoinsIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LockKeyholeIcon,
  type LucideIcon,
  SmartphoneIcon,
  SquareUserIcon,
  UploadCloudIcon,
  UserCircle2Icon,
  ArrowDownLeftIcon,
} from "lucide-react";
import { InputLabel } from "../account/@dashboard/(components)/input-label";
import tw from "tailwind-styled-components";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border border-slate-400 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// MODERN INPUT
//
export type IconName =
  | "user"
  | "name"
  | "file"
  | "reader"
  | "email"
  | "mobile"
  | "money"
  | "tokens"
  | "upload"
  | "password";

interface IconPrefix {
  name: IconName;
  icon: LucideIcon;
}

export const IconPrefixes: IconPrefix[] = [
  { name: "user", icon: UserCircle2Icon },
  { name: "name", icon: SquareUserIcon },
  { name: "file", icon: FileTextIcon },
  { name: "reader", icon: FileSpreadsheetIcon },
  { name: "email", icon: AtSignIcon },
  { name: "mobile", icon: SmartphoneIcon },
  { name: "money", icon: BanknoteIcon },
  { name: "tokens", icon: CoinsIcon },
  { name: "upload", icon: UploadCloudIcon },
  { name: "password", icon: LockKeyholeIcon },
];

export const InputField = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-[56px] items-center rounded-xl border-[0.33px] border-ash bg-paper pl-3 pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1",
        className,
      )}
    >
      <props.icon className="mr-[10px] h-[16px] w-[16px] text-clay dark:text-orange-200/80" />

      <input
        {...props}
        type={type}
        ref={ref}
        className="h-[44px] w-full rounded-xl bg-transparent px-2 text-[14px] placeholder:font-sans placeholder:font-medium placeholder:tracking-tighter placeholder:text-clay/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputField.displayName = "InputField";

export const InputFieldName = React.forwardRef<
  HTMLInputElement,
  InputProps & Omit<IconPrefix, "name"> & { label: string | undefined }
>(({ className, type, label, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-16 items-center rounded-xl border-[0.0px] border-ash bg-white pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 dark:bg-indigo-200/20",
        className,
      )}
    >
      <props.icon
        className="mx-[16px] h-8 w-8 text-clay"
        strokeWidth={1}
        fill="rgba(238, 238, 238, 0.60)"
      />
      <span className="w-64 text-xs font-medium uppercase leading-none text-clay">
        {label}
      </span>

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 m-1 w-full rounded-lg border-0 border-ash bg-paper p-3 font-mono text-[15px] uppercase tracking-widest text-zinc-600 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";

export const InputFile = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-[300px] flex-col items-center justify-end rounded-lg border border-dashed border-ash bg-white shadow-inner ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1",
        className,
      )}
    >
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <props.icon
            className="mr-[16px] h-[48px] w-[48px] text-clay"
            strokeWidth={1}
          />
          <div className="text-md">
            <p className="max-w-[20ch] text-coal">
              <span className="font-semibold text-coal">Click</span> here to
              select a file or{" "}
              <span className="font-semibold text-coal">drag and drop</span> it
              here.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 pb-2 pt-24">
          <span className="text-xs italic text-clay/80">
            Supported formats:
          </span>

          <span className="py-1 text-[12px] text-clay">JPG, PNG or PDF</span>
        </div>
      </div>

      <input
        {...props}
        type={type}
        ref={ref}
        className="h-[200px] w-full py-3 text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFile.displayName = "InputFile";

const InputLight = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-[0.33px] border-ash bg-paper/50 px-3 py-2 text-xs ring-sky-400 ring-offset-sky-300 transition-all duration-300 ease-in-out placeholder:text-sky-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-1 md:focus-visible:ring-offset-1",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputLight.displayName = "InputLight";

export const InputCode = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <CodeInput type={type} className={cn(className)} ref={ref} {...props} />
  ),
);

const CodeInput = tw.input`
  flex h-14 w-full px-3 py-2 bg-[#EFEFEF]
  border-[0.33px] border-ash/30 rounded-full
  placeholder:text-neutral-400 placeholder:tracking-tight placeholder:lowercase placeholder:font-normal
  text-[16px] tracking-widest text-center font-medium font-mono
  transition-all duration-300 ease-in-out uppercase
  ring-offset-white ring-neutral-100 focus-visible:outline-none

  disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-1 md:focus-visible:ring-offset-1
  `;
InputCode.displayName = "InputCode";

export const ImageFile = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-end rounded border portrait:justify-center",
        className,
      )}
    >
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <props.icon className="text-dyan/50 size-7 stroke-[1px] portrait:size-4" />
        </div>
        <div className="flex items-center justify-center space-x-4 pb-2 pt-10 portrait:hidden portrait:pb-0">
          <span className="text-dyan/50 py-1 font-mono text-[12px] portrait:hidden portrait:py-0">
            Images or PDFs
          </span>
        </div>
      </div>

      <input
        {...props}
        type={type}
        ref={ref}
        className="flex h-[200px] w-full py-2 text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 portrait:h-[56px] portrait:py-0"
      />
    </div>
  );
});
ImageFile.displayName = "ImageFile";

type FieldProps = {
  icon?: LucideIcon;
  label?: string;
  isValid?: boolean;
};

export const InputFieldPayments = React.forwardRef<
  HTMLInputElement,
  InputProps & FieldProps
>(({ className, type, label, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-[64px] items-center overflow-clip rounded-[5px]",
        className,
      )}
    >
      <div className="">
        {props.icon ? (
          <props.icon className="text-dyan size-5 w-14" strokeWidth={1.5} />
        ) : (
          <div className="text-dyan size-5 w-14" />
        )}
      </div>
      <div className="flex h-full w-full flex-col space-y-0 bg-white/90">
        <InputLabel label={label} />

        <input
          {...props}
          type={type}
          ref={ref}
          className="text-dyan flex h-full w-full items-center border-l-[0.33px] border-ash/50 bg-white/90 px-3 pb-1.5 pt-0.5 font-sans text-[16px] tracking-tighter placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldPayments.displayName = "InputFieldPayments";

export const InputFieldAmount = React.forwardRef<
  HTMLInputElement,
  InputProps &
    FieldProps & { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
>(({ className, label, onChange, ...props }, ref) => {
  const withReq = label?.split("@") ?? ["", ""];
  return (
    <div
      className={cn(
        "flex h-[64px] items-center overflow-clip rounded-[5px]",
        className,
      )}
    >
      {props.icon ? (
        <props.icon className="text-dyan size-5 w-14" strokeWidth={1.5} />
      ) : (
        <div className="text-dyan size-5 w-14" />
      )}

      <div className="flex h-full w-full flex-col space-y-0 bg-white/90">
        <p className="text-dyan/70 flex w-full items-start justify-end whitespace-nowrap border-l-[0.33px] border-ash/50 pl-3 pt-1 font-mono text-[10px] font-normal uppercase tracking-widest">
          {withReq[0] ?? label}
          {withReq[1] ? (
            <span
              className={cn(
                withReq[1] ? "mx-2" : "",
                "flex h-fit items-end whitespace-nowrap rounded-full bg-amber-700/10 font-mono font-normal lowercase tracking-wider text-orange-600/80",
              )}
            >
              <ArrowDownLeftIcon size={14} />
            </span>
          ) : null}
        </p>
        <input
          {...props}
          ref={ref}
          type="text"
          placeholder="0.00"
          onChange={onChange}
          // className="flex h-full w-full items-center border-l-[0.33px] border-ash/50 bg-white/90 px-3 pb-1.5 pt-0.5 font-sans text-[16px] font-medium tracking-tighter text-dyan placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          className="text-dyan flex h-full w-full border-l-[0.33px] border-ash/50 px-3 text-right font-sans text-[20px] font-semibold tracking-tight placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldAmount.displayName = "InputFieldAmount";

export { Input, InputLight };
