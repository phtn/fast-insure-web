"use client";

import { opts } from "@/utils/helpers";
import { Dialog, DialogContent, DialogTrigger } from "@@ui/dialog";
import { FileInputIcon, PlusIcon, ScanTextIcon } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { AutoForm } from "./auto-form";
import {
  Actions,
  AllFieldsGood,
  Dropzone,
  FileInfo,
  Header,
  ImageViewer,
  RequiredFields,
  Title,
  TryBanner,
} from "./components";
import { useAutoAccount, useFileHandler, useFileUploader } from "./hooks";
import { staticScanBase64 } from "./data";
import { AuthContext } from "@/app/(context)/context";
import tw from "tailwind-styled-components";
import { cn } from "@/utils/cn";

export const AddAuto = () => {
  const [invalidFieldCount, setInvalidFieldCount] = useState<
    number | undefined
  >(undefined);
  const userCreds = useContext(AuthContext);
  const {
    file,
    handleFileChange,
    handleFileRemove,
    imageData,
    validFormat,
    validSize,
  } = useFileHandler();
  const {
    fileUploader,
    uploadProgress,
    scanResult,
    loading,
    status,
    downloadURL,
  } = useFileUploader(userCreds?.user?.uid);

  useEffect(() => {
    if (scanResult) {
      console.log(scanResult.base64.fields);
    }
  }, [scanResult]);

  const { open, setOpen, addAuto, addLoading } = useAutoAccount({
    userId: userCreds?.user?.uid,
    docURL: downloadURL,
  });

  const handleFileUpload = useCallback(() => {
    if (file) {
      fileUploader(file)
        .then(() => console.log("Upload complete."))
        .catch((err: Error) => err);
    }
  }, [file, fileUploader]);

  const FileViewOptions = useCallback(() => {
    const options = opts(
      <FileInfo
        file={file}
        removeFile={handleFileRemove}
        validFormat={validFormat}
        validSize={validSize}
      />,
      <TryBanner />,
    );
    return <>{options.get(imageData !== null)}</>;
  }, [imageData, file, handleFileRemove, validFormat, validSize]);

  const ImageViewOptions = useCallback(() => {
    const options = opts(
      <ImageViewer file={file} imageData={imageData} />,
      <Dropzone fileChange={handleFileChange} />,
    );
    return <>{options.get(imageData !== null)}</>;
  }, [imageData, file, handleFileChange]);

  const FieldStatusOptions = useCallback(() => {
    const options = opts(
      <AllFieldsGood />,
      <RequiredFields count={invalidFieldCount! ?? 0} />,
    );
    return <>{options.get(!!invalidFieldCount && invalidFieldCount <= 0)}</>;
  }, [invalidFieldCount]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Inner className={cn(`size-[24px]`)}>
          <PlusIcon strokeWidth={2} className="size-3 text-zap" />
        </Inner>
      </DialogTrigger>
      <DialogContent>
        <Title />

        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6">
          <section className="col-span-1 space-y-4">
            <Header title="Upload & Scan" icon={ScanTextIcon} />
            <div className="space-y-6">
              <ImageViewOptions />
              <FileViewOptions />
            </div>

            <Actions
              fileUpload={handleFileUpload}
              imageData={imageData}
              loading={loading || addLoading}
              uploadProgress={uploadProgress}
              scanResult={scanResult}
              status={status}
              validFormat={validFormat}
              validSize={validSize}
            />
          </section>

          <section className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <Header title="Vehicle Registration Form" icon={FileInputIcon} />
              <FieldStatusOptions />
            </div>

            <div>
              <AutoForm
                fields={staticScanBase64.base64.fields}
                setCount={setInvalidFieldCount}
                loading={addLoading}
                addAuto={addAuto}
                downloadURL={downloadURL}
                withScan={!!scanResult}
              />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Inner = tw.div`
  h-[20px] w-[20px]
  flex items-center justify-center
  rounded-full border-[0.33px] border-clay/40
  text-[12px] text-blue-100
  bg-prime hover:bg-fast
  transition-colors duration-200 ease-out
  `;
