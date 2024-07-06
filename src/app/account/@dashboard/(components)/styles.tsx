import { Card, CardHeader, CardTitle } from "@/app/(ui)/card";
import { TableCell, TableHeader } from "@/app/(ui)/table";
import { TabsContent, TabsList, TabsTrigger } from "@/app/(ui)/tabs";
import tw from "tailwind-styled-components";

/**
 @namespace re-up.ph Styled Table Components
 */
export const TableContainer = tw.div`
  border-t-[0.33px] w-full border-dyan/20 border-[0.33px] bg-white portrait:h-[calc(100vh-186px)] portrait:border-0
  `;
export const TableInner = tw.div`
  border-dyan/30 h-[calc(100vh-232px)] overflow-y-scroll border-t-[0.33px]
  `;
export const PhHeader = tw(TableHeader)`a
   sticky bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200/40  via-orange-50 font-medium tracking-tight shadow-sm shadow-stone-100
   `;
export const PhCell = tw(TableCell)`
  border-dyan/40 border-r-[0.33px] border-dashed bg-gradient-to-r from-zinc-900/80 to-sky-950/80 bg-clip-text font-light text-transparent
  `;
export const TablistContainer = tw.div`
  flex w-[calc(100vw/4)] portrait:w-full justify-between items-center portrait:h-[36px] portrait:space-x-0
  `;
const TabList = tw(TabsList)`
  portrait:h-[36px] grid-cols-3 px-1.5 portrait:px-0 py-[1.35px] .-m-[1.62px]
  `;
const Trigger = tw(TabsTrigger)`
  h-full text-sm portrait:text-xs
  data-[state=inactive]:text-coal/50 data-[state=active]:text-coal
  data-[state=active]:border-b-[3px] data-[state=active]:scale-[120%]
  .portrait:px-1.5 portrait:data-[state=active]:border-b-0 w-[56px] portrait:border-neutral-300 data-[state=active]:border-clay
  `;
const TabValue = tw.p`
  rounded-md bg-dyan/5 px-1
  font-mono text-[10px] font-light md:ml-4
  portrait:ml-1
  `;

const TabContent = tw(TabsContent)`
  h-full flex w-full
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

export {
  TabCard,
  Trigger,
  TabContent,
  TabCardTitle,
  TabCardHeader,
  TabList,
  TabValue,
};
