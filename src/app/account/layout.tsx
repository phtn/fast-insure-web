import { type ReactNode } from "react";
import { Triggers } from "./triggers";
import { Tabs } from "../_components/tabs";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen bg-paper bg-gradient-to-r from-paper via-blue-200 to-paper portrait:h-fit">
      <Tabs defaultValue="travel" className="h-full space-y-8">
        <Triggers />
        {children}
      </Tabs>
    </div>
  );
}
