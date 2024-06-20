import {
  CogIcon,
  LayoutDashboardIcon,
  Users2Icon,
  FileSpreadsheetIcon,
  CarIcon,
  SproutIcon,
  PlaneTakeoffIcon,
  MousePointerSquareIcon,
  UsersRoundIcon,
  FileBarChart2Icon,
  MonitorCheckIcon,
  // ShieldQuestionIcon,
  // LifeBuoyIcon,
} from "lucide-react";
import { type GroupItem } from "./types";

export const affiliateItems: GroupItem[] = [
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
        desc: "General Settings",
        value: "0",
        icon: CogIcon,
        href: "/account/settings",
      },
    ],
  },
];

export const userItems: GroupItem[] = [
  {
    label: "Account",
    values: [
      {
        label: "Autos",
        desc: "Auto Insurance Overview",
        value: "0",
        icon: CarIcon,
        href: "/account",
      },
      {
        label: "Life",
        desc: "Life Insurance Management",
        value: "1",
        icon: SproutIcon,
        href: "/account/life",
      },
      {
        label: "Travel",
        desc: "Travel Insurance Management",
        value: "2",
        icon: PlaneTakeoffIcon,
        href: "/account/travel",
      },
    ],
  },
  {
    label: "Settings",
    values: [
      {
        label: "Settings",
        desc: "General Settings",
        value: "0",
        icon: CogIcon,
        href: "/account/settings",
      },
    ],
  },
];

export const managerItems: GroupItem[] = [
  {
    label: "Account",
    values: [
      {
        label: "Overview",
        desc: "Managers Dashboard",
        value: "0",
        icon: MousePointerSquareIcon,
        href: `/account`,
      },
      {
        label: "Agents",
        desc: "List of all agents",
        value: "1",
        icon: UsersRoundIcon,
        href: "/account/agents",
      },
      {
        label: "Reports",
        desc: "Reporting tools",
        value: "2",
        icon: FileBarChart2Icon,
        href: "/account/reports",
      },
    ],
  },
  // {
  //   label: "Settings",
  //   values: [
  //     {
  //       label: "Settings",
  //       desc: "General Settings",
  //       value: "0",
  //       icon: CogIcon,
  //       href: "/account/settings",
  //     },
  //   ],
  // },
];

export const agentItems: GroupItem[] = [
  {
    label: "Account",
    values: [
      {
        label: "Overview",
        desc: "Agent Dashboard Overview",
        value: "0",
        icon: MonitorCheckIcon,
        href: "/account",
      },
      {
        label: "",
        desc: "autos",
        value: "1",
        // icon: ShieldQuestionIcon,
        href: "/account",
      },
      {
        label: "",
        desc: "pa",
        value: "2",
        // icon: LifeBuoyIcon,
        href: "/account",
      },
    ],
  },
  // {
  //   label: "Settings",
  //   values: [
  //     {
  //       label: "Settings",
  //       desc: "General Settings",
  //       value: "0",
  //       icon: CogIcon,
  //       href: "/account/settings",
  //     },
  //   ],
  // },
];

export const agentTwoNav: GroupItem[] = [
  {
    label: "Account",
    values: [
      {
        label: "Autos",
        desc: "Auto Insurance Overview",
        value: "0",
        icon: CarIcon,
        href: "/account",
      },
      {
        label: "Life",
        desc: "Life Insurance Management",
        value: "1",
        icon: SproutIcon,
        href: "/account/life",
      },
      {
        label: "Travel",
        desc: "Travel Insurance Management",
        value: "2",
        icon: PlaneTakeoffIcon,
        href: "/account/travel",
      },
    ],
  },
  // {
  //   label: "Settings",
  //   values: [
  //     {
  //       label: "Settings",
  //       desc: "General Settings",
  //       value: "0",
  //       icon: CogIcon,
  //       href: "/account/settings",
  //     },
  //   ],
  // },
];