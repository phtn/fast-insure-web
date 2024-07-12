"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/(ui)/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/(ui)/chart";
import { type IDMRequestSchema } from "@/server/resource/idm";
import { getPreviousMonths } from "@/utils/helpers";
import type { MonthName } from "@/app/types.index";
import type { ReactElement } from "react";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "gray",
  },
} satisfies ChartConfig;

type ReqComData = {
  month: MonthName | undefined;
  drafts: number | undefined;
  submitted: number | undefined;
};

export function VBar(props: { requests: IDMRequestSchema[] | undefined }) {
  const drafts =
    props.requests?.filter((request) => request.status === "draft").length ?? 0;
  const submitted =
    props.requests?.filter((request) => request.status === "submitted")
      .length ?? 0;
  const chartData: ReqComData[] = getPreviousMonths().map((month) => ({
    month,
    drafts,
    submitted,
  }));
  return (
    <Card className="size-[300px] border-0 shadow-none">
      <CardHeader className="">
        <CardTitle className="text-[20px] leading-4">
          Request / Completed
        </CardTitle>
        <CardDescription className="font-mono text-[12px] font-light opacity-70">
          {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} className="" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="drafts"
              fill="var(--color-desktop)"
              radius={4}
              className="drop-shadow-md"
            />
            <Bar
              dataKey="submitted"
              fill="var(--color-mobile)"
              radius={4}
              className="drop-shadow-md"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <GetTrend chartData={chartData} />
        {/* <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}

const GetTrend = (props: { chartData: ReqComData[] }) => {
  const focusMonths = props.chartData.slice(props.chartData.length - 2);
  const percentChange =
    ((focusMonths[0]?.submitted ?? 0) / (focusMonths[1]?.submitted ?? 1)) * 100;

  return (
    <div className="flex gap-2 font-medium leading-none">
      Submits are {getTrend(percentChange, "up", "down")} by {percentChange}%
      this month
      {getTrend(
        percentChange,
        <TrendingUp className="size-4" />,
        <ArrowTrendingDownIcon className="size-4" />,
      )}
    </div>
  );
};

const getTrend = (
  change: number,
  up: string | ReactElement,
  down: string | ReactElement,
) => {
  if (change > 0) {
    return up;
  } else if (change < 0) {
    return down;
  } else return "no change";
};
