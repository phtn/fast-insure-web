import { Button } from "@/app/_components/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/dialog";
import { InputFile } from "@/app/_components/input";
import { Meter } from "@/app/_components/meter";
import { Touch } from "@/app/_components/touch";
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
    <DialogTitle className="font-bold tracking-tighter text-coal md:text-2xl">
      Add New Vehicle
    </DialogTitle>
    <DialogDescription className="flex items-center space-x-1 text-clay">
      <InfoIcon className="h-4 w-4 text-sky-600" fill="#e0f2fe" />
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
  <div className="flex h-[149px] flex-col items-stretch justify-center space-y-6 rounded-lg border border-ash bg-white p-3">
    <div className="flex items-center justify-between ">
      <div className="flex items-center space-x-2">
        <div className="flex w-8 items-center justify-center">
          <FileTextIcon className="text-clay" strokeWidth={1} />
        </div>
        <div className="space-y-[1px] overflow-clip">
          <div className="w-full ">
            <span className="font-mono text-sm font-medium text-clay">
              {limitText(file?.name, 25)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs uppercase tracking-tight text-clay">
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
          <XIcon strokeWidth={1} />
        </Button>
      </div>
    </div>
    <div className="flex h-[50px] w-full items-center justify-evenly rounded-lg bg-paper text-xs font-medium">
      <div className="flex items-center justify-center space-x-2">
        <span className="uppercase text-clay">FORMAT</span>
        <CheckCircleIcon
          strokeWidth={1.5}
          className="h-4 w-4 text-blue-500"
          fill="#dbeafe"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <span className="uppercase text-clay">Ready</span>
        <CheckCircleIcon
          strokeWidth={1.5}
          className="h-4 w-4 text-blue-500"
          fill="#dbeafe"
        />
      </div>
    </div>
  </div>
);

export const TryBanner = () => (
  <div className="flex h-[150px] flex-col items-center justify-center space-y-4 rounded-lg border border-ash bg-white px-2">
    <div className="flex w-full justify-center">
      <p className="text-lg tracking-tight text-coal ">
        Try our new <span className="font-bold">Document Scanner</span>.
      </p>
    </div>
    <div className="flex items-center justify-center space-x-4">
      <ShieldCheckIcon className="h-10 w-10 text-clay" strokeWidth={1} />
      <span className="max-w-[30ch] text-xs text-clay">
        All data are encrypted in transit and once more upon reaching our
        server.{" "}
      </span>
    </div>
  </div>
);

type ImageViewerProps = {
  file: File | null;
  imageData: string | null;
};
export const ImageViewer = ({ file, imageData }: ImageViewerProps) => (
  <div className="flex h-[300px] w-full items-center justify-center overflow-scroll rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-800/60 shadow-inner">
    <Image
      alt={file?.name ?? ""}
      className="h-auto w-auto transition-all duration-500 ease-in-out hover:scale-[250%]"
      src={imageData!}
      width={250}
      height={250}
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
    <div className="h-[300px]">
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
  <DialogFooter className="flex h-[70px] items-end justify-center space-x-4">
    <section className="flex w-full items-center justify-start space-x-2">
      <Meter label="upload" unit="%" value={100 + uploadProgress} />
      <Meter
        label="scan"
        unit="%"
        value={uploadProgress !== 100 ? 0 : scanResult ? `100` : `50`}
      />
    </section>
    <Touch
      size="lg"
      disabled={!imageData || loading}
      onClick={fileUpload}
      className="w-full"
      tail={UploadIcon}
    >
      {status}
    </Touch>
  </DialogFooter>
);

export const FieldIndex = ({ index }: { index: number }) => (
  <div className="flex w-[16px] items-center justify-center font-mono text-sm font-semibold text-clay/50">
    {index + 1}
  </div>
);

export const RequiredFields = ({ count }: { count: number }) => (
  <div className="mx-4 flex items-center justify-center space-x-4">
    <span className="text-xs font-medium text-clay">Required fields:</span>
    <span className="font-mono font-bold text-orange-500">{count}</span>
  </div>
);

export const AllFieldsGood = () => (
  <div className="mx-4 flex items-center justify-center space-x-2">
    <span className="text-xs font-medium text-clay">All Fields Good!</span>
    <CheckCircleIcon className="h-4 w-4 text-emerald-600" fill="#ecfdf5" />
  </div>
);
