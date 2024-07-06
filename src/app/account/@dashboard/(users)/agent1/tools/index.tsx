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
          {/* <Card
            title="Create Client Account"
            description="Add a new client to your list."
            onClick={() => console.log("create")}
            icon={UserPlusIcon}
            actionIcon={PlusIcon}
            actionLabel="Create"
          /> */}
        </div>
      </div>
    </TabContent>
  );
};
