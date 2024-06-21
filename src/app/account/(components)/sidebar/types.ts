import type {
  UserProfileSchema,
  AccountTypeSchema,
} from "@/server/resource/account";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { type Squares2X2Icon } from "@heroicons/react/24/solid";
type HeroIcon = typeof Squares2X2Icon;

export type SidebarProps = {
  children: ReactNode;
  accountType: AccountTypeSchema | undefined;
  profile: UserProfileSchema | undefined;
};

export type NavProps = {
  children: ReactNode;
};

export interface GroupItemValue {
  label: string;
  desc: string;
  value: string;
  icon?: LucideIcon | HeroIcon;
  href: string;
}

export interface GroupItem {
  label: string;
  values: GroupItemValue[];
}

export type SidebarNavProps = {
  groupitems: GroupItem[];
};
