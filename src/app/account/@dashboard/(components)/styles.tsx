import { Card, CardHeader, CardTitle } from "@/app/(ui)/card";
import { TabsContent, TabsList, TabsTrigger } from "@/app/(ui)/tabs";
import tw from "tailwind-styled-components";

const TabList = tw(TabsList)`
  portrait:h-[36px] w-full grid-cols-3 portrait:p-1.5
  `;
const Trigger = tw(TabsTrigger)`
  h-full text-sm portrait:text-xs
  data-[state=inactive]:text-gray-400 data-[state=active]:text-cyan-600
  data-[state=active]:border-b-[3px]
  portrait:px-1.5 w-full data-[state=active]:border-cyan-600
  `;

const TabContent = tw(TabsContent)`
  h-[calc(100vh-144px)]
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
