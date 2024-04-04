import { Button } from "@@ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/(ui)/dialog";
import { InputFile } from "@@ui/input";
import { Meter } from "@@ui/meter";
import { DarkTouch, Touch } from "@@ui/touch";
import { type OCR_DE_BASE64_Schema } from "@/server/resource/ocr";
import { fileSize, fileType, limitText, opts } from "@/utils/helpers";
import {
  CheckCircleIcon,
  FileTextIcon,
  InfoIcon,
  MousePointerSquareDashedIcon,
  ShieldCheckIcon,
  UploadIcon,
  XIcon,
  type LucideIcon,
  ThumbsUp,
  ThumbsDown,
  CircleSlash2Icon,
  AlertCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { type FormEvent, type ChangeEvent, useCallback } from "react";
import { type UploadStatus } from "./hooks";
import tw from "tailwind-styled-components";

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
    <props.icon className="h-6 w-6 text-clay" fill="#FFFFFF" strokeWidth={1} />
    <p className="text-lg font-medium tracking-tighter text-coal">
      {props.title}
    </p>
  </div>
);

type FileInfoProps = {
  file: File | null;
  removeFile: () => void;
  validFormat: boolean;
  validSize: boolean;
};

export const FileInfo = ({
  file,
  removeFile,
  validFormat,
  validSize,
}: FileInfoProps) => {
  const FormatChecker = useCallback(() => {
    const options = opts(
      <CheckCircleIcon
        strokeWidth={1.5}
        className="h-4 w-4 text-blue-500"
        fill="#dbeafe"
      />,
      <CircleSlash2Icon
        strokeWidth={1.5}
        className="h-4 w-4 text-red-500"
        fill="rgba(254, 202, 202, 0.5)"
      />,
    );
    return <>{options.get(validFormat)}</>;
  }, [validFormat]);

  const SizeChecker = useCallback(() => {
    const options = opts(
      <CheckCircleIcon
        strokeWidth={1.5}
        className="h-4 w-4 text-blue-500"
        fill="#dbeafe"
      />,
      <CircleSlash2Icon
        strokeWidth={1.5}
        className="h-4 w-4 text-red-500"
        fill="rgba(254, 202, 202, 0.5)"
      />,
    );
    return <>{options.get(validSize)}</>;
  }, [validSize]);

  const ReadyChecker = () => {
    const options = opts(
      <CheckCircleIcon
        strokeWidth={1.5}
        className="h-4 w-4 text-blue-500"
        fill="#dbeafe"
      />,
      <AlertCircleIcon
        strokeWidth={1.5}
        className="h-4 w-4 text-amber-500"
        fill="rgba(253, 230, 138, 0.5)"
      />,
    );
    return <>{options.get(validFormat)}</>;
  };

  return (
    <div className="flex h-[150px] flex-col items-stretch justify-center space-y-6 rounded-lg border border-ash bg-white p-3">
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
      <div className="flex h-[50px] w-full items-center justify-evenly rounded-lg bg-paper text-[10px] font-medium">
        <div className="flex items-center justify-center space-x-2">
          <span className="uppercase text-clay">FORMAT</span>
          <FormatChecker />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="uppercase text-clay">Size</span>
          <SizeChecker />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="uppercase text-clay">
            {validFormat ? `Ready` : `Invalid`}
          </span>
          <ReadyChecker />
        </div>
      </div>
    </div>
  );
};

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
  <div className="flex h-[300px] w-full items-center justify-center overflow-scroll rounded-lg border bg-gradient-to-r from-gray-800/80 to-gray-800/40 shadow-inner">
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
  validFormat: boolean;
  validSize: boolean;
};
export const Actions = ({
  fileUpload,
  imageData,
  loading,
  uploadProgress,
  scanResult,
  status,
  validFormat,
  validSize,
}: ActionProps) => (
  <DialogFooter className="flex h-[70px] items-end justify-center space-x-4">
    <section className="flex w-full items-center justify-start space-x-2">
      <Meter label="upload" unit="%" value={uploadProgress} />
      <Meter
        label="scan"
        unit="%"
        value={uploadProgress !== 100 ? 0 : scanResult ? `100` : `50`}
      />
    </section>
    <Touch
      size="lg"
      disabled={!imageData || loading || !validFormat || !validSize}
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
    <span className="font-mono font-bold text-orange-500">
      {count < 0 ? 0 : count}
    </span>
  </div>
);

export const AllFieldsGood = () => (
  <div className="mx-4 flex items-center justify-center space-x-2">
    <span className="text-xs font-medium text-clay">All Fields Good!</span>
    <CheckCircleIcon className="h-4 w-4 text-emerald-600" fill="#ecfdf5" />
  </div>
);

type FeedbackProps = {
  handleLike: (e: FormEvent<HTMLButtonElement>) => void;
  handleDislike: (e: FormEvent<HTMLButtonElement>) => void;
  loading: boolean;
  feedback: boolean | undefined;
};
export const FeedbackActions = (props: FeedbackProps) => {
  const { handleDislike, handleLike, feedback, loading } = props;

  const MessageOptions = useCallback(() => {
    const getFeedback = typeof feedback !== "undefined";
    const options = opts(<AfterFeedback />, <AskFeedback />);
    return <MessageWrap>{options.get(getFeedback)}</MessageWrap>;
  }, [feedback]);

  return (
    <div className="flex items-center justify-between space-x-2">
      <MessageOptions />
      <DarkTouch
        disabled={loading}
        icon={ThumbsUp}
        onClick={(e) => handleLike(e)}
        size="icon"
        variant={feedback ? `secondary` : `dark`}
      />
      <DarkTouch
        disabled={loading}
        icon={ThumbsDown}
        onClick={(e) => handleDislike(e)}
        size="icon"
        variant={feedback !== undefined && !feedback ? `secondary` : `dark`}
      />
    </div>
  );
};

const AfterFeedback = () => (
  <div className="flex flex-col items-center -space-y-1 text-blue-500">
    <p className="font-bold tracking-tight">Thanks</p>
    <p className="text-[11px] font-medium text-clay">for the feedback!</p>
  </div>
);

const AskFeedback = () => (
  <div className="flex flex-col">
    <p className="font-semibold tracking-tighter text-coal">Results Ok?</p>
  </div>
);

const MessageWrap = tw.div`
  flex h-[56px] w-[150px] items-center justify-center
  rounded-lg rounded-br-none border-[1px] border-ash
  bg-white
`;
