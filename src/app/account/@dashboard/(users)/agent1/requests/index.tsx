import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext, useState } from "react";
import { AgentContext } from "../../../(context)/context";
import { AuthContext } from "@/app/(context)/context";
import { toggleState } from "@/utils/helpers";
import { Recents } from "../../../(components)/recents";

export const Requests = () => {
  const agent = useContext(AgentContext);
  const profile = useContext(AuthContext)?.profile;
  const data = agent?.requests;
  const [timelineVisible, setTimelineVisible] = useState(true);
  const toggleTimeline = () => toggleState(setTimelineVisible);

  return (
    <TabContent value="requests">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={agent?.loading ?? false}
        toolbarActions={[timelineVisible, toggleTimeline]}
      />
      <Recents
        visible={timelineVisible}
        onToggle={toggleTimeline}
        timeline={profile?.timeline}
      />
    </TabContent>
  );
};
