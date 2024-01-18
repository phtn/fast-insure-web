"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { Button } from "./_components/button";
import { CookieIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { opts } from "@/utils/helpers";

const CookieDough = ({ onClick }: { onClick: () => void }) => (
  <Container>
    <Content
      initial={{ y: 800, scaleY: 0.2 }}
      animate={{ y: 0, scaleY: 1 }}
      transition={{
        duration: 1,
        delay: 4.5,
        damping: 4,
      }}
    >
      <CookieIcon className="h-12 w-12 text-blue-600" />
      We use cookies to make your experience on our websites better. By using
      and further navigating this website you accept this. Detailed information
      about the use of cookies on this website is available and can be viewed by
      clicking on more info.
      <Button asChild variant="borderline" size="lg">
        <Link href="#">
          <InfoCircledIcon className="mr-2" /> More Info
        </Link>
      </Button>
      <Button variant="default" size="lg" onClick={onClick}>
        Accept & Close
      </Button>
    </Content>
  </Container>
);

export const Dough = () => {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  const handleAccept = () => {
    setCookieAccepted(true);
  };
  const CookieOptions = useCallback(() => {
    const options = opts(<></>, <CookieDough onClick={handleAccept} />);

    return <>{options.get(cookieAccepted)}</>;
  }, [cookieAccepted]);
  return <CookieOptions />;
};

const Container = tw.div`
  h-[150px] w-[calc(100vw-100px)] flex items-center justify-center w-full
  absolute top-[85vh]

`;

const Content = tw(motion.div)`
  bg-gradient-to-r from-orange-50 from-33% via-blue-100 to-69% to-orange-100 to-100% 
  h-[100px] md:w-[calc(100vw-300px)] rounded-[16px]
  text-blue-950 text-[14px] 
  py-1 px-8 flex items-center justify-around gap-8 
`;
