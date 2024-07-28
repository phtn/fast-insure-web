"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

const chartData = [
  { browser: "jay", visitors: 275, fill: "gray" },
  { browser: "francis", visitors: 200, fill: "var(--color-safari)" },
  { browser: "imelda", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "luci", visitors: 173, fill: "var(--color-edge)" },
  { browser: "borpo", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  jay: {
    label: "Jay",
    color: "hsl(var(--chart-1))",
  },
  francis: {
    label: "Francis",
    color: "hsl(var(--chart-2))",
  },
  imelda: {
    label: "Imelda",
    color: "hsl(var(--chart-3))",
  },
  luci: {
    label: "Luci",
    color: "hsl(var(--chart-4))",
  },
  borpo: {
    label: "Borpo",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function HBar() {
  return (
    <Card className="size-[300px] border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-[20px] leading-4">Top Agents</CardTitle>
        <CardDescription className="font-mono text-[12px] font-light opacity-70">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
            className="mb-2.5 h-[150px] overflow-visible border border-white/0"
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" hideLabel />}
            />
            <Bar
              dataKey="visitors"
              layout="vertical"
              radius={5}
              className="relative z-50 drop-shadow-md"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="flex gap-2 font-medium leading-none">
          Top agent Jay up by 10% this month <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="text-muted-foreground leading-none"> */}
        {/*   Showing total visitors for the last 6 months */}
        {/* </div> */}
      </CardFooter>
    </Card>
  );
}
