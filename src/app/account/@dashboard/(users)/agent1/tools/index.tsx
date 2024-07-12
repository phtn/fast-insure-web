import { CTPLRequest } from "./ctpl";
import { TabContent } from "../../../(components)/styles";
import { useAgentTools } from "./hooks";

export const Tools = () => {
  const { handleCreateRequest, loading } = useAgentTools();
  return (
    <TabContent value="tools">
      <div className="grid h-[calc(100vh-124px)] w-full grid-cols-1 gap-8 border-[0.33px] border-dyan/20 p-8 md:grid-cols-3">
        <div className="col-span-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          <CTPLRequest onClick={handleCreateRequest} loading={loading} />
        </div>
      </div>
    </TabContent>
  );
};
