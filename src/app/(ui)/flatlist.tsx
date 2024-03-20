import { type ReactElement } from "react";
import { opts } from "@/utils/helpers";
import tw from "tailwind-styled-components";

type RenderItemFunction<T> = (item: T, index?: number) => ReactElement;
type KeyExtractorFunction<T> = (item: T, index: number) => string;

interface FlatListProps<T> {
  bgcolor?: string;
  data: T[] | null;
  renderItem: RenderItemFunction<T>;
  keyExtractor: KeyExtractorFunction<T>;
  horizontal?: boolean;
}

const Horizontal = <T,>({
  data,
  renderItem,
  keyExtractor,
}: FlatListProps<T>) => (
  <Flex>
    {data?.map((item, index) => (
      <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
    ))}
  </Flex>
);

const Vertical = <T,>({ data, renderItem, keyExtractor }: FlatListProps<T>) => (
  <Box>
    {data?.map((item, index) => (
      <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
    ))}
  </Box>
);

function FlatList<T>(props: FlatListProps<T>) {
  const View = () => {
    const options = opts(<Horizontal {...props} />, <Vertical {...props} />);
    return (
      <Box className={props.bgcolor}>
        {options.get(props.horizontal ?? false)}
      </Box>
    );
  };
  return <View />;
}

export default FlatList;

const Flex = tw.div`
  flex items-center justify-center w-full h-32
`
const Box = tw.div`
  flex flex-col items-center justify-center
`
