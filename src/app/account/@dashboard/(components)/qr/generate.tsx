import { useEffect, useRef, useState } from "react";
import type {
  Options,
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
} from "qr-code-styling";
import QRCodeStyling from "qr-code-styling";
import {
  ShareIcon,
  ArrowDownTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/(ui)/button";
import { copyFn, errHandler } from "@/utils/helpers";

export const FastQR = (props: { code: string | undefined }) => {
  const linkURL = `http://fast-insure.vercel.app/account/sign-in/${props.code ?? ""}`;
  const [options] = useState<Options>({
    width: 275,
    height: 275,
    type: "svg" as DrawType,
    data: linkURL,
    image: "/logo/fast_dyan.svg",
    margin: 2,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 0.5,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#222222",
      gradient: {
        type: "radial", // 'linear'
        rotation: 0,
        colorStops: [
          { offset: 0.25, color: "#06b6d4" },
          { offset: 1, color: "#082f49" },
        ],
      },
      type: "dots" as DotType,
    },
    cornersSquareOptions: {
      color: "#082f49",
      type: "extra-rounded" as CornerSquareType,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#0369a1",
      // type: "none" as CornerDotType,
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#06b6d4" },
          { offset: 1, color: "#155e75" },
        ],
      },
    },
    backgroundOptions: {
      color: "transparent",
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
  });
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const handleDownload = () => {
    if (!qrCode) return;
    qrCode
      .download({
        extension: "png",
      })
      .catch(errHandler);
  };

  const handleCopyLink = () => {
    copyFn({ name: "QR code URL", text: linkURL, limit: 50 }).catch(errHandler);
  };

  return (
    <div className="relative w-full">
      <div className="relative z-50 flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-xl">
        <Polaris />
        <div className="relative z-40 flex items-center justify-center rounded-lg border border-dyan/20 bg-white p-4">
          <div ref={ref} />
        </div>
        <div className="z-40 flex h-[56px] w-full items-end justify-between space-x-1">
          <Button
            variant={`ghost`}
            onClick={handleCopyLink}
            className="flex h-[40px] w-full items-center justify-center space-x-2 rounded border-[0.33px] border-dyan/20 bg-white text-dyan hover:bg-void hover:text-white"
          >
            <div className="text-xs">Copy link</div>
            <LinkIcon className="size-4" />
          </Button>
          <Button
            variant={`ghost`}
            onClick={handleDownload}
            className="flex h-[40px] w-full items-center justify-center space-x-2 rounded border-[0.33px] border-dyan/20 bg-white text-dyan hover:bg-void hover:text-white"
          >
            <div className="text-xs">Download</div>
            <ArrowDownTrayIcon className="size-4" />
          </Button>
          <Button
            variant={`ghost`}
            className="flex h-[40px] w-full items-center justify-center space-x-2 rounded border-[0.33px] border-dyan/20 bg-white text-dyan hover:bg-void hover:text-white"
          >
            <div className="text-xs">Share</div>
            <ShareIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Polaris = () => (
  <div className="absolute -top-12 h-3/4 w-3/4 rotate-12 justify-end space-y-6 ">
    <div className="w-18 h-36 rotate-45 rounded-xl border-[32px] border-indigo-200/10 bg-sky-500/10 shadow-2xl shadow-cyan-300/80" />
    <div className="w-18 h-24 rotate-45 rounded-xl border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300" />
    <div className="h-24 w-64 rotate-45 rounded-xl border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300/90" />
    <div className="w-18 h-24 rotate-45 rounded-xl border-[32px] border-indigo-200/10 bg-sky-500/15 shadow-2xl shadow-cyan-300/50" />
  </div>
);

// const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
//   setOptions((options) => ({
//     ...options,
//     data: event.target.value,
//   }));
// };

// const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
//   setFileExt(event.target.value as FileExtension);
// };
