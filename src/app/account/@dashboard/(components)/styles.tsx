import { Card, CardHeader, CardTitle } from "@/app/(ui)/card";
import { TableCell, TableHeader } from "@/app/(ui)/table";
import { TabsContent, TabsList, TabsTrigger } from "@/app/(ui)/tabs";
import tw from "tailwind-styled-components";

/**
 @namespace re-up.ph Styled Table Components
 */
export const TableContainer = tw.div`
  border-dyan/20 border-[0.33px] bg-white portrait:h-[calc(100vh-186px)] portrait:border-0
  `;
export const TableInner = tw.div`
  border-dyan/40 h-[calc(100vh-232px)] overflow-y-scroll border-t-[0.33px]
  `;
export const PhHeader = tw(TableHeader)`a
   sticky bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200/40  via-orange-50 font-medium tracking-tight shadow-sm shadow-stone-100
   `;
export const PhCell = tw(TableCell)`
  border-dyan/40 border-r-[0.33px] border-dashed bg-gradient-to-r from-zinc-900/80 to-sky-950/80 bg-clip-text font-light text-transparent
  `;
export const TablistContainer = tw.div`
  flex w-[calc(100vw/4)] items-end space-x-2 portrait:h-[36px] portrait:space-x-0
  `;
const TabList = tw(TabsList)`
  portrait:h-[36px] w-full grid-cols-3 portrait:p-1.5 -m-[1.62px]
  `;
const Trigger = tw(TabsTrigger)`
  h-full text-sm portrait:text-xs
  data-[state=inactive]:text-cyan-950/50 data-[state=active]:text-coal
  data-[state=active]:border-b-[3px]
  portrait:px-1.5 w-full data-[state=active]:border-clay
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
