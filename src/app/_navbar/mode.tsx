"use client";

import { MenuIcon, SunIcon } from "lucide-react";
import { Button } from "../_components/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { onInfo } from "@/utils/toast";
import { motion } from 'framer-motion'

export function Mode() {
  const handleToggle = () => {
    onInfo("Toggle Dark Mode", "Will be available soon.");
  };
  return (
    <div>
      <Button variant={"ghost"} size={"icon"} onClick={handleToggle}>
        <SunIcon className="h-5 w-5 text-blue-950" />
      </Button>
    </div>
  );
}

export function Help() {
  const handleClick = () => {
    onInfo("Chat Support", "Will be available soon.");
  };
  return (
    <div>
      <Button variant={"ghost"} size={"icon"} onClick={handleClick}>
        <ChatBubbleIcon className="h-5 w-5 text-blue-950" />
      </Button>
    </div>
  );
}

export const MobileMenu = () => {
  const handleClick = () => {
    console.log("menu clicked");
  };
  return (
    <motion.div
      initial={{ x: -150, opacity: 0, skewX: `${85}deg` }}
      animate={{ x: 0, skewX: `${0}deg`, opacity: 1 }}
      transition={{
        damping: 1,
        duration: 0.3,
        delay: 4.5,
      }}
    >
      <Button variant={"ghost"} size={"icon"} onClick={handleClick}>
        <MenuIcon className="h-5 w-5 text-blue-950" />
      </Button>
    </motion.div>
  );
};
