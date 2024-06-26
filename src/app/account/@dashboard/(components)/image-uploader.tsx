import { ref } from "firebase/storage";
import { useCallback, type ChangeEvent } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { LoaderIcon, UploadCloudIcon, UploadIcon, XIcon } from "lucide-react";
import { ImageFile } from "@/app/(ui)/input";
import Image from "next/image";

import { Button } from "@/app/(ui)/button";
import { errHandler, onCount, opts } from "@/utils/helpers";
import { cn } from "@/utils/cn";
import { useFileHandler } from "../(hooks)/file-handler";
import { storage } from "@/libs/db";
import tw from "tailwind-styled-components";
import { onSuccess } from "@/utils/toast";

type UploaderProps = {
  dir: string;
  filename: string;
  downloadUrl?: string | undefined;
};
export const ImageUploader = (props: UploaderProps) => {
  const { dir, filename, downloadUrl } = props;
  const [uploadFile, uploading, snapshot] = useUploadFile();
  const storageRef = ref(storage, `${dir}/${filename}`);

  ///
  console.log(onCount());
  ///

  const { file, handleFileChange, handleFileRemove, imageData } =
    useFileHandler();

  const bytes =
    (Number(snapshot?.bytesTransferred) / Number(snapshot?.totalBytes)) * 100;

  const ImageOptions = useCallback(() => {
    const upload = async () => {
      if (file) {
        return uploadFile(storageRef, file)
          .then(() => {
            onSuccess("file uploaded.");
          })
          .catch(errHandler)
          .finally(() => {
            handleFileRemove();
          });
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
    return <div className="h-[360px] w-[400px]">{options.get(withImage)}</div>;
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
    <div className="flex h-[280px] w-full cursor-pointer items-center justify-around space-x-4 rounded-xl bg-ghost bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-800/75 to-yellow-500 px-10 backdrop-blur-lg">
      <ImageOptions />
      <AcceptedFormats />
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
    <div className="h-[360px] w-[400px] overflow-auto rounded-3xl bg-white shadow-xl">
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
      <p className="flex h-[36px] w-[64px] items-center justify-center rounded bg-zap px-2 text-center font-mono text-[10px] text-coal backdrop-blur-lg">
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
      <div className="portait:w-[80px] relative flex h-[360px] w-full items-center justify-center overflow-clip rounded-lg border bg-gradient-to-r from-gray-800/80 to-gray-800/40 shadow-inner portrait:h-[64px]">
        {downloadUrl ? (
          <ImageComp alt={downloadUrl} src={downloadUrl} width={0} height={0} />
        ) : (
          <ImageOptions />
        )}

        <div
          className={cn(
            "left-[364px]",
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
            "flex h-[36px] w-[120px] items-center justify-between bg-sky-500 px-4 text-xs hover:bg-emerald-500",
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
  absolute h-[200px] w-auto transition-all duration-500 ease-in-out hover:scale-[250%] portrait:h-[64px] portrait:w-[80px]
  `;

const AcceptedFormats = () => (
  <div className="space-y-6">
    <div className="grid w-[250px] grid-cols-3 place-items-center gap-1 align-middle">
      <div className="h-[48px] w-[44px] bg-[url('/images/jpg.png')] bg-cover" />
      <div className="h-[48px] w-[44px] bg-[url('/images/png.png')] bg-cover" />
      <div className="h-[48px] w-[44px] bg-[url('/images/svg.png')] bg-cover" />
    </div>
    <div className="grid w-[250px] grid-cols-3 place-items-center gap-1 align-middle">
      <div className="h-[48px] w-[44px] bg-[url('/images/pdf.png')] bg-cover" />
      <div className="h-[48px] w-[44px] bg-[url('/images/mp4.png')] bg-cover" />
      <div className="h-[58px] w-[52px] bg-[url('/images/webp.png')] bg-cover" />
    </div>
    <div className="flex items-center justify-center text-ghost">
      <div>
        <p className="text-center text-sm tracking-tight text-ghost">
          Supported formats
        </p>
        <div className="flex items-start justify-center ">
          <p className="font-k2d text-[10px] font-light uppercase text-ash/90">
            jpg, png, svg, webp, pdf & mp4
          </p>
        </div>
      </div>
    </div>
  </div>
);
