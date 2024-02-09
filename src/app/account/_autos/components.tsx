import { Button } from "@/app/_components/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/dialog";
import { InputFile } from "@/app/_components/input";
import { type OCR_DE_BASE64_Schema } from "@/server/resource/ocr";
import { fileSize, fileType, limitText } from "@/utils/helpers";
import {
  CheckCircleIcon,
  FileTextIcon,
  InfoIcon,
  MousePointerSquareDashedIcon,
  ShieldCheckIcon,
  UploadIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { type ChangeEvent } from "react";
import { type UploadStatus } from "./hooks";

export const Title = () => (
  <DialogHeader className="my-3 border-b-2 border-ash/50 pb-2">
    <DialogTitle className="text-fast md:text-2xl">Add New Vehicle</DialogTitle>
    <DialogDescription className="flex items-center space-x-1 text-clay">
      <InfoIcon className="h-4 w-4 text-blue-400" />
      <span>
        {`Upload your vehicle's Certificate of Registration to autofill the form.`}
      </span>
    </DialogDescription>
  </DialogHeader>
);

type HeaderProps = {
  title: string;
  icon: LucideIcon;
};

export const Header = (props: HeaderProps) => (
  <div className="flex items-center space-x-3 px-2">
    <props.icon className="h-6 w-6 text-clay" strokeWidth={1} />
    <p className="text-lg font-medium tracking-tighter text-coal">
      {props.title}
    </p>
  </div>
);

type FileInfoProps = {
  file: File | null;
  removeFile: () => void;
};

export const FileInfo = ({ file, removeFile }: FileInfoProps) => (
  <div className="flex h-[132px] flex-col items-stretch justify-center space-y-3 rounded-lg border border-blue-400 bg-white p-3">
    <div className="flex items-center justify-between ">
      <div className="flex items-center space-x-2">
        <div className="flex w-8 items-center justify-center">
          <FileTextIcon className="text-blue-500" strokeWidth={1} />
        </div>
        <div className="space-y-[1px] overflow-clip">
          <div className="w-full ">
            <span className="font-mono text-sm font-medium text-fast">
              {limitText(file?.name, 25)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[12px] uppercase tracking-tight text-clay">
              {fileType(file?.type)}
            </span>
            <span className="font-mono text-[12px] text-clay">
              {fileSize(file?.size)}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="casper"
          size="icon"
          className="hover:bg-paper"
          onClick={removeFile}
        >
          <XIcon className="text-clay" strokeWidth={1} />
        </Button>
      </div>
    </div>
    <div className="flex h-[50px] w-full items-center justify-evenly rounded-lg bg-blue-100/50 text-sm">
      <div className="flex items-center justify-center space-x-2">
        <span className="uppercase text-coal">FORMAT</span>
        <CheckCircleIcon
          strokeWidth={1.5}
          className="h-4 w-4 text-blue-600"
          fill="#bfdbfe"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <span className="uppercase text-coal">Ready</span>
        <CheckCircleIcon
          strokeWidth={1.5}
          className="h-4 w-4 text-blue-600"
          fill="#bfdbfe"
        />
      </div>
    </div>
  </div>
);

export const TryBanner = () => (
  <div className="flex h-[132px] flex-col items-center justify-center space-y-4 rounded-lg border border-blue-400 bg-white px-2">
    <p className="underline-offset-3 decoration-3 text-xl font-bold text-coal underline decoration-blue-500">
      Try our Document Scanner.
    </p>
    <div className="flex items-center justify-center space-x-4">
      <ShieldCheckIcon
        className="h-10 w-10 text-fast"
        fill="#bae6fd"
        strokeWidth={1.5}
      />
      <span className="max-w-[30ch] text-xs text-fast">
        All data are encrypted in transit and encrypted once more upon reaching
        the server.{" "}
      </span>
    </div>
  </div>
);

type ImageViewerProps = {
  file: File | null;
  imageData: string | null;
};
export const ImageViewer = ({ file, imageData }: ImageViewerProps) => (
  <div className="flex h-[318px] w-full items-center justify-center overflow-scroll rounded-lg border bg-gradient-to-r from-gray-800/80 to-gray-800/60 shadow-inner">
    <Image
      alt={file?.name ?? ""}
      className="transition-all duration-500 ease-in-out hover:scale-[250%]"
      src={imageData!}
      width={200}
      height={200}
    />
  </div>
);

type DropzoneProps = {
  fileChange: (e: FileList | null) => void;
};
export const Dropzone = ({ fileChange }: DropzoneProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    fileChange(e.target.files);
  };
  return (
    <div className="h-[318px]">
      <InputFile
        onChange={onChange}
        icon={MousePointerSquareDashedIcon}
        name="upload"
        type="file"
        placeholder="Certificate of Registration"
      />
    </div>
  );
};

type ActionProps = {
  fileUpload: () => void;
  imageData: string | null;
  loading: boolean;
  uploadProgress: number;
  scanResult: OCR_DE_BASE64_Schema | null;
  status: UploadStatus;
};
export const Actions = ({
  fileUpload,
  imageData,
  loading,
  uploadProgress,
  scanResult,
  status,
}: ActionProps) => (
  <DialogFooter className="flex h-[70px] items-end border-0 border-clay">
    <div className="flex h-[56px] w-full flex-col items-center justify-center rounded-xl bg-void">
      <p className="leading-1 font-mono text-[20px] text-green-500">
        10{uploadProgress}
        <span className="ml-[2px] text-[10px] text-ash/80">%</span>
      </p>
      <span className="text-[11px] uppercase tracking-wide text-ash">
        upload
      </span>
    </div>
    <div className="flex h-[56px] w-full flex-col items-center justify-center rounded-xl border border-ash bg-void">
      <p className="leading-1 font-mono text-[20px] text-blue-400">
        10{uploadProgress !== 100 ? 0 : scanResult ? `100` : `50`}
        <span className="ml-[2px] text-[10px] text-ash/80">%</span>
      </p>
      <span className="text-[11px] uppercase text-ash">scan</span>
    </div>
    <Button
      variant="outline"
      size="fat"
      disabled={!imageData || loading}
      onClick={fileUpload}
      className="space-x-4 rounded-xl"
    >
      <span>{status}</span>
      <UploadIcon className="h-4 w-4" />
    </Button>
  </DialogFooter>
);

export const FieldIndex = ({ index }: { index: number }) => (
  <div className="flex w-[16px] items-center justify-center bg-gradient-to-b from-clay/50 to-blue-300 bg-clip-text font-mono text-sm font-semibold text-transparent">
    {index + 1}
  </div>
);

export const RequiredFields = ({ count }: { count: number }) => (
  <div className="mx-4 flex items-center justify-center space-x-4">
    <span className="text-sm text-clay">Required fields:</span>
    <span className="font-mono font-bold text-orange-500">{count}</span>
    <span className="text-sm font-medium text-clay">All Fields Good!</span>
  </div>
);

export const AllFieldsGood = () => (
  <div className="mx-4 flex items-center justify-center space-x-2">
    <span className="text-sm font-medium text-emerald-500">
      All Fields Good!
    </span>
    <CheckCircleIcon className="h-4 w-4 text-emerald-500" fill="#d1fae5" />
  </div>
);
