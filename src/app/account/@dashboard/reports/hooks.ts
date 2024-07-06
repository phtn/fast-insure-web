import { errHandler } from "@/utils/helpers";
import { processDocument } from "./axios";

export const useGCF = () => {
  const handleProcess = () => {
    processDocument()
      .then((res) => console.log(res))
      .catch(errHandler);
  };

  return { handleProcess };
};
