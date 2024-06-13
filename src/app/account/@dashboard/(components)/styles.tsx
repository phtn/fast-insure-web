import { Card, CardHeader, CardTitle } from "@/app/(ui)/card";
import { TabsContent, TabsList, TabsTrigger } from "@/app/(ui)/tabs";
import tw from "tailwind-styled-components";

const TabList = tw(TabsList)`
  bg-ash/30 portrait:bg-gradient-to-tl from-stone-500 to-zinc-500 portrait:h-[36px] w-full grid-cols-3 rounded-lg border-[0.33px] border-cyan-950/15 p-1 portrait:p-1.5
  portrait:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  portrait:from-slate-800 portrait:via-zinc-800/90 portrait:to-stone-800 portrait:backdrop-blur-lg
  `;
const Trigger = tw(TabsTrigger)`
  h-full rounded-md bg-white border-ash text-sm portrait:text-xs
  data-[state=inactive]:text-void/60 portrait:data-[state=inactive]:text-zap data-[state=active]:text-cyan-950
  data-[state=inactive]:bg-transparent data-[state=active]:border-[0.33px]
  data-[state=active]:shadow-sm portrait:px-1.5 w-full px-2.5
  `;

const TabContent = tw(TabsContent)`
  h-[550px]
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
