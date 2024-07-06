"use client";

import { HashtagIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  DarkCard,
  FormCardTitle,
  FormSeparator,
  NeutralCard0,
} from "../../(components)/form-card";
import { downloadFiles, errHandler } from "@/utils/helpers";
import { ScrollTextIcon } from "lucide-react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/libs/db";
import { type IDMRequestSchema } from "@/server/resource/idm";
import { ImageList } from "../../request/[id]/image-list";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { Button } from "@/app/(ui)/button";
import { ArrowDownTrayIcon, InboxIcon } from "@heroicons/react/24/outline";
import { onSuccess } from "@/utils/toast";
import moment from "moment";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/(context)/context";

export const RequestViewerContent = (props: { id: string | undefined }) => {
  const profile = useContext(AuthContext)?.profile;

  useEffect(() => {
    if (profile?.accountType === "UNDERWRITER") {
      onSuccess("underwriter");
    } else {
      onSuccess("not underwriter");
    }
  }, [profile]);

  const docRef = doc(db, `${process.env.NEXT_PUBLIC_LIVE_REQS}/${props.id}`);
  const [snapshot] = useDocument(docRef);

  const request = snapshot?.data() as IDMRequestSchema;

  const { imagelist } = useDownloadURLs(props.id);

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

  return (
    <div className="h-[calc(100vh-90px)] overflow-y-scroll border-y-[0.33px] border-neutral-300">
      <DarkCard>
        <div className="flex h-[99px] flex-col justify-center space-y-4 px-4">
          <div className="flex w-full justify-between">
            <div className="text-sm font-semibold text-paper/80">
              Created by
            </div>
            <div className="flex items-center space-x-4 rounded-md bg-neutral-900 px-3 py-1 font-mono text-sm tracking-wider text-paper opacity-80">
              <p className="font-mono text-xs opacity-80">Agent ID:</p>
              <p className="font-mono text-xs">
                {request?.agentId?.substring(0, 12)}
              </p>
            </div>
          </div>

          <div className="w-full text-xs">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <div className="w-[6ch] font-medium tracking-tight text-paper/50">
                  Name
                </div>
                <p className="font-sans font-semibold text-white">
                  {request?.agentName}
                </p>
              </div>

              <div className="flex w-full items-center justify-end space-x-4 space-y-1">
                <div className="font-medium tracking-tight text-paper/70">
                  Created:
                </div>
                <p className="font-mono text-xs text-white opacity-80">
                  {moment(request?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/*  */}

            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <div className="w-[6ch] font-medium tracking-tight text-paper/50">
                  Email
                </div>
                <p className="font-mono tracking-wider text-white opacity-80">
                  {props.id}
                </p>
              </div>

              <div className="flex w-full items-center justify-end space-x-4">
                <div className="font-medium tracking-tight text-paper/60">
                  Last update:
                </div>
                <p className="font-mono text-white opacity-80">
                  {moment(request?.updatedAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DarkCard>

      <div className="space-y-6">
        <NeutralCard0>
          <div className="flex items-center justify-between">
            <FormCardTitle>Request Details</FormCardTitle>
            <p className="font-mono text-sm tracking-wider opacity-80">
              <span className="px-4 text-xs font-medium uppercase opacity-50">
                Request id:
              </span>
              {props.id}
            </p>
          </div>
          <FormSeparator />
          <div className="h-[calc(100vh-358px)]">
            <div className="grid h-full w-full grid-cols-6">
              <div className="col-span-2 h-full rounded-xl bg-gradient-to-b from-white via-zap to-transparent p-6">
                <div className="space-y-6">
                  <div className="h-[36px] text-sm font-semibold tracking-tight text-dyan/80">
                    Assured Info
                  </div>
                  <div className="flex h-full items-center space-x-4 text-dyan">
                    <div className="flex size-[48px] items-center justify-center rounded-full bg-neutral-200">
                      <UserIcon className="scale-50 text-white" />
                    </div>
                    <div className="">
                      <div className="font-medium leading-none tracking-tighter">
                        {request?.assuredData?.firstName}
                      </div>
                      <div className="font-bold leading-none tracking-tight">
                        {request?.assuredData?.lastName}
                      </div>
                    </div>
                  </div>

                  <div className=".bg-gradient-to-b h-fit w-full space-y-0.5 rounded-xl border-[0.0px] border-dyan/50 from-neutral-200 via-neutral-100 to-paper p-4 text-xs text-cyan-900 shadow-md">
                    <div className="h-[42px] text-sm font-semibold tracking-tight">
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
                  <div className=".bg-gradient-to-b h-full w-full space-y-0.5 rounded-xl border-[0.0px] border-dyan/50 from-neutral-200 via-neutral-100 to-paper p-4 text-xs text-cyan-900 shadow-md">
                    <div className="h-[42px] text-sm font-semibold tracking-tight">
                      Address
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

              <div className="col-span-4 rounded-l-xl border-0 border-dyan bg-gradient-to-b from-transparent via-paper to-transparent px-6">
                {/* <div className="h-[36px] text-sm font-semibold tracking-tight text-dyan">
                  Policy Details
                </div> */}
                <div className="grid h-fit w-full grid-cols-7 gap-4 text-xs text-paper">
                  <div className="col-span-3 flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-sky-500 p-4 shadow-md ">
                    <div className="flex h-full w-full justify-between">
                      <div className="font-mono opacity-60">Policy Type</div>
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

                  <div className="col-span-2 flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-void p-4 shadow-md ">
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

                  <div className="col-span-2 flex h-[100px] flex-col items-stretch rounded-xl border-[0.33px] border-dyan/50 bg-zap p-4 text-coal shadow-md ">
                    <div className="flex h-full w-full justify-between">
                      <div className="font-mono opacity-60">
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

                <div className="pt-3">
                  <div className="mb-1 flex h-[36px] items-end text-sm font-semibold tracking-tight text-dyan">
                    Uploaded Documents
                  </div>
                  <div className="h-[230px]">
                    {imagelist && imagelist.length > 0 ? (
                      <ImageList id={props.id} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center space-x-4">
                        <InboxIcon className="size-4 opacity-50" />
                        <p className="text-sm opacity-50">
                          <span className="font-mono">(0)</span> files found.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className=".bg-gradient-to-l h-[100px] rounded-xl border-0 border-dyan from-neutral-300 via-paper to-transparent pr-[1px] pt-[1px]">
                    <div className=".bg-gradient-to-br flex h-full items-end justify-end rounded-r-[11px] from-white to-white/20 py-2 pr-2">
                      <Button
                        size={`sm`}
                        variant={`default`}
                        className="m-0 flex items-center space-x-2"
                        onClick={handleDownloadAll}
                        disabled={imagelist?.length <= 0}
                      >
                        <p>Download all</p>
                        <ArrowDownTrayIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NeutralCard0>
      </div>
    </div>
  );
};

const RowItem = (props: { label: string; value: string | undefined }) => (
  <div className="flex w-full justify-between">
    <div className="font-mono capitalize opacity-60">{props.label}</div>
    <div className="font-medium text-dyan">{props.value}</div>
  </div>
);
