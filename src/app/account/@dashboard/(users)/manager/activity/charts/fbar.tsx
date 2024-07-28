"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function FBar() {
  return (
    <Card className=" size-[300px] border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-[20px] leading-4">
          Monthly Completions
        </CardTitle>
        <CardDescription className="font-mono text-[12px] font-light opacity-70">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="border-0 shadow-none">
        <ChartContainer config={chartConfig} className="border-0 shadow-none">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={8}
              className="drop-shadow-lg"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="text-muted-foreground leading-none"> */}
        {/*   Showing total visitors for the last 6 months */}
        {/* </div> */}
      </CardFooter>
    </Card>
  );
}
