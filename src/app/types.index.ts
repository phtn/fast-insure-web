import { type AcademicCapIcon as Outline } from "@heroicons/react/24/outline";
import { type LucideIcon } from "lucide-react";
import { type HTMLProps } from "react";

export type HeroIcon = typeof Outline;
export type DualIcon = LucideIcon | HeroIcon;
export type ClassName = HTMLProps<HTMLElement>["className"];
