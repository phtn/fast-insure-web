import { ItemContent } from "./content";

export type ItemPageProps = {
  params: {
    id: string;
  };
};
const PageDefault = (props: ItemPageProps) => <ItemContent {...props} />;
export default PageDefault;
