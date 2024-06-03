import { Card, CardHeader, CardTitle } from "@/app/(ui)/card";
import { TabsContent, TabsList, TabsTrigger } from "@/app/(ui)/tabs";
import tw from "tailwind-styled-components";

const TabList = tw(TabsList)`
  bg-ash/30 grid w-fit grid-cols-3 rounded-lg border-[0.33px] border-cyan-950/15 p-1
  `;
const Trigger = tw(TabsTrigger)`
  h-full rounded-md bg-white border-ash text-sm
  data-[state=inactive]:text-void/60 data-[state=active]:text-sky-500
  data-[state=inactive]:bg-transparent data-[state=active]:border-[0.33px]
  data-[state=active]:shadow-sm
  `;

const TabContent = tw(TabsContent)`
  h-full
  `;

const TabCard = tw(Card)`
  border-0 shadow-none p-0
  `;

const TabCardHeader = tw(CardHeader)`
  px-0 py-0.5
  `;

const TabCardTitle = tw(CardTitle)`
  text-lg text-dyan
  `;

export { TabCard, Trigger, TabContent, TabCardTitle, TabCardHeader, TabList };
