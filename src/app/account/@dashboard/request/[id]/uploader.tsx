import { type FormEvent, type ReactNode, useCallback } from "react";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { opts, toggleState } from "@/utils/helpers";
import { ImageUploader } from "../../(components)/image-uploader";
import { ImageList } from "./image-list";
import { NeutralCard } from "../../(components)/form-card";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { LoaderIcon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/app/(ui)/button";

export const DocumentUploader = (props: {
  id: string | undefined;
  children: ReactNode;
}) => {
  const { id, children } = props;

  const { fileCount, loading, viewDropzone, setViewDropzone } =
    useDownloadURLs(id);

  const ViewOptions = useCallback(() => {
    const options = opts(
      <ImageUploader
        dir={`requests/${id}`}
        filename={`${id}` + `${fileCount}`}
      />,
      <ImageList id={id} />,
    );
    return (
      <div className="flex h-[340px] w-full items-center justify-center">
        {options.get(viewDropzone)}
      </div>
    );
  }, [viewDropzone, id, fileCount]);

  const handleViewDropzone = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleState(setViewDropzone);
  };

  return (
    <NeutralCard>
      <div className="mb-6 flex justify-between p-2 font-bold md:p-4">
        {children}
        <UploaderExtra
          fileCount={fileCount}
          loading={loading}
          onDropzone={handleViewDropzone}
          dropzoneOpen={viewDropzone}
        />
      </div>
      <ViewOptions />
    </NeutralCard>
  );
};

const UploaderExtra = (props: {
  fileCount: number;
  loading: boolean;
  onDropzone: (e: FormEvent<HTMLButtonElement>) => void;
  dropzoneOpen: boolean;
}) => {
  const { fileCount, loading, onDropzone, dropzoneOpen } = props;
  const FilesLoadingOptions = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 animate-spin stroke-[1px]" />,
      <PhotoIcon className="size-4" />,
    );
    return <>{options.get(loading)}</>;
  }, [loading]);

  return (
    <div className="flex items-center space-x-2 font-light md:space-x-4">
      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-sky-500 text-xs font-medium tracking-tight text-zap transition-all duration-300 ease-out hover:text-white active:scale-[95%] md:space-x-2"
        onClick={(e: FormEvent<HTMLButtonElement>) => e.preventDefault()}
      >
        <FilesLoadingOptions />
        <div className="flex items-center space-x-1">
          <p className="animate-jump-in font-mono font-light">
            {fileCount ?? 0}
          </p>
        </div>
      </Button>

      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-white font-sans text-xs font-medium tracking-tight text-sky-600 shadow-sm transition-all duration-300 ease-out hover:text-sky-500 active:scale-[95%] md:w-[150px]"
        onClick={onDropzone}
      >
        <UploadCloudIcon className="size-4 stroke-[1.5px]" />
        <p>{dropzoneOpen ? "View Files" : "Open uploader"}</p>
      </Button>
    </div>
  );
};
