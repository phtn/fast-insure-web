import { ActivationContent } from "./content";
interface PageWithId {
  params: {
    agentCode: string;
  };
}
export default async function ActivationPage({ params }: PageWithId) {
  return <ActivationContent {...params} />;
}
