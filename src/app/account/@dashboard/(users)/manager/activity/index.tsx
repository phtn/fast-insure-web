import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext, useState } from "react";
import { ManagerContext } from "../../../(context)/context";
import { Recents } from "./recents";
import { toggleState } from "@/utils/helpers";

export const Activity = () => {
  const ctx = useContext(ManagerContext);
  const data = ctx?.requests;

  const [timelineVisible, setTimelineVisible] = useState(true);
  const toggleTimeline = () => toggleState(setTimelineVisible);

  return (
    <TabContent value="activity">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.loading ?? false}
        toolbarActions={[timelineVisible, toggleTimeline]}
      />
      <Recents visible={timelineVisible} onToggle={toggleTimeline} />
    </TabContent>
  );
};
