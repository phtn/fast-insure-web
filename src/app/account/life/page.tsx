import { TabsContent } from "@@components/tabs";
import { Content } from "./content";
import { Header } from "../header";
import { SproutIcon } from "lucide-react";

const Life = async () => {
  return (
    <TabsContent value="life" className="border-none p-0 outline-none">
      <Header
        title="Life Protection Plans"
        description="Financial Security Protection for you and your family."
        icon={SproutIcon}
      />
      <Content />
    </TabsContent>
  );
};

export default Life;
