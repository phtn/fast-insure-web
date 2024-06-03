import { CardFooter } from "@/app/(ui)/card";
import { Card } from "../../../(components)/card";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import { AgentCodes } from "./codes";
import { TabContent } from "../../../(components)/styles";
import { useTools } from "./hooks";

type ToolContentProps = {
  userId: string | undefined;
};
export const Tools = ({ userId }: ToolContentProps) => {
  const { agentCode, storingCode, handleGenerate } = useTools({ userId });
  return (
    <TabContent value="tools">
      <div className="grid grid-cols-1 gap-4 border-0 border-sky-500 md:grid-cols-2">
        <AgentCodes
          code={agentCode}
          onClick={handleGenerate}
          storingCode={storingCode}
        />
        <Card
          title="Create Client Account"
          description="Add a new client to your list."
          onClick={() => console.log("create")}
          icon={UserPlusIcon}
          actionIcon={PlusIcon}
          actionLabel="Create"
        />
      </div>
      <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
    </TabContent>
  );
};
