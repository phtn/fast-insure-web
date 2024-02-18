import { TabsContent } from "@@components/tabs";
import { ProtectionContent } from "./content";
import { Header } from "../header";
import { BusIcon, PlaneTakeoff, SailboatIcon, ShipIcon } from "lucide-react";

const Travel = async () => {
  return (
    <TabsContent
      value="travel"
      className="space-y-8 border-none p-0 outline-none"
    >
      <Header
        title="Travel Protection"
        description="Ensure your peace of mind while travelling."
        icons={[SailboatIcon, BusIcon, ShipIcon, PlaneTakeoff]}
      />
      <ProtectionContent />
    </TabsContent>
  );
};

export default Travel;
