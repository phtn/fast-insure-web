import { AgentCodes, Request } from "./tools";
import { TabContent } from "../../../(components)/styles";
import { useManagerTools } from "./hooks";
import { useAgentTools } from "../../agent1/tools/hooks";
import { useEffect, useState } from "react";
import { QrViewer } from "../../../(components)/qr/viewer";
import { Recents } from "./recents";

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

  const [qrView, setQrView] = useState(false);

  useEffect(() => {
    if (agentCode && !storingCode) {
      setQrView(true);
    }
  }, [agentCode, storingCode]);

  return (
    <TabContent value="tools">
      <div className="grid h-[calc(100vh-124px)] w-full grid-cols-1 gap-8 border-[0.33px] border-dyan/20 p-8 md:grid-cols-3">
        <div className="col-span-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          <AgentCodes
            code={agentCode}
            onClick={handleGenerate}
            storingCode={storingCode}
          />
          <Request onClick={handleCreateRequest} loading={loading} />
        </div>

        <Recents />
        <QrViewer
          code={agentCode?.substring(0, 9)}
          open={qrView}
          setOpen={setQrView}
        />
      </div>
    </TabContent>
  );
};
