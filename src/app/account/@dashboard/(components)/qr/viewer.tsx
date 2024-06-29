import { Dialog, DialogContent, DialogTitle } from "@/app/(ui)/dialog";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import type { Dispatch, SetStateAction } from "react";
import { FastQR } from "./generate";

type QrViewerProps = {
  code: string | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export const QrViewer = (props: QrViewerProps) => {
  const { code, open, setOpen } = props;
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-120 w-120 overflow-hidden bg-paper">
          <DialogTitle>
            <div className="flex items-center space-x-2 font-mono text-sm font-normal uppercase tracking-widest text-dyan">
              <p className="pr-4 font-sans font-light capitalize tracking-tighter text-neutral-500">
                Code:
              </p>
              <p>{code}</p>
              <Square2StackIcon className="size-4" />
            </div>
          </DialogTitle>
          <div className="">
            <FastQR code={code} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
