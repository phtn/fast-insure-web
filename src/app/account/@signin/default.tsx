import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import LoaderMX from "@/app/(components)/loader-mx";

const DynamicLobby = dynamic(() => import("./lobby"), {
  loading: LoaderMX,
});

export default async function SignIn() {
  return (
    <Container>
      <DynamicLobby />
    </Container>
  );
}

const Container = tw.div`
  bg-zap h-[calc(100vh-72px)]
`;
