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
  FolderIcon,
} from "lucide-react";
import { InputLabel } from "../account/@dashboard/(components)/input-label";
import tw from "tailwind-styled-components";
import type { DualIcon } from "../types.index";
import {
  ArrowDownLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { opts, toggleState } from "@/utils/helpers";
import { Button } from "./button";
import { useState, useCallback } from "react";
import { TheTip } from "./just-the-tip";

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
  icon: DualIcon;
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
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => toggleState(setVisible);

  const IconOptions = useCallback(() => {
    const options = opts(
      <EyeIcon className=" size-[16px] text-cyan-600" />,
      <EyeSlashIcon className=" size-[16px]" />,
    );
    return (
      <Button
        variant={`ghost`}
        className="text-neutral-500 hover:text-cyan-600"
        onClick={toggleVisible}
      >
        {options.get(visible)}
      </Button>
    );
  }, [visible]);

  const LockOptions = useCallback(() => {
    const options = opts(
      <LockOpenIcon className=" size-[16px] text-cyan-600" />,
      <LockClosedIcon className=" size-[16px]" />,
    );
    return (
      <Button
        variant={`ghost`}
        className="mr-[10px] p-0 text-neutral-500 hover:text-cyan-600"
        onClick={toggleVisible}
      >
        {options.get(visible)}
      </Button>
    );
  }, [visible]);

  return (
    <div
      className={cn(
        "flex h-[56px] w-full items-center rounded-xl border-[0.33px] border-neutral-300 bg-neutral-100 pl-3 focus-within:border focus-within:border-cyan-500 focus-within:ring-offset-0 active:border-neutral-300",
        className,
      )}
    >
      {type === "password" ? (
        <LockOptions />
      ) : (
        <props.icon className="mr-[10px] h-[16px] w-[16px] text-clay" />
      )}

      <input
        {...props}
        type={visible ? "text" : type}
        ref={ref}
        className="h-[44px] w-full rounded-lg bg-transparent px-2 font-sans text-[14px] font-normal tracking-normal placeholder:text-clay/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      {type === "password" ? <IconOptions /> : null}
    </div>
  );
});
InputField.displayName = "InputField";

