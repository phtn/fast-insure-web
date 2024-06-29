import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext } from "react";
import { AgentContext } from "../../../(context)/context";

export const Drafts = () => {
  const ctx = useContext(AgentContext);
  const data = ctx?.drafts;

  return (
    <TabContent value="drafts">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.loading ?? false}
      />
    </TabContent>
  );
};
