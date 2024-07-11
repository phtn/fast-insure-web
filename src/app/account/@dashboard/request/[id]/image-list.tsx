import { Card, CardContent } from "@/app/(ui)/card";
import { Carousel, CarouselContent, CarouselItem } from "@/app/(ui)/carousel";
import Image from "next/image";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import Link from "next/link";

interface ImageListProps {
  id: string | undefined;
}
export const ImageList = ({ id }: ImageListProps) => {
  const { imagelist } = useDownloadURLs(id);

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {imagelist?.map((image, i) => (
          <CarouselItem
            key={image.name + `_${i}`}
            className="pl-1 md:basis-1/2 lg:basis-1/4"
          >
            <div className="bg-transparent p-4">
              <Link href={image.url} target="about_blank">
                <Card className="rounded-lg border-0 bg-teal-400/50 shadow-lg transition-shadow duration-300 ease-out hover:shadow-xl">
                  <CardContent className="flex aspect-square h-full w-full border-0 bg-transparent p-1">
                    <Image
                      src={image.url}
                      alt={`Preview`}
                      width={0}
                      height={0}
                      className="w-auto cursor-zoom-in overflow-clip rounded-md"
                      unoptimized
                      priority
                    />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
