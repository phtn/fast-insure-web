import { ref } from "firebase/storage";
import { useCallback, useMemo, type ChangeEvent } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { LoaderIcon, UploadCloudIcon, UploadIcon, XIcon } from "lucide-react";
import { ImageFile } from "@/app/(ui)/input";
import Image from "next/image";

import { Button } from "@/app/(ui)/button";
import { opts } from "@/utils/helpers";
import { cn } from "@/utils/cn";
import { useFileHandler } from "../(hooks)/file-handler";
import { storage } from "@/libs/db";
import tw from "tailwind-styled-components";

type UploaderProps = {
  dir: string;
  filename: string;
  downloadUrl?: string | undefined;
};
export const ImageUploader = (props: UploaderProps) => {
  const { dir, filename, downloadUrl } = props;
  const [uploadFile, uploading, snapshot] = useUploadFile();
  const storageRef = ref(storage, `${dir}/${filename}`);

  const { file, handleFileChange, handleFileRemove, imageData } =
    useFileHandler();

  const bytes = useMemo(
    () =>
      (Number(snapshot?.bytesTransferred) / Number(snapshot?.totalBytes)) * 100,
    [snapshot],
  );

  const ImageOptions = useCallback(() => {
    const upload = async () => {
      if (file) {
        return await uploadFile(storageRef, file);
      }
      handleFileRemove();
    };
    const withImage = imageData !== null;
    const options = opts(
      <ImageViewer
        file={file}
        imageData={imageData}
        upload={upload}
        uploading={uploading}
        bytes={bytes}
        removeItem={handleFileRemove}
        downloadUrl={downloadUrl}
      />,
      <Dropzone fileChange={handleFileChange} />,
    );
    return <>{options.get(withImage)}</>;
  }, [
    imageData,
    bytes,
    file,
    handleFileChange,
    uploading,
    storageRef,
    uploadFile,
    downloadUrl,
    handleFileRemove,
  ]);

  return (
    <div className="flex h-full w-full cursor-pointer">
      <ImageOptions />
    </div>
  );
};

type DropzoneProps = {
  fileChange: (e: FileList | null) => void;
};
export const Dropzone = ({ fileChange }: DropzoneProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    fileChange(e.target.files);
  };
  return (
    <div className="rounded-lg bg-white">
      <ImageFile
        type="file"
        name="upload"
        icon={UploadCloudIcon}
        onChange={onChange}
        placeholder="Product image"
      />
    </div>
  );
};

type ImageViewerProps = {
  bytes: number;
  file: File | undefined;
  imageData: string | null;
  upload: () => void;
  uploading: boolean;
  removeItem: () => void;
  downloadUrl: string | undefined;
};
export const ImageViewer = ({
  bytes,
  file,
  imageData,
  upload,
  uploading,
  removeItem,
  downloadUrl,
}: ImageViewerProps) => {
  const ImageOptions = useCallback(() => {
    const withImage = imageData !== null;
    const options = opts(
      <ImageComp
        alt={file?.name ?? ""}
        className=""
        src={`${imageData ?? "/"}`}
        width={0}
        height={0}
      />,
      <div />,
    );
    return <>{options.get(withImage)}</>;
  }, [imageData, file?.name]);

  const BytesUploaded = useCallback(() => {
    const options = opts(
      <p className="flex h-[36px] w-[64px] items-center justify-center rounded bg-void/20 px-2 text-center font-mono text-[10px] text-white backdrop-blur-lg">
        {bytes?.toFixed(0) ?? 0}
        <span className="-mb-0.5 pl-[1px] text-[7px] opacity-50">%</span>
      </p>,
      <p />,
    );
    return <>{options.get(uploading)}</>;
  }, [bytes, uploading]);

  const StatusOptions = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 animate-spin text-white" />,
      <UploadIcon className="size-4 stroke-[1.5px] text-white" />,
    );
    return <>{options.get(uploading)}</>;
  }, [uploading]);
  return (
    <div className="w-full space-y-4">
      <div className="portait:w-[80px] relative flex h-[200px] w-full items-center justify-center overflow-clip rounded-lg border bg-gradient-to-r from-gray-800/80 to-gray-800/40 shadow-inner portrait:h-[64px]">
        {downloadUrl ? (
          <ImageComp alt={downloadUrl} src={downloadUrl} width={0} height={0} />
        ) : (
          <ImageOptions />
        )}

        <div
          className={cn(
            "left-[176px]",
            "absolute top-1 flex items-center space-x-1",
          )}
        >
          <Button
            onClick={removeItem}
            className={cn(
              "h-[30px] w-[30px] space-x-2 bg-slate-900/40 px-2 text-xs hover:bg-rose-500",
            )}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <div></div>
      </div>

      <div className="relative -top-[56px] left-[4px] flex space-x-4">
        <Button
          onClick={upload}
          className={cn(
            "flex h-[36px] w-[120px] items-center justify-between bg-blue-500 px-4 text-xs hover:bg-emerald-500",
            !file ? `bg-gray-100` : ``,
          )}
        >
          <p>{uploading ? `Uploading` : "Upload"}</p>
          <StatusOptions />
        </Button>

        <BytesUploaded />
      </div>
    </div>
  );
};

const ImageComp = tw(Image)`
  absolute h-[200px] w-[200px] transition-all duration-500 ease-in-out hover:scale-[250%] portrait:h-[64px] portrait:w-[80px]
  `;