export const InputFieldX = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon?: DualIcon; label?: string }
>(({ className, type, label, ...props }, ref) => {
  const fieldLabel = label?.split("@");
  return (
    <div>
      <div className="flex items-center space-x-4 p-1 font-mono text-[11px] tracking-[0.6px]">
        <p className="whitespace-nowrap opacity-50">{fieldLabel?.[0]}</p>
        <div>
          {fieldLabel?.[1] ? (
            <TheTip tip="required" icon={InformationCircleIcon}>
              <ArrowDownLeftIcon className="size-3 text-red-500" />
            </TheTip>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "focus-within:ring-ring flex h-[50px] items-center rounded-lg border-[0.33px] border-neutral-400/80 bg-white pl-3 pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1",
          className,
        )}
      >
        {props?.icon ? (
          <props.icon className="mr-[10px] size-5 stroke-1 text-clay dark:text-orange-200/80" />
        ) : null}

        <div className="relative w-full">
          <input
            {...props}
            type={type}
            ref={ref}
            className="h-[44px] w-full rounded-lg px-2 font-sans text-[14px] tracking-tight placeholder:font-sans placeholder:tracking-tighter placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
});
InputFieldX.displayName = "InputFieldX";

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
          <div className="mr-[16px] h-[48px] w-[48px] bg-[url('/svg/sky-upload.svg')] bg-cover " />
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
          "flex h-12 w-full rounded-md border-[0.0px] border-ash bg-paper/80 px-3 py-2 text-xs ring-cyan-700/40 ring-offset-cyan-700 transition-all duration-300 ease-in-out placeholder:text-clay focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-1 md:focus-visible:ring-offset-1",
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
  flex h-14 w-full px-3 py-2 bg-[#EFEFEF]/50
  border-[0.33px] border-clay/60 rounded-xl
  placeholder:text-neutral-400 placeholder:tracking-tight placeholder:lowercase placeholder:font-normal
  text-[16px] tracking-widest text-center font-medium font-mono
  transition-all duration-300 ease-in-out uppercase
  ring-offset-sky-300 ring-neutral-100 focus-visible:outline-none

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
        "relative flex cursor-pointer flex-col items-center justify-end border-0 portrait:justify-center",
        className,
      )}
    >
      <div className="absolute top-[0px] flex h-[360px] w-[400px] flex-col items-center justify-center border-[0.33px] border-ash/30">
        <div className="flex h-[335px] w-[375px] flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-ash backdrop-blur-lg">
          <div className="flex h-[72px] w-[72px] items-center justify-center bg-opacity-0">
            <video autoPlay loop muted className="bg-transparent object-center">
              <source src={`/images/upload.mp4`} type="video/mp4" />
            </video>
            <div className="size-[64px] bg-[url('/svg/sky-upload.svg')] bg-cover " />
          </div>
          <div className="flex flex-col items-center justify-center space-x-2 pt-10 portrait:hidden portrait:pb-0">
            <span className="py-1 font-k2d text-xl font-medium text-black portrait:hidden portrait:py-0 portrait:text-[12px]">
              Dropzone
            </span>
            <p className="flex items-center space-x-1 text-xs">
              <span className="px-1">or</span>
              <span className="text-cyan-600">Browse files</span>
              <FolderIcon className="size-3.5 fill-cyan-100 stroke-1 text-cyan-600/95" />
            </p>
          </div>
        </div>
      </div>

      <input
        {...props}
        type={type}
        ref={ref}
        className="flex h-[200px] w-full bg-ash py-2 text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 portrait:h-[56px] portrait:py-0"
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
          <props.icon
            className="size-5 w-14 text-neutral-50"
            strokeWidth={1.5}
          />
        ) : (
          <div className="size-5 w-14 text-dyan" />
        )}
      </div>
      <div className="flex h-full w-full flex-col space-y-0 bg-white">
        <InputLabel label={label} />
        <input
          {...props}
          type={type}
          ref={ref}
          className="flex h-full w-full items-center border-l-[0.33px] border-ash/50 bg-white px-3 pb-1.5 pt-0.5 font-sans text-sm font-medium tracking-tight text-cyan-600 placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldPayments.displayName = "InputFieldPayments";

export const InputFieldMain = React.forwardRef<
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
          <props.icon
            className="size-5 w-14 text-neutral-50"
            strokeWidth={1.5}
          />
        ) : (
          <div className="size-5 w-14 text-dyan" />
        )}
      </div>
      <div className="flex h-full w-full flex-col space-y-0 bg-white">
        <InputLabel label={label} />
        <input
          {...props}
          type={type}
          ref={ref}
          className="flex h-full w-full items-center border-l-[0.33px] border-ash/50 bg-white px-3 pb-1.5 pt-0.5 font-sans text-sm font-medium tracking-tight text-cyan-600 placeholder:text-neutral-500/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldMain.displayName = "InputFieldMail";

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
        <props.icon className="size-5 w-14 text-dyan" strokeWidth={1.5} />
      ) : (
        <div className="size-5 w-14 text-dyan" />
      )}

      <div className="flex h-full w-full flex-col space-y-0 bg-white/90">
        <p className="flex w-full items-start justify-end whitespace-nowrap border-l-[0.33px] border-ash/50 pl-3 pt-1 font-mono text-[10px] font-normal uppercase tracking-widest text-dyan/70">
          {withReq[0] ?? label}
          {withReq[1] ? (
            <span
              className={cn(
                withReq[1] ? "mx-2" : "",
                "flex h-fit items-end whitespace-nowrap rounded-full bg-amber-700/10 font-mono font-normal lowercase tracking-wider text-orange-600/80",
              )}
            >
              <ArrowDownLeftIcon className="size-3" />
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
          className="flex h-full w-full border-l-[0.33px] border-ash/50 px-3 text-right font-sans text-[20px] font-semibold tracking-tight text-dyan placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
});
InputFieldAmount.displayName = "InputFieldAmount";

export { Input, InputLight };
