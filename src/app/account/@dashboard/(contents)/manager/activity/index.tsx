import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext } from "react";
import { AgentContext } from "../../../(context)/context";

export const Activity = () => {
  const ctx = useContext(AgentContext);
  const data = ctx?.requests;
  return (
    <TabContent value="activity">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.loading ?? false}
      />
    </TabContent>
  );
};
