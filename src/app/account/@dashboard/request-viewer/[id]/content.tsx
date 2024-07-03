"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import {
  DarkCard,
  FormCardTitle,
  FormSeparator,
  NeutralCard,
} from "../../(components)/form-card";
import { downloadFiles, errHandler, prettyDate } from "@/utils/helpers";
import { ScrollTextIcon } from "lucide-react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/libs/db";
import { type IDMRequestSchema } from "@/server/resource/idm";
import ImageList from "../../request/[id]/image-list";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { Button } from "@/app/(ui)/button";
import { ArrowDownTrayIcon, InboxIcon } from "@heroicons/react/24/outline";
import { onSuccess } from "@/utils/toast";

export const RequestViewerContent = (props: { id: string | undefined }) => {
  const docRef = doc(db, `${process.env.NEXT_PUBLIC_LIVE_REQS}/${props.id}`);
  const [snapshot] = useDocument(docRef);

  const request = snapshot?.data() as IDMRequestSchema;

  const { imagelist, loading } = useDownloadURLs(props.id, true);

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
        <div className="flex h-[100px] flex-col justify-center space-y-4 px-4">
          <div className="flex w-full justify-between">
            <div className="text-sm font-semibold text-paper/80">
              Created by
            </div>
            <div className="flex items-center space-x-4 rounded-md bg-void px-3 py-1 font-mono text-sm tracking-wider text-paper opacity-80">
              <p className="font-mono text-xs font-medium opacity-50">
                Agent ID:
              </p>
              <p>{request?.agentId?.substring(0, 12)}</p>
            </div>
          </div>

          <div className="w-full text-xs">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <div className="w-[6ch] font-mono font-light tracking-wider text-paper/50">
                  Name
                </div>
                <p className="font-sans font-semibold text-white">
                  {request?.agentName}
                </p>
              </div>

              <div className="flex w-full items-center justify-end space-x-4">
                <div className="font-mono font-light tracking-wider text-paper/50">
                  Submitted on:
                </div>
                <p className="font-mono text-white opacity-80">
                  {prettyDate(request?.updatedAt)}
                </p>
              </div>
            </div>

            {/*  */}

            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <div className="w-[6ch] font-mono tracking-wider text-paper/50">
                  Email
                </div>
                <p className="font-mono tracking-wider text-white opacity-80">
                  {props.id}
                </p>
              </div>

              <div className="flex w-full items-center justify-end space-x-4">
                <div className="font-mono font-light tracking-wider text-paper/50">
                  Last updated:
                </div>
                <p className="font-mono text-white opacity-80">
                  {prettyDate(request?.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DarkCard>

      <div className="space-y-6 p-5">
        <NeutralCard>
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
              <div className="col-span-2 h-full p-6">
                <div className="space-y-6">
                  <div className="h-[36px] text-sm font-semibold tracking-tight text-dyan/80">
                    Assured Info
                  </div>
                  <div className="flex h-full items-center space-x-4 text-dyan">
                    <div className="flex size-[48px] items-center justify-center rounded-full bg-neutral-300">
                      <UserIcon className="scale-50 opacity-20" />
                    </div>
                    <div className="">
                      <div className="font-medium leading-none tracking-tight">
                        {request?.assuredData?.firstName}
                      </div>
                      <div className="font-bold leading-none">
                        {request?.assuredData?.lastName}
                      </div>
                    </div>
                  </div>

                  <div className="h-fit w-full space-y-0.5 rounded-xl border-[0.33px] border-dyan/50 bg-gradient-to-b from-neutral-200 via-neutral-100 to-paper  p-4 text-xs text-cyan-900 shadow-md">
                    <div className="h-[42px] text-sm font-semibold tracking-tight">
                      Contact Details
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Email</div>
                      <div>{request?.assuredData?.email}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Phone</div>
                      <div>{request?.assuredData?.phone}</div>
                    </div>
                  </div>
                  <div className="h-full w-full space-y-0.5 rounded-xl border-[0.33px] border-dyan/50 bg-gradient-to-b from-neutral-200 via-neutral-100 to-paper p-4 text-xs text-cyan-900 shadow-md">
                    <div className="h-[42px] text-sm font-semibold tracking-tight">
                      Address
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Line 1</div>
                      <div>{request?.assuredData?.address?.line1}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Line 2</div>
                      <div>{request?.assuredData?.address?.line2}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">City</div>
                      <div>{request?.assuredData?.address?.city}</div>
                    </div>

                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Province</div>
                      <div>{request?.assuredData?.address?.state}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Postal Code</div>
                      <div>{request?.assuredData?.address?.postalCode}</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="font-mono opacity-60">Country</div>
                      <div>{request?.assuredData?.address?.country}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 rounded-l-xl border-0 bg-gradient-to-r from-white via-paper to-transparent p-6">
                <div className="h-[36px] text-sm font-semibold tracking-tight text-dyan">
                  Policy Details
                </div>
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
                        <ScrollTextIcon className="size-4" />
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
                        <ScrollTextIcon className="size-4" />
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
                      <ImageList
                        id={props.id}
                        imagelist={imagelist}
                        loading={loading}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center space-x-4">
                        <InboxIcon className="size-4 opacity-50" />
                        <p className="text-sm opacity-50">
                          <span className="font-mono">(0)</span> files found.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="rounded-xl bg-gradient-to-l from-neutral-300 via-paper to-transparent pr-[1px] pt-[1px]">
                    <div className="flex h-full items-end justify-end rounded-r-[11px] bg-gradient-to-br from-white to-white/20 py-2 pr-2">
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
        </NeutralCard>
      </div>
    </div>
  );
};
