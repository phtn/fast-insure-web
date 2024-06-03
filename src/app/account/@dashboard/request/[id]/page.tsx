import { AgentContextProvider } from "../../(context)/context";
import { RequestPage } from "./content";
type RequestProps = {
  params: {
    id: string;
  };
};
const Request = ({ params }: RequestProps) => (
  <AgentContextProvider>
    <RequestPage {...params} />
  </AgentContextProvider>
);
export default Request;
