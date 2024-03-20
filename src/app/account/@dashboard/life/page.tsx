import { TabsContent } from "@@ui/tabs";
import { Content } from "./content";

const Life = async () => {
  return (
    <TabsContent value="life" className="border-none p-0 outline-none">
      {/* <Header
        title="Life Protection Plans"
        description="Financial Security Protection for you and your family."
        icon={SproutIcon}
      /> */}
      <Content />
    </TabsContent>
  );
};

export default Life;
