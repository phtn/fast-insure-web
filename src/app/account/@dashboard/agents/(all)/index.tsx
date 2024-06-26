import { TabContent } from "../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext } from "react";
import { ManagerContext } from "../../(context)/context";

export const AllAgents = () => {
  const ctx = useContext(ManagerContext);
  const data = ctx?.allAgents;

  return (
    <TabContent value="all">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.fetchingAgents ?? false}
      />
    </TabContent>
  );
};
