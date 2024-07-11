import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext, useState } from "react";
import { AgentContext } from "../../../(context)/context";
import { Recents } from "../../../(components)/recents";
import { toggleState } from "@/utils/helpers";
import { AuthContext } from "@/app/(context)/context";

export const Drafts = () => {
  const ctx = useContext(AgentContext);
  const profile = useContext(AuthContext)?.profile;
  const data = ctx?.drafts;
  const [timelineVisible, setTimelineVisible] = useState(true);
  const toggleTimeline = () => toggleState(setTimelineVisible);
  return (
    <TabContent value="drafts">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.loading ?? false}
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
