import type {
  UserProfileSchema,
  AccountTypeSchema,
} from "@/server/resource/account";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

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
  icon?: LucideIcon;
  href: string;
}

export interface GroupItem {
  label: string;
  values: GroupItemValue[];
}

export type SidebarNavProps = {
  groupitems: GroupItem[];
};
