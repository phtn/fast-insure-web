import { TabContent } from "../../../(components)/styles";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useContext } from "react";
import { ManagerContext } from "../../../(context)/context";

export const Codes = () => {
  const ctx = useContext(ManagerContext);
  const data = ctx?.codes;

  return (
    <TabContent value="codes" className="w-full">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={ctx?.loading ?? false}
      />
    </TabContent>
  );
};
