"use client";

import { opts } from "@/utils/helpers";
import { Button } from "@@components/button";
import { Dialog, DialogContent, DialogTrigger } from "@@components/dialog";
import { FileInputIcon, PlusIcon, ScanTextIcon } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context";
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
import { staticScanBase64 } from "./data";
import { useAutoAccount, useFileHandler, useFileUploader } from "./hooks";

export const AddAuto = () => {
  const [invalidFieldCount, setInvalidFieldCount] = useState(0);
  const userCreds = useContext(AuthContext);
  const { file, handleFileChange, handleFileRemove, imageData } =
    useFileHandler();
  const { fileUploader, uploadProgress, scanResult, loading, status } =
    useFileUploader(userCreds?.user?.uid);

  const { open, setOpen, addAuto, addLoading } = useAutoAccount({
    userId: userCreds?.user?.uid,
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
      <FileInfo file={file} removeFile={handleFileRemove} />,
      <TryBanner />,
    );
    return <>{options.get(imageData !== null)}</>;
  }, [imageData, file, handleFileRemove]);

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
      <RequiredFields count={invalidFieldCount} />,
    );
    return <>{options.get(invalidFieldCount <= 0)}</>;
  }, [invalidFieldCount]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-6 w-6 rounded-full" size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
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
              />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
