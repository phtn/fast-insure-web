"use client";

import { ManagerContextProvider } from "../(context)/context";
import DocumentAIProcessor from "./claude-ocr";
// import { useGCF } from "./hooks";
// import { processDocument } from "@/gcf";

export const ReportsContent = () => {
  return (
    <ManagerContextProvider>
      <div className="space-y-6 p-6">
        <DocumentAIProcessor />
        {/* <Button onClick={processDocument}>Call Cloud Function</Button> */}
      </div>
    </ManagerContextProvider>
  );
};
