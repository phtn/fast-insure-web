import {
  CogIcon,
  LayoutDashboardIcon,
  Users2Icon,
  type LucideIcon,
  FileSpreadsheetIcon,
} from "lucide-react";

export interface GroupItemValue {
  label: string;
  desc: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

export interface GroupItem {
  label: string;
  values: GroupItemValue[];
}

export const sidebarNavGroup: GroupItem[] = [
  {
    label: "Account",
    values: [
      {
        label: "Dashboard",
        desc: "Account overview",
        value: "0",
        icon: LayoutDashboardIcon,
        href: "/account",
      },
      {
        label: "Agents",
        desc: "Agent Management",
        value: "1",
        icon: Users2Icon,
        href: "/account/agents",
      },
      {
        label: "Reports",
        desc: "View Reports",
        value: "2",
        icon: FileSpreadsheetIcon,
        href: "/account/reports",
      },
    ],
  },
  {
    label: "Settings",
    values: [
      {
        label: "Settings",
        desc: "Account Settings",
        value: "0",
        icon: CogIcon,
        href: "/account/settings",
      },
    ],
  },
];
