import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext } from "react";
import { AgentContext } from "../../../(context)/context";

export const Requests = () => {
  const agent = useContext(AgentContext);
  const data = agent?.requests;

  return (
    <TabContent value="requests">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={agent?.loading ?? false}
      />
    </TabContent>
  );
};
