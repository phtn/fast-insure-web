import { fileType } from "@/utils/helpers";
import { onInfo } from "@/utils/toast";
import { useEffect, useState } from "react";
// import { collection, doc } from "firebase/firestore";
import {
  type StorageReference,
  getDownloadURL,
  listAll,
  ref as storageRef,
} from "firebase/storage";

import { storage } from "@/libs/db";

export const useFileHandler = () => {
  const [file, setFile] = useState<File | undefined>();
  const [validFormat, setValidFormat] = useState(false);
  const [validSize, setValidSize] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const supportedFormats = ["jpg", "jpeg", "png", "svg", "pdf", "mp4"];
    if (file) {
      const format = fileType(file.type);
      const fileSize = file.size / 1000000;

      const isValidSize = fileSize < 10;
      setValidSize(isValidSize);
      if (!isValidSize) {
        onInfo("Invalid File Size.", `Use files below 10MB.`);
      }

      const isValidFormat = supportedFormats.includes(format.toLowerCase());
      setValidFormat(isValidFormat);
      if (!isValidFormat) {
        onInfo("Invalid File Format.", `Supported formats: JPG, PNG, or PDF`);
      }
    }
  }, [file]);

  const removeFileItem = () => setImageData(null);

  const getImageData = (file: File | undefined) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri as string);
    };
    reader.readAsDataURL(file!);
  };

  const handleFileChange = (e: FileList | null) => {
    const target = e?.[0];
    getImageData(target);
    setFile(target);
  };

  const handleFileRemove = () => {
    setFile(undefined);
    removeFileItem();
  };

  return {
    file,
    handleFileRemove,
    handleFileChange,
    imageData,
    validFormat,
    validSize,
  };
};

export type UploadStatus =
  | "Upload File"
  | "Uploading"
  | "Scanning"
  | "Complete";

// export const useFileUploader = (userId: string | undefined) => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [downloadURL, setDownloadURL] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<UploadStatus>("Upload File");

//   const Ok = () => {
//     setLoading(false);
//     onSuccess("Upload complete.");
//   };

//   const fileUploader = async (file: File) => {
//     setLoading(true);
//     setStatus("Uploading");

//     const filename = `${uuid().substring(0, 8)}_${userId?.substring(0, 8)}`;

//     const storageReference = storageRef(
//       storage,
//       `users/${userId}/ ` + filename,
//     );

//     const uploadTask = uploadBytesResumable(storageReference, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//         );
//         setUploadProgress(progress);
//       },
//       (e) => errHandler(e, setLoading),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref)
//           .then((url) => {
//             setDownloadURL(url);
//           })
//           .catch((e: Error) => errHandler(e, setLoading));
//       },
//     );

//     await uploadTask.then(Ok).catch((e: Error) => errHandler(e, setLoading));
//   };

//   return {
//     fileUploader,
//     uploadProgress,
//     downloadURL,
//     loading,
//     status,
//   };
// };

export interface IImageList {
  name: string;
  url: string;
  type: string;
}

export const useDownloadURLs = (
  id: string | undefined,
  viewDropzone: boolean,
) => {
  const [loading, setLoading] = useState(false);
  const [imagelist, setImagelist] = useState<IImageList[]>([]);

  useEffect(() => {
    const listRef = storageRef(storage, `requests/${id}`);

    listAll(listRef)
      .then((listResult) => {
        const urlPromises = listResult.items.map(downloadURL);
        return Promise.all(urlPromises);
      })
      .then((urls) => {
        setImagelist(urls);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching images: ", e);
        setLoading(false);
      });
  }, [id, setImagelist, viewDropzone]);

  return { loading, imagelist };
};

async function downloadURL(itemRef: StorageReference) {
  return await getDownloadURL(itemRef).then((url) => ({
    name: itemRef.name,
    type: fileType(itemRef.name),
    url,
  }));
}
