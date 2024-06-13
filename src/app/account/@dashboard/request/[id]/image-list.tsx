import LoaderMX from "@/app/(components)/loader-mx";
import { Card, CardContent } from "@/app/(ui)/card";
import { Carousel, CarouselContent, CarouselItem } from "@/app/(ui)/carousel";
import Image from "next/image";
import { ImageList } from "../../(hooks)/file-handler";

interface ImageListProps {
  id: string | undefined;
  imagelist: ImageList[];
  loading: boolean;
}
const ImageList: React.FC<ImageListProps> = ({ imagelist, loading }) => {
  if (loading) {
    return <LoaderMX />;
  }
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {imagelist.map((image, i) => (
          <CarouselItem
            key={image.name + i}
            className="pl-1 md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-0">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-square h-full w-full border-0 bg-transparent p-2">
                  <Image
                    key={image.name + i}
                    src={image.url}
                    alt={image.name}
                    width={0}
                    height={0}
                    className="boder-clay h-full w-auto rounded-md border shadow-md"
                    unoptimized
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageList;
