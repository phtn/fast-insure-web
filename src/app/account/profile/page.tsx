import { TabsContent } from "../../_components/tabs";
import { Content } from "./content";

const Profile = () => {
  return (
    <div>
      <TabsContent
        value="profile"
        className="space-y-8 border-none p-0 outline-none"
      >
        <div className="h-[25px]" />
        <Content />
      </TabsContent>

      <div className="h-[210px] bg-white"></div>
    </div>
  );
};

export default Profile;
