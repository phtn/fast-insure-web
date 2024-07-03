import { RequestViewerContent } from "./content";

interface RequestViewerProps {
  params: {
    id: string | undefined;
  };
}
export default async function RequestViewer({ params }: RequestViewerProps) {
  return <RequestViewerContent {...params} />;
}
