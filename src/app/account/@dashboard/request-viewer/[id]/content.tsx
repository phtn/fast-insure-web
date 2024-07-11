"use client";

import { HashtagIcon, UserIcon } from "@heroicons/react/24/solid";
import { DarkCard, NeutralCard0 } from "../../(components)/form-card";
import { copyFn, downloadFiles, errHandler, opts } from "@/utils/helpers";
import { ScrollTextIcon } from "lucide-react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/libs/db";
import { type IDMRequestSchema } from "@/server/resource/idm";
import { ImageList } from "../../request/[id]/image-list";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { Button } from "@/app/(ui)/button";
import {
  ArrowDownTrayIcon,
  InboxIcon,
  PrinterIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { onSuccess } from "@/utils/toast";
import moment from "moment";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/app/(context)/context";
import { UnderwriterForm } from "./underwriter-card";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "@/app/(context)/context";

export const RequestViewerContent = (props: { id: string | undefined }) => {
  const profile = useContext(AuthContext)?.profile;

  // useEffect(() => {
  //   if (profile?.accountType === "UNDERWRITER") {
  //     onSuccess("underwriter");
  //   } else {
  //     onSuccess("not underwriter");
  //   }
  // }, [profile]);

  const docRef = doc(db, `${process.env.NEXT_PUBLIC_LIVE_REQS}/${props.id}`);
  const [snapshot] = useDocument(docRef);

  const request = snapshot?.data() as IDMRequestSchema;

  const { imagelist } = useDownloadURLs(props.id);

  const AdvancedOptions = useCallback(() => {
    const isUnderwriter = profile?.accountType === "UNDERWRITER";
    const options = opts(<UnderwriterForm />, <div />);
    return <>{options.get(!isUnderwriter)}</>;
  }, [profile]);

  const handleDownloadAll = () => {
    const folder = `${props.id?.substring(9)}_${request.assuredData?.lastName}`;
    downloadFiles(imagelist, folder)
      .then(() => {
        onSuccess(
          "zip file downloaded.",
          `Total of (${imagelist.length}) files`,
        );
      })
      .catch(errHandler);
  };

  const address = request?.assuredData?.address;
  const assuredAddress = `Address: ${address?.line1}, ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postalCode}, ${address?.country}`;

  const handleCopyAssuredInfo = () => {
    if (!request.assuredData) return;
    const { email, phone, firstName, lastName, middleName } =
      request.assuredData;

    copyFn({
      name: "Assured info",
      text: `Info: ${firstName}, ${middleName ?? "N/A"}, ${lastName}, ${email}, ${phone}, ${assuredAddress}`,
    }).catch(errHandler);
  };

  const handleCopyAssuredAddress = () => {
    if (!assuredAddress) return;

    copyFn({
      name: "Assured address",
      text: assuredAddress,
    }).catch(errHandler);
  };

  return (
    <div className="h-[calc(100vh-92px)] overflow-y-scroll border-y-[0.0px] border-neutral-300">
      <DarkCard>
        <div className="flex h-[99px] flex-col justify-center px-4 md:space-y-4 portrait:space-y-2">
          <div className="flex w-full justify-between">
            <div className="text-sm font-semibold text-paper/80">
              Created by
            </div>
            <div className="flex items-center space-x-4 rounded-md p-1 font-mono text-xs tracking-wider text-sky-100 opacity-80 portrait:py-0 portrait:text-[9px]">
              <p className="font-mono opacity-80">Agent ID:</p>
              <p className="font-mono">{request?.agentId?.substring(0, 12)}</p>
            </div>
          </div>

          <div className="w-full space-y-1 text-xs">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center md:space-x-4">
                <div className="w-[6ch] font-medium tracking-tight text-paper/50">
                  Name
                </div>
                <p className="font-sans font-semibold text-white">
                  {request?.agentName ?? request?.agentId}
                </p>
              </div>

              <div className="flex w-full items-center justify-end space-x-4">
                <div className="font-medium tracking-tight text-paper/70">
                  Created:
                </div>
                <div className="font-mono text-white opacity-80 portrait:text-[10px]">
                  {moment(request?.createdAt).fromNow()}
                </div>
              </div>
            </div>

            {/*  */}

            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center md:space-x-4">
                <div className="w-[6ch] font-medium tracking-tight text-paper/50">
                  Email
                </div>
                <div className="font-mono text-white opacity-80">
                  {props.id?.substring(0, 12)}
                </div>
              </div>

              <div className="flex w-full items-center justify-end space-x-4">
                <div className="font-normal tracking-tight text-paper/60">
                  Last update:
                </div>
                <p className="font-mono text-white opacity-80 portrait:text-[10px]">
                  {moment(request?.updatedAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DarkCard>

      <div className="space-y-6">
        <NeutralCard0>
          <div className="h-full">
            <div className="grid h-full w-full grid-cols-6 portrait:grid-cols-1">
              <div className="h-full rounded-xl bg-gradient-to-b from-white via-zap to-transparent p-6 md:col-span-2">
                <div className="space-y-6">
                  <div className="flex h-[36px] items-center justify-between border-b">
                    <div className="flex items-center">
                      <div className=" text-sm font-semibold tracking-tight text-dyan/80">
                        Assured Info
                      </div>
                      <Button
                        className=""
                        onClick={handleCopyAssuredInfo}
                        variant={"ghost"}
                        size={`icon`}
                      >
                        <Square2StackIcon className="size-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4 font-mono text-xs opacity-80 portrait:px-1">
                      <div className="text-[10px] opacity-60">Ref#</div>
                      <div>{props.id?.substring(0, 12)}</div>
                    </div>
                  </div>
                  <div className="flex h-full items-center space-x-4 py-2 pl-2">
                    <div className="flex size-[36px] items-center justify-center rounded-full bg-neutral-400 drop-shadow-sm">
                      <UserIcon className="scale-50 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 font-sans text-lg font-semibold  tracking-tight text-dyan">
                      <div className="leading-none">
                        {request?.assuredData?.firstName}
                      </div>
                      <div className="leading-none">
                        {request?.assuredData?.lastName}
                      </div>
                    </div>
                  </div>

                  <div className="h-fit w-full space-y-1.5 rounded-xl border-[0.33px] border-dyan/50 bg-gradient-to-t from-neutral-100 via-neutral-50 to-transparent p-2 text-xs text-cyan-900 shadow-md">
                    <div className="h-[32px] text-sm font-semibold tracking-tight">
                      Contact Details
                    </div>

                    <RowItem
                      label="email"
                      value={request?.assuredData?.email}
                    />
                    <RowItem
                      label="phone"
                      value={request?.assuredData?.phone}
                    />
                  </div>
                  <div className="h-full w-full space-y-1.5 rounded-xl border-[0.33px] border-dyan/50 bg-gradient-to-t from-neutral-100 via-neutral-50 to-transparent p-2 text-xs text-cyan-900 shadow-md">
                    <div className="flex h-[32px] items-center space-x-2">
                      <div className="text-sm font-semibold tracking-tight">
                        Address
                      </div>
                      <Button
                        className=""
                        onClick={handleCopyAssuredAddress}
                        variant={"ghost"}
                        size={`icon`}
                      >
                        <Square2StackIcon className="size-4" />
                      </Button>
                    </div>
                    <RowItem
                      label="line 1"
                      value={request?.assuredData?.address?.line1}
                    />
                    <RowItem
                      label="line 2"
                      value={request?.assuredData?.address?.line2}
                    />
                    <RowItem
                      label="city"
                      value={request?.assuredData?.address?.city}
                    />
                    <RowItem
                      label="province"
                      value={request?.assuredData?.address?.state}
                    />
                    <RowItem
                      label="postal code"
                      value={request?.assuredData?.address?.postalCode}
                    />
                    <RowItem
                      label="country"
                      value={request?.assuredData?.address?.country}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full rounded-l-xl border-0 border-dyan bg-gradient-to-b from-transparent via-paper to-transparent px-6 md:col-span-4">
                <div className="grid h-fit w-full gap-4 text-xs text-paper md:grid-cols-7 portrait:grid-cols-1">
                  <div className="flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-sky-500 p-4 shadow-md md:col-span-3">
                    <div className="flex h-full w-full justify-between">
                      <div className="font-mono opacity-80">Policy Type</div>
                      <div>
                        <ScrollTextIcon className="size-4" />
                      </div>
                    </div>

                    <div className="self-baseline">
                      <div className="text-xl font-bold">
                        {request?.policyType}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-void p-4 shadow-md md:col-span-2">
                    <div className="flex h-full w-full justify-between">
                      <div className="font-mono opacity-60">Plate number</div>
                      <div>
                        <HashtagIcon className="size-4" />
                      </div>
                    </div>

                    <div className="self-baseline">
                      <div className="text-xl font-bold">
                        {request?.vehicleInfo?.plateNumber ?? "---"}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-zap p-4 text-coal shadow-md md:col-span-2 ">
                    <div className="flex h-full w-full justify-between">
                      <div className="font-mono opacity-80">
                        Conduction number
                      </div>
                      <div>
                        <HashtagIcon className="size-4" />
                      </div>
                    </div>

                    <div className="self-baseline">
                      <div className="text-xl font-bold">
                        {request?.vehicleInfo?.conductionNumber}
                      </div>
                      <div className="text-sm font-medium"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="mb-3 flex h-[36px] items-center space-x-4 px-2 text-dyan">
                    <div className="text-sm font-semibold tracking-tight ">
                      Uploaded Documents
                    </div>
                    <div className="font-mono text-xs opacity-80">
                      ({imagelist.length})
                    </div>
                  </div>

                  <div className="h-[185px] rounded-xl border-0 border-neutral-300 bg-transparent">
                    {imagelist && imagelist.length > 0 ? (
                      <ImageList id={props.id} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center space-x-4">
                        <InboxIcon className="size-4 opacity-50" />
                        <p className="text-sm opacity-80">
                          <span className="font-mono font-light">(0)</span>{" "}
                          files found.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-[34px] h-[220px] rounded-xl border border-dyan/0 bg-transparent  pr-[1px] pt-[1px]">
                    <div className=".bg-gradient-to-br flex h-full items-end justify-end space-x-4 rounded-r-[11px] from-white to-white/20 py-2 pr-2">
                      <Button
                        size={`sm`}
                        variant={`outline`}
                        className="m-0 flex items-center space-x-3 font-medium"
                        onClick={handleDownloadAll}
                        disabled={imagelist?.length <= 0}
                      >
                        <p>Print</p>
                        <PrinterIcon className="size-4" />
                      </Button>
                      <Button
                        size={`sm`}
                        variant={`outline`}
                        className="m-0 flex items-center space-x-3 font-medium"
                        onClick={handleDownloadAll}
                        disabled={imagelist?.length <= 0}
                      >
                        <p>Get CSV</p>
                        <ArrowDownTrayIcon className="size-4" />
                      </Button>
                      <Button
                        size={`sm`}
                        variant={`default`}
                        className="m-0 flex items-center space-x-2"
                        onClick={handleDownloadAll}
                        disabled={imagelist?.length <= 0}
                      >
                        <p>Download all files</p>
                        <ArrowDownTrayIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NeutralCard0>
        <AdvancedOptions />
      </div>
    </div>
  );
};

const RowItem = (props: { label: string; value: string | undefined }) => {
  const { label, value } = props;
  const handleCopy = () =>
    copyFn({
      name: label[0]?.toUpperCase() + label.substring(1),
      text: value ?? "",
    });
  return (
    <div className="flex w-full items-center justify-between rounded-lg p-2 text-sm tracking-tight transition-colors duration-300 ease-out hover:bg-sky-100">
      <div className="font-mono text-xs capitalize text-coal opacity-60">
        {props.label}
      </div>
      <div
        className="cursor-pointer font-medium text-dyan"
        onClick={handleCopy}
      >
        {props.value}
      </div>
    </div>
  );
};
