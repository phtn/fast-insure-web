import { type FormEvent, useCallback, useState } from "react";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { opts, toggleState } from "@/utils/helpers";
import { ImageUploader } from "../../(components)/image-uploader";
import ImageList from "./image-list";
import { NeutralCard } from "../../(components)/form-card";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { LoaderIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/app/(ui)/button";

export const DocumentUploader = (props: { id: string | undefined }) => {
  const { id } = props;

  const [viewDropzone, setViewDropzone] = useState(false);
  const { imagelist, loading } = useDownloadURLs(id, viewDropzone);

  const ImageListReload = useCallback(() => {
    if (!viewDropzone) {
      return <ImageList id={id} imagelist={imagelist} loading={loading} />;
    }
  }, [id, imagelist, loading, viewDropzone]);

  const ViewOptions = useCallback(() => {
    const options = opts(
      <ImageUploader
        dir={`requests/${id}`}
        filename={`${id}` + `${imagelist?.length}`}
      />,
      <ImageListReload />,
    );
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        {options.get(viewDropzone)}
      </div>
    );
  }, [viewDropzone, id, imagelist, ImageListReload]);

  const handleViewDropzone = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleState(setViewDropzone);
  };

  return (
    <NeutralCard>
      <div className="mb-6 flex justify-between border-b-[0.33px] border-neutral-500 p-4 font-bold">
        <div>File upload</div>
        <UploaderExtra
          filecount={imagelist.length}
          loading={loading}
          viewDropzone={handleViewDropzone}
        />
      </div>
      <ViewOptions />
    </NeutralCard>
  );
};

const UploaderExtra = (props: {
  filecount: number;
  loading: boolean;
  viewDropzone: (e: FormEvent<HTMLButtonElement>) => void;
}) => {
  const { filecount, loading, viewDropzone } = props;
  const FilesLoadingOptions = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 animate-spin stroke-[1px]" />,
      <PhotoIcon className="size-4" />,
    );
    return <>{options.get(loading)}</>;
  }, [loading]);

  return (
    <div className="flex items-center space-x-4 font-light">
      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-sky-500 text-xs font-medium tracking-tight text-zap transition-all duration-300 ease-out hover:text-white active:scale-[95%]"
        onClick={(e: FormEvent<HTMLButtonElement>) => e.preventDefault()}
      >
        <FilesLoadingOptions />
        <p>{filecount ?? 0}</p>
        <p>files</p>
      </Button>

      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-white font-sans text-xs font-medium tracking-tight text-sky-600 shadow-sm transition-all duration-300 ease-out hover:text-sky-500 active:scale-[95%]"
        onClick={viewDropzone}
      >
        <UploadCloudIcon className="size-4 stroke-[1.5px]" />
        <p>Open uploader</p>
      </Button>
    </div>
  );
};
