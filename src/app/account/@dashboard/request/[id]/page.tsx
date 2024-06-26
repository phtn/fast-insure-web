import { AgentContextProvider } from "../../(context)/context";
import { RequestForm } from "./request-form";
type RequestProps = {
  params: {
    id: string;
  };
};
const Request = ({ params }: RequestProps) => (
  <AgentContextProvider>
    {/* <RequestPage {...params} /> */}
    <RequestForm {...params} />
  </AgentContextProvider>
);
export default Request;
