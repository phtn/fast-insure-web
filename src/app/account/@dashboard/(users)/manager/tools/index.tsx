import { AgentCodes, Request } from "./tools";
import { TabContent } from "../../../(components)/styles";
import { useManagerTools } from "./hooks";
import { useAgentTools } from "../../agent1/tools/hooks";
import { useEffect, useState } from "react";
import { HistoryIcon } from "lucide-react";
import { QrViewer } from "../../../(components)/qr/viewer";

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

        <div className="h-full w-full rounded-3xl border bg-white p-6">
          <div className="h-[calc(100vh-230px)]">
            <div className="flex items-center space-x-4">
              <HistoryIcon className="size-4.5 stroke-1 text-neutral-500" />
              <p>Recents</p>
            </div>
          </div>
        </div>
        <QrViewer
          code={agentCode?.substring(0, 9)}
          open={qrView}
          setOpen={setQrView}
        />
      </div>
    </TabContent>
  );
};
