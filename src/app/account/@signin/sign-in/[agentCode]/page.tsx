import { SignInContent } from "./content";

interface SignInProps {
  params: {
    agentCode: string;
  };
}
export default async function SignIn({ params }: SignInProps) {
  return <SignInContent {...params} />;
}
