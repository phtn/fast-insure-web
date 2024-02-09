import { TabsContent } from "@@components/tabs";
import { Content } from "./content";

const Life = async () => {
  return (
    <TabsContent
      value="life"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Life Plans</h2>
          <p className="text-muted-foreground text-sm">
            Go wander and get lost on a wild adventure in Gaza.
          </p>
        </div>
      </div>
      <Content />
    </TabsContent>
  );
};

export default Life;
