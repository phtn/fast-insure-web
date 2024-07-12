import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext, useState } from "react";
import { ManagerContext } from "../../../(context)/context";
import { Recents } from "./recents";
import { toggleState } from "@/utils/helpers";
import { AuthContext } from "@/app/(context)/context";

export const Requests = () => {
  const ctx = useContext(ManagerContext);
  const profile = useContext(AuthContext)?.profile;
  const data = ctx?.requests;

  const [timelineVisible, setTimelineVisible] = useState(true);
  const toggleTimeline = () => toggleState(setTimelineVisible);

  return (
    <TabContent value="requests">
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
