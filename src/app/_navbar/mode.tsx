"use client";

import { MoonStarIcon } from "lucide-react";
import { Button } from "../_components/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { onInfo } from "@/utils/toast";

export function Mode() {
  const handleToggle = () => {
    onInfo("Toggle Dark Mode", "Will be available soon.");
  };
  return (
    <div>
      <Button
        aria-label="Dark Mode"
        variant={"ghost"}
        size={"icon"}
        onClick={handleToggle}
      >
        <MoonStarIcon strokeWidth={1.5} className="h-5 w-5 text-blue-950" />
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
      <Button
        aria-label="Chat"
        variant={"ghost"}
        size={"icon"}
        onClick={handleClick}
      >
        <ChatBubbleIcon className="h-5 w-5 text-blue-950" />
      </Button>
    </div>
  );
}
