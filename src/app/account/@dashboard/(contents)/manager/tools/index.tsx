import { AgentCodes, Request } from "./tools";
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
      <div className="grid grid-cols-1 gap-8 border-[0.33px] border-dyan/20 p-8 md:grid-cols-3">
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
