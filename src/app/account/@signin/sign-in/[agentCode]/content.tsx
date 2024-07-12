"use client";

import tw from "tailwind-styled-components";
import Lobby from "../../lobby";

export const SignInContent = (params: { agentCode: string }) => {
  return (
    <Container>
      <Lobby {...params} />
    </Container>
  );
};

const Container = tw.div`
  bg-zap h-[calc(100vh-72px)]
`;
