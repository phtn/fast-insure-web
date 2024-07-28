import {
  DocumentTextIcon,
  QrCodeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { PanelCard, PanelContent } from "../../../(components)/panel-card";
import { TabContent } from "../../../(components)/styles";
// import { FBar } from "./charts/fbar";
// import { HBar } from "./charts/hbar";
import { VBar } from "./charts/vbar";
import { useContext } from "react";
import { ManagerContext } from "../../../(context)/context";
import { TrendingUpIcon } from "lucide-react";

export const Activity = () => {
  const managerCtx = useContext(ManagerContext);
  const requests = managerCtx?.requests;
  const agents = managerCtx?.allAgents;
  const codes = managerCtx?.codes;
  return (
    <TabContent value="activity">
      <div className="w-full space-y-6 border-t-[0.33px] border-neutral-300 p-6">
        <div className="grid h-[225px] grid-cols-1 gap-2 p-5 md:grid-cols-4 md:gap-6">
          <PanelCard
            title="Completed Requests"
            tag="JUL → AUG"
            icon={DocumentTextIcon}
          >
            <PanelContent
              metricValue={requests?.length ?? 0}
              metricKey="up 5% from last month"
            />
          </PanelCard>
          <PanelCard title="No. of Agents" tag="" icon={UsersIcon}>
            <PanelContent
              metricValue={agents?.length ?? 0}
              metricKey="up 2% from last month"
            />
          </PanelCard>
          <PanelCard title="Codes Generated" tag="" icon={QrCodeIcon}>
            <PanelContent
              metricValue={codes?.length ?? 0}
              metricKey="up 5% from last month"
            />
          </PanelCard>
          <PanelCard title="Overall Growth" tag="" icon={TrendingUpIcon}>
            <PanelContent
              metricValue={"15%"}
              metricKey="up 1% from last month"
            />
          </PanelCard>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
          <div className="flex items-center justify-center">
            <VBar requests={requests} />
          </div>
          {/* <div className="flex items-center justify-center"> */}
          {/*   <HBar /> */}
          {/* </div> */}
          {/* <div className="flex items-center justify-center"> */}
          {/*   <FBar /> */}
          {/* </div> */}
        </div>
      </div>
    </TabContent>
  );
};
