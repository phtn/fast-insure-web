import { AgentCodes, Request } from "./codes";
import { TabContent } from "../../../(components)/styles";
import { useManagerTools } from "./hooks";
import { useAgentTools } from "../../agent1/tools/hooks";

type ToolContentProps = {
  userId: string | undefined;
  branchCode: string | undefined;
};
export const Tools = (props: ToolContentProps) => {
  const { userId, branchCode } = props;
  const { agentCode, storingCode, handleGenerate } = useManagerTools({
    userId,
    branchCode,
  });
  const { handleCreateRequest, loading } = useAgentTools({
    userId,
  });
  return (
    <TabContent value="tools">
      <div className="grid grid-cols-1 gap-4 border-0 border-sky-500 p-2 md:grid-cols-2">
        <AgentCodes
          code={agentCode}
          onClick={handleGenerate}
          storingCode={storingCode}
        />
        <Request onClick={handleCreateRequest} loading={loading} />
      </div>
    </TabContent>
  );
};
