"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getVersion, opts } from "@/utils/helpers";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { LoaderBX } from "./loader-bx";

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
    const options = opts(<SplashScreen />, <></>);

    return <div>{options.get(dark)}</div>;
  }, [dark]);

  return <ViewOptions />;
};

const SplashScreen = () => (
  <Container>
    <Logo />
    <Loading />
    <Footer />
  </Container>
);

const Logo = () => (
  <TallBody>
    <Image
      alt="fast logo"
      src={"/images/fast_grey.svg"}
      width={0}
      height={0}
      className="h-[calc((100vh)/3.5)] w-auto animate-fade-right animate-once"
      unoptimized
    />
  </TallBody>
);

const Loading = () => (
  <TallBody>
    <ShortBody>
      <LoaderBX />
    </ShortBody>
    <ShortBody />
  </TallBody>
);

const Footer = () => (
  <TallBody>
    <ShortBody />
    <ShortBody>
      <div className="space-y-0.5">
        <p className="animate-fade-right text-xs font-light tracking-tight text-gray-400 animate-delay-500 animate-duration-500 animate-ease-in">
          FastInsure Tech, Inc. &copy; {new Date().getFullYear()}
        </p>
        <p className="w-fit animate-flip-down rounded-full bg-gray-400/80 px-1.5 py-0.5 font-mono text-[8px] text-white animate-delay-1000 animate-duration-500">
          Build v{getVersion()}
        </p>
      </div>
    </ShortBody>
  </TallBody>
);

export const TallBody = tw.div`
  flex h-[calc((100vh)/3)] flex-col items-center justify-center
  `;

export const ShortBody = tw.div`
  flex h-[calc((100vh)/6)] items-center justify-center
  `;

const Container = tw(motion.div)`
  flex h-[calc(100vh-50px)] w-screen flex-col items-center justify-center transform-gpu
  relative z-50
`;

// const Car = tw(motion.div)`
//   h-[95px] w-[340px] bg-[url('/logo/fi_logo_v2.svg')] bg-cover
//   relative
// `;
