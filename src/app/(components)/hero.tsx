"use client";

import { auth } from "@/libs/db";
import { Raynor } from "@@ui/kerrigan/raynor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import tw from "tailwind-styled-components";

export const Hero = () => {
  const [creds] = useAuthState(auth);
  const [showFeature, setShowFeature] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeature(!showFeature);
    }, 10000);
    return () => clearInterval(interval);
  }, [showFeature]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 3.4,
        easings: ["easeInOut"],
      }}
      className="h-[calc(100vh-56px)] w-full"
    >
      <HeroContent>
        <div className="flex w-full justify-start md:w-[800px] lg:w-[1080px]">
          <Raynor
            href={creds ? `/account/overview` : `account/sign-in`}
            title="Fast-track your"
            description="Technology-driven service provider for businesses and individuals."
            uid={creds?.uid}
            actionLabel={
              creds?.uid ? "View Dashboard" : "Login to your account"
            }
          />
        </div>
      </HeroContent>
    </motion.div>
  );
};

const HeroContent = tw.div`
  h-[calc(100vh-56px)] flex justify-center w-full bg-gradient-to-br from-zap from-40% via-blue-400/30 to-zap to-100%
  `;
