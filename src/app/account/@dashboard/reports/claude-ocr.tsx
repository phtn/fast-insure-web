import React, { useState, type ChangeEvent, useCallback } from "react";
import axios from "axios";
import { errHandler } from "@/utils/helpers";
// utils/Either.ts
export type Either<E, A> = Left<E> | Right<A>;

interface Left<E> {
  _tag: "Left";
  left: E;
}

interface Right<A> {
  _tag: "Right";
  right: A;
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: "Left",
  left: e,
});
export const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: "Right",
  right: a,
});

export const isLeft = <E, A>(e: Either<E, A>): e is Left<E> =>
  e._tag === "Left";
export const isRight = <E, A>(e: Either<E, A>): e is Right<A> =>
  e._tag === "Right";
interface ProcessResult {
  text: string;
  // Add other fields as needed
}

interface ProcessError {
  message: string;
}

const DocumentAIProcessor: React.FC = () => {
  const [result, setResult] = useState<Either<
    ProcessError,
    ProcessResult
  > | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const name =
    "https://us-documentai.googleapis.com/v1/projects/20013354165/locations/us/processors/bac05e2a9d46a902:process";

  const processDocument = useCallback(async (file: File) => {
    // const authToken = await $`gcloud auth print-identity-token`;
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);

    const processResult = await axios
      .post<Either<ProcessError, ProcessResult>>(name, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .catch((error: Error) =>
        left({ message: `Error processing document: ${error.message}` }),
      );

    setResult(processResult);
    setIsProcessing(false);
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processDocument(file).catch(errHandler);
      }
    },
    [processDocument],
  );

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isProcessing} />
      {isProcessing && <p>Processing document...</p>}
      {result &&
        (isRight(result) ? (
          <pre>{JSON.stringify(result.right, null, 2)}</pre>
        ) : (
          <div>Error: {result.left.message}</div>
        ))}
    </div>
  );
};

export default DocumentAIProcessor;
