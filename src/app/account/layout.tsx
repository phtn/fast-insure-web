import { type ReactNode } from "react";
import { Triggers } from "./triggers";
import { Tabs } from "../_components/tabs";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portrait:h-fit h-screen bg-paper px-24 py-12">
      <Tabs defaultValue="autos" className="h-full space-y-12">
        <Triggers />
        {children}
      </Tabs>
    </div>
  )
}




