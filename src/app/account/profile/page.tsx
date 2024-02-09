import { TabsContent } from "../../_components/tabs";
import { Header } from "../header";
import { Content } from "./content";

const Profile = () => {
  return (
    <TabsContent
      value="profile"
      className="h-full flex-col border-none p-0 data-[state=active]:flex"
    >
      <Header title="Account" description="View and Edit settings." />
      <Content />
    </TabsContent>
  );
};

export default Profile;
