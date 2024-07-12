"use client";

import { Button } from "@/app/(ui)/button";
import type { ClassName, DualIcon } from "@/app/types.index";
import type { TimelineSchema } from "@/server/resource/account";
import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";
import {
  MinusCircleIcon,
  ChevronRightIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import {
  ClockIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { HistoryIcon } from "lucide-react";
import moment from "moment";
import { useCallback, type ReactNode } from "react";
import tw from "tailwind-styled-components";

export const Recents = (props: {
  visible: boolean;
  onToggle: VoidFunction;
  timeline: TimelineSchema[] | undefined;
}) => {
  return (
    <div
      className={cn(
        "flex h-full overflow-x-clip border-t-[0.33px] border-dyan/20 bg-gradient-to-b from-white via-white to-transparent py-3 transition-all duration-500 ease-out portrait:hidden",
        props.visible ? "w-full" : "w-[0px]",
      )}
    >
      <div className="h-[calc(100vh-230px)] w-full space-y-3">
        <div className="flex w-full justify-between px-4">
          <div className="flex items-center space-x-2 text-teal-600">
            <HistoryIcon className="size-4 stroke-1" />
            <p className="font-sans text-xs tracking-tight">Timeline</p>
          </div>
          <Button size={`icon`} variant={`ghost`} onClick={props.onToggle}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-y-scroll p-2">
          {props?.timeline
            ?.map((timeline, i) => (
              <TimelineEvent timeline={timeline} key={timeline.title + i} />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

interface IconList {
  name: TimelineSchema["name"];
  icon: DualIcon;
  classname: ClassName;
}
const icons: IconList[] = [
  {
    name: "code",
    icon: QrCodeIcon,
    classname: "text-indigo-500",
  },
  {
    name: "draft",
    icon: DocumentTextIcon,
    classname: "text-amber-400",
  },
  {
    name: "submitted",
    icon: PaperAirplaneIcon,
    classname: "text-sky-400 rotate-3",
  },
  {
    name: "received",
    icon: ClockIcon,
    classname: "text-teal-400",
  },
];

const Icon = (props: { name: TimelineSchema["name"] }) => {
  const prop = icons.find((icon) => icon.name === props.name);
  if (!prop) return;
  return (
    <prop.icon
      className={cn(`size-4 shrink-0 stroke-[1.5px]`, prop.classname)}
    />
  );
};

interface EventType {
  type: TimelineSchema["type"];
  name: TimelineSchema["name"];
  className: ClassName;
  extra?: string;
}

const types: EventType[] = [
  {
    type: "create",
    name: "code",
    className:
      "shadow-indigo-100/80 border-indigo-400/80 text-indigo-800 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50/50",
  },
  {
    type: "create",
    name: "draft",
    className:
      "shadow-neutral-100 border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-white",
  },
  {
    type: "update",
    name: "draft",
    className: "bg-white",
  },
  {
    type: "create",
    name: "submitted",
    className:
      "shadow-sky-500/20 border-sky-400/80 text-sky-800 bg-gradient-to-tr from-sky-50 via-white to-teal-50/50",
  },
  {
    type: "create",
    name: "received",
    className:
      "shadow-teal-500/20 border-teal-400/80 text-teal-800 bg-gradient-to-tr from-indigo-50 via-white to-teal-50/50",
  },
];

const MajorStep = (props: { name: TimelineSchema["name"] }) => (
  <StepContent>
    <Icon name={props.name} />
    <VerticalLine />
  </StepContent>
);
const MinorStep = () => (
  <StepContent>
    <GreyStone />
    <VerticalLine />
  </StepContent>
);

const EventContent = (
  props: Omit<EventType, "className"> & { children: ReactNode },
) => {
  const { name, type, children } = props;
  const event = types.find((item) => item.type === type && item.name === name);
  if (event?.type === "update" || event?.type === "delete")
    return <MinorContent>{children}</MinorContent>;
  return <MainContent className={event?.className}>{children}</MainContent>;
};

const TimelineEvent = (props: { timeline: TimelineSchema }) => {
  const { createdAt, description, name, title, type, active } = props.timeline;
  const mainEvent = type !== "update";

  const StepOptions = useCallback(() => {
    const options = opts(<MajorStep name={name} />, <MinorStep />);
    return <>{options.get(mainEvent)}</>;
  }, [name, mainEvent]);

  const ExtraOptions = useCallback(() => {
    const options = opts(
      <div
        className={cn(
          "w-full items-end justify-between",
          active ? "flex" : "hidden",
        )}
      >
        <Description className={name === "code" ? "uppercase" : ""}>
          {description.substring(0, 16)}
        </Description>
        <MinusCircleIcon className="size-4 shrink-0 stroke-1 opacity-40" />
      </div>,
      <div />,
    );
    return <>{options.get(mainEvent)}</>;
  }, [active, description, name, mainEvent]);

  return (
    <div className="flex w-full">
      <StepOptions />
      <EventContent type={type} name={name}>
        <div className="flex w-full justify-between text-[10px]">
          <Title>{title}</Title>
          <Moment>{moment(createdAt).fromNow()}</Moment>
        </div>
        <ExtraOptions />
      </EventContent>
    </div>
  );
};

const VerticalLine = tw.div`
  h-full w-[2.5px]
  rounded-sm mx-[6.5px] my-[4px]
  bg-gradient-to-b from-neutral-200 to-neutral-100/50
  `;
const GreyStone = tw.div`
  mx-[3.5px] size-2 shrink-0 rounded-[4px] bg-neutral-200 stroke-[1.5px]
  `;
const StepContent = tw.div`
  -ml-[2.5px] flex flex-col
  `;
const MainContent = tw.div`
  -mt-1.5 mb-6 ml-2 w-full space-y-2 rounded border-[0.33px] p-2 shadow-md
  `;
const MinorContent = tw.div`
  -mt-3 mb-6 ml-2 w-full p-2
  `;
const Title = tw.div`
  tracking-tighter opacity-70
  `;
const Moment = tw.div`
  text-mono text-[9px] text-dyan/50
  `;
const Description = tw.div`
  text-xs font-medium text-coal
  `;
// const submitted: TimelineSchema = {
//   active: true,
//   type: "create",
//   name: "submitted",
//   title: "Request submitted",
//   description: "Roxie",
//   createdAt: new Date(new Date().getTime()).toISOString(),
// };
// const draftCreated: TimelineSchema = {
//   active: true,
//   type: "create",
//   name: "draft",
//   title: "Draft created.",
//   description: "Roxie",
//   createdAt: new Date(new Date().getTime()).toISOString(),
// };
// const draftUpdated: TimelineSchema = {
//   active: true,
//   type: "update",
//   name: "submitted",
//   title: "Draft updated.",
//   description: "Roxie",
//   createdAt: new Date(new Date().getTime()).toISOString(),
// };
// const received: TimelineSchema = {
//   active: true,
//   type: "create",
//   name: "received",
//   title: "Request received",
//   description: "Roxie",
//   createdAt: new Date(new Date().getTime()).toISOString(),
// };
