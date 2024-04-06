"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import {
  useRef,
  useCallback,
  type ReactNode,
  useState,
  type MouseEvent,
} from "react";
import tw from "tailwind-styled-components";

type HoverboardProps = {
  children: ReactNode;
  parentStyle: string;
  snapPoints: number[];
  offset: number;
};

/**
 * https://re-up.ph
 * (ui) - Hoverboard
 * highlight links on hover like vercel
 * @default - vertical
 * @author phtn
 */
export const Hoverboard = ({
  children,
  parentStyle,
  snapPoints,
  offset,
}: HoverboardProps) => {
  const vRef = useRef<HTMLDivElement>(null);
  const vRect = vRef.current?.getBoundingClientRect();
  const height = vRect?.bottom ?? 0 - (vRect?.top ?? 0);

  const [top, setTop] = useState(0);

  const verticalMouseOver = useCallback(
    (e: MouseEvent) => {
      setTop(snapPoints[findIndex(snapPoints, height - e.clientY)]! * -1);
    },
    [height, snapPoints],
  );

  return (
    <Container
      ref={vRef}
      onMouseOver={verticalMouseOver}
      className={parentStyle}
    >
      <Pill
        animate={{ y: top + height - offset }}
        transition={{ type: "transform" }}
      />
      {children}
    </Container>
  );
};

/**
 * https://re-up.ph
 * (ui) - Hoverpill
 * highlight links on hover like vercel
 * @default - horizontal
 * @author phtn
 */
export const Hoverpill = ({
  children,
  parentStyle,
  snapPoints,
}: HoverboardProps) => {
  const hRef = useRef<HTMLDivElement>(null);
  const hRect = hRef.current?.getBoundingClientRect();
  const x = hRect?.x;

  const [left, setLeft] = useState(0);

  const horizontalMouseOver = useCallback(
    (e: MouseEvent) => {
      setLeft(findIndex(snapPoints, e.clientX - (x ?? 0)));
    },
    [snapPoints, x],
  );

  return (
    <Container
      ref={hRef}
      onMouseOver={horizontalMouseOver}
      className={parentStyle}
    >
      <Pill
        className={cn(`top-[23px]`, left === 2 ? `w-[120px]` : `w-[104px]`)}
        animate={{
          x:
            left === 1
              ? 0
              : left === 2
                ? left * 63
                : left === 3
                  ? left * 89
                  : left * 67,
        }}
        transition={{ type: "transform" }}
      />
      {children}
    </Container>
  );
};

function findIndex(arr: number[], n: number) {
  let prev = 0;
  const idx = arr.findIndex((e, i) => e > n && (i === 0 || arr[i - 1]! <= n));
  if (idx === -1) return prev;
  prev = idx;
  return idx;
}

const Container = tw.div`
  group overflow-hidden
  `;

const Pill = tw(motion.div)`
  relative md:h-[46px] rounded-md
  lg:group-hover:bg-ash/40
  transition-colors duration-300 delay-200 ease-in
  pointer-events-none z-0
  `;

/*
console.log(`index`, findIndex(snapPoints, height - clientY));
      console.log(
        `point`,
        snapPoints[findIndex(snapPoints, height - clientY)]! * -1,
        (height - clientY) * -1,
      );
      console.log(clientY);
*/
