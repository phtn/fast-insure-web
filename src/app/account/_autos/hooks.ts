import { storage } from "@/libs/db";
import { readAllAuto } from "@/reads/autos";
import type { OCR_DE_BASE64_Schema } from "@/server/resource/ocr";
import { createAuto } from "@/trpc/autos/create";
import { runOCR_DE_BASE64 } from "@/trpc/ocr/ocr";
import { nameGenerator } from "@/utils/helpers";
import { onError, onSuccess } from "@/utils/toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import type { FieldErrors, UseFormWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { VehicleSchema } from "./active-form";
import { getAllAuto } from "@/trpc/autos/get";

const Err = (err: Error) => {
  onError(err.name, err.message);
};

const AuthErr = () => {
  onError("Unable to authenticate");
};

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

  const Ok = () => {
    onSuccess("Upload complete.");
  };

  const fileUploader = async (file: File) => {
    setLoading(true);
    setStatus("Uploading");

    const filename = `${uuidv4().substring(0, 8)}_${userId?.substring(0, 8)}`;

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

type UseAutoAccount = {
  userId?: string | undefined;
};

export const useAutoAccount = ({ userId }: UseAutoAccount) => {
  const [addLoading, setAddLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const Ok = () => {
    onSuccess("Successful", "1 Vehicle added.");
  };

  const addAuto = async (auto_data: VehicleSchema) => {
    setAddLoading(true);
    const auto_name = nameGenerator();
    await createAuto({ userId: userId!, auto_data, auto_name })
      .then((res) => {
        if (res[0] === 1) {
          setOpen(false);
          setAddLoading(false);
          Ok();
        }
        setAddLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { open, setOpen, addLoading, addAuto };
};

export const useGetAutos = ({ userId }: { userId: string | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [autos, setAutos] = useState<VehicleSchema[]>([]);

  useEffect(() => {
    setLoading(true);
    if (userId) {
      getAllAuto({ userId }).then((response) => {
        setAutos(response);
        setLoading(false);
      });
    } else {
      AuthErr();
      setLoading(false);
    }
  }, []);

  return { autos, loading };
};
