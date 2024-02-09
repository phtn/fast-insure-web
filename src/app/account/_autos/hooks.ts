import { storage } from "@/libs/db";
import type { OCR_DE_BASE64_Schema } from "@/server/resource/ocr";
import { runOCR_DE_BASE64 } from "@/trpc/ocr/ocr";
import { onError, onSuccess } from "@/utils/toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import type { FieldErrors, UseFormWatch } from "react-hook-form";
import shortid from "shortid";
import type { VehicleSchema } from "./active-form";

export const useFileHandler = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const removeImage = () => setImageData(null);

  const getImageData = (file: File | undefined) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri as string);
    };
    reader.readAsDataURL(file!);
  };

  const handleFileChange = useCallback((e: FileList | null) => {
    getImageData(e?.[0]);
    if (e) {
      setFile(e[0]!);
    }
  }, []);

  const handleFileRemove = () => {
    setFile(null);
    removeImage();
  };

  return { file, handleFileRemove, handleFileChange, imageData };
};

export type UploadStatus =
  | "Upload File"
  | "Uploading"
  | "Scanning"
  | "Complete";

export const useFileUploader = (userId: string | undefined) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [scanResult, setScanResult] = useState<OCR_DE_BASE64_Schema | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("Upload File");

  const Err = (err: Error) => {
    onError(err.name, err.message);
  };
  const Ok = () => {
    onSuccess("Upload complete.");
  };

  const fileUploader = async (file: File) => {
    setLoading(true);
    setStatus("Uploading");

    const filename = `${shortid.generate()}_${userId?.substring(0, 8)}`;

    const storageRef = ref(storage, "user_uploads/" + filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setUploadProgress(progress);
        if (progress === 100) {
          setStatus("Scanning");
        }
      },
      () => Err,
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setDownloadURL(url);
            runOCR_DE_BASE64({ file_url: url })
              .then((res: OCR_DE_BASE64_Schema) => {
                setScanResult(res);
                console.log(res);
                setLoading(false);
                setStatus("Complete");
                onSuccess("Scan complete.");
              })
              .catch(Err);
          })
          .catch(Err);
      },
    );

    await uploadTask.then(Ok, Err);
  };

  return {
    fileUploader,
    uploadProgress,
    downloadURL,
    scanResult,
    loading,
    status,
  };
};

type UseWatcherParams = {
  errors: FieldErrors;
  watch: UseFormWatch<VehicleSchema>;
};

export const useWatcher = ({ errors, watch }: UseWatcherParams) => {
  const [invalidFields, setInvalidFields] = useState<{
    count: number;
    invalids: string[];
  }>({
    count: 0,
    invalids: [],
  });

  useEffect(() => {
    const watchFields = Object.keys(watch());
    const invalidFields = Object.keys(errors);

    const filteredInvalidFields = invalidFields.filter((field) =>
      watchFields.includes(field),
    );
    const invalidFieldCount = filteredInvalidFields.length;
    setInvalidFields({
      count: invalidFieldCount,
      invalids: filteredInvalidFields,
    });
  }, [errors, watch]);

  return invalidFields;
};
