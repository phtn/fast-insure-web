"use client";
import { cn } from "@/utils/cn";

export const defaultStyle =
  "animate-fade-down duration-75 border-b-[0.33px] border-slate-400 border-dashed hover:bg-ash/30";

export const rowStyle = (index: number) => {
  return cn(
    "animate-fade-down duration-75 border-b-[0.33px] border-slate-400 border-dashed hover:bg-ash/30",
    delays[index],
    "ease-linear",
  );
};

export const delays = [
  "animate-delay-75",
  "animate-delay-100",
  "animate-delay-[250ms]",
  "animate-delay-150",
  "animate-delay-200",
  "animate-delay-[250ms]",
  "animate-delay-300",
  "animate-delay-[250ms]",
  "animate-delay-500",
  "animate-delay-[250ms]",
  "animate-delay-700",
  "animate-delay-[250ms]",
  "animate-delay-1000",
  "animate-delay-[250ms]",
  "animate-delay-2000",
];
