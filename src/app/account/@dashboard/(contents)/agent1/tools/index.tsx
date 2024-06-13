import { Card } from "../../../(components)/card";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import { CTPLRequest } from "./ctpl";
import { TabContent } from "../../../(components)/styles";
import { useAgentTools } from "./hooks";

type ToolContentProps = {
  userId: string | undefined;
};
export const Tools = ({ userId }: ToolContentProps) => {
  const { handleCreateRequest, loading } = useAgentTools({ userId });
  return (
    <TabContent value="tools">
      <div className="grid grid-cols-1 gap-4 border-0 border-sky-500 p-2 md:grid-cols-2">
        <CTPLRequest onClick={handleCreateRequest} loading={loading} />
        <Card
          title="Create Client Account"
          description="Add a new client to your list."
          onClick={() => console.log("create")}
          icon={UserPlusIcon}
          actionIcon={PlusIcon}
          actionLabel="Create"
        />
      </div>
    </TabContent>
  );
};
