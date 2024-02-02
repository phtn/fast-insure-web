import { storage } from '@/libs/db';
import { onError, onSuccess } from "@/utils/toast";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { type ChangeEvent, useCallback, useState } from "react";
import shortid from "shortid";
import { createWorker } from "tesseract.js";
import type Tesseract from "tesseract.js";


export const useFileHandler = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [imageData, setImageData] = useState<string | null>(null)

  const removeImage = () => setImageData(null)

  const arrayToFileList = (array: File[]) => {

    const fileList: FileList = Object.create(FileList.prototype);
    Object.defineProperty(fileList, "length", {
      value: array.length,
      writable: false,
      enumerable: false,
      configurable: true,
    });

    array.forEach((file, index) => {
      Object.defineProperty(fileList, index, {
        value: file,
        writable: false,
        enumerable: true,
        configurable: true,
      });
    });
    return fileList;
  };

  const getImageData = (file: File | undefined) => {

    const reader = new FileReader()
    reader.onloadend = () => {
      const imageDataUri = reader.result
      setImageData(imageDataUri as string)
    }
    reader.readAsDataURL(file!)
  }

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      if (!files) {
        setFiles(e.target.files);
      }
      if (files) {
        const fileArray = [...files, ...e.target.files];
        setFiles(fileArray && arrayToFileList(fileArray));
        getImageData([...files][0])
      }
    },
    [files],
  );



  const handleFileRemove = () => {
    const updatedFiles = files && [...files].filter((_, i) => 0 !== i);
    setFiles(updatedFiles && arrayToFileList(updatedFiles));
    removeImage()
  };

  return { files, handleFileRemove, handleFileChange, imageData }
}


export const useFileUploader = (userId: string | undefined, imageData: string | null) => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')
  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrStatus, setOcrStatus] = useState('')
  const [ocrResult, setOcrResult] = useState('')
  const [tp, setTP] = useState<Tesseract.Line[]>()


  const fileUploader = async (file: File) => {

    const filename = `${shortid.generate()}_${userId?.substring(0, 8)}`

    const storageRef = ref(storage, 'user_uploads/' + filename)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", snapshot => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setUploadProgress(progress)
    },
      (err) => {
        err.message
      },
      () => getDownloadURL(uploadTask.snapshot.ref).then(url => {
        setDownloadURL(url)
      })
    )
    const Err = (err: Error) => {
      onError(err.name, err.message)
    }
    const Ok = () => {
      onSuccess('Upload complete.')
    }
    await uploadTask.then(Ok, Err);

  }

  const readImage = async () => {
    const worker = await createWorker('eng', 1, {
      logger: message => {
        if ('progress' in message) {
          setOcrProgress(message.progress)
          setOcrStatus(message.progress == 1 ? 'Complete.' : 'Reading...')
        }
      }
    })
    const result = await worker.recognize(imageData!)
    setOcrResult(result.data.text)
    setTP(result.data.paragraphs[0]?.lines)
    await worker.terminate()

  }



  return { fileUploader, uploadProgress, downloadURL, readImage, ocrStatus, ocrResult, ocrProgress, tp }


}
