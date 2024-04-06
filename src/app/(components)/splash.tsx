"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opts } from "@/utils/helpers";
import tw from "tailwind-styled-components";

export const Splash = () => {
  const [x, setX] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setX(500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [x]);

  useEffect(() => {
    if (x >= 500) {
      setDark(false);
    }
  }, [dark, x]);

  const ViewOptions = useCallback(() => {
    const options = opts(<SplashScreen x={x} />, <></>);

    return <div>{options.get(dark)}</div>;
  }, [dark, x]);

  return <ViewOptions />;
};

const SplashScreen = ({ x }: { x: number }) => (
  <Container>
    <Car
      initial={{ x: -1400, scale: 0.6, skewX: `${85}deg`, opacity: 0.5 }}
      animate={{ x: x, scale: 1, skewX: `${0}deg`, opacity: 1 }}
      transition={{
        damping: 1,
        duration: 0.7,
      }}
    />
  </Container>
);

const Container = tw(motion.div)`
  bg-gradient-to-b from-blue-950 from-10% to-blue-700 -mt-[72px]
  flex h-screen w-screen flex-col items-center justify-center transform-gpu
  relative z-50
`;

const Car = tw(motion.div)`
  h-[95px] w-[340px] bg-[url('/logo/fi_logo_v2.svg')] bg-cover
  relative
`;
