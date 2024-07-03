import LoaderMX from "@/app/(components)/loader-mx";
import { Card, CardContent } from "@/app/(ui)/card";
import { Carousel, CarouselContent, CarouselItem } from "@/app/(ui)/carousel";
import Image from "next/image";
import { type IImageList } from "../../(hooks)/file-handler";

interface ImageListProps {
  id: string | undefined;
  imagelist: IImageList[];
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
            className="pl-1 md:basis-1/2 lg:basis-1/4"
          >
            <div className="rounded-lg p-1 transition-colors duration-300 ease-in-out hover:bg-ash/80">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-square h-full w-full border-0 bg-transparent p-2">
                  <Image
                    key={image.name + i}
                    src={image.url}
                    alt={image.name}
                    width={0}
                    height={0}
                    className="w-auto cursor-zoom-in overflow-clip rounded-md"
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
