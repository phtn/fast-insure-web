"use client";

import { Button } from "@/app/(ui)/button";
import { Form, FormField, FormItem } from "@/app/(ui)/form";
import type { PlateTypeSchema } from "@/server/resource/idm";
import {
  IDMRequestForm,
  type IDMRequestFormSchema,
} from "@/server/resource/request";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlocksIcon,
  CarIcon,
  CheckCircleIcon,
  FileDigitIcon,
  FileTypeIcon,
  LoaderIcon,
  SaveIcon,
  ScrollTextIcon,
  SendIcon,
  UploadCloudIcon,
  UserRoundIcon,
} from "lucide-react";
import {
  useContext,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { useForm, useWatch, type UseFormRegister } from "react-hook-form";
import { FormCard } from "../../(components)/form-card";
import { Header } from "../../(components)/header";
import { ImageUploader } from "../../(components)/image-uploader";
import { BotText, InputOption } from "../../(components)/input-option";
import {
  SelectOption,
  type SelectOptionType,
} from "../../(components)/select-option";
import { AgentContext } from "../../(context)/context";
import { useDownloadURLs } from "../../(hooks)/file-handler";
import { useLocator } from "../../(hooks)/locator";
import { useSubmitRequest } from "../../(hooks)/useRequestService";
import { useDraftValues } from "../../(hooks)/useDraft";
import { plateTypes, policyTypes, requestFields, transformer } from "./schema";
import { opts, toggleState } from "@/utils/helpers";
import ImageList from "./image-list";
import { ArrowUpOnSquareStackIcon, PhotoIcon } from "@heroicons/react/24/solid";

export const RequestPage = ({ id }: { id: string }) => {
  const agentCtx = useContext(AgentContext);
  const drafts = agentCtx?.drafts;
  const loading = agentCtx?.loading;

  const form = useForm<IDMRequestFormSchema>({
    resolver: zodResolver(IDMRequestForm),
  });

  const { reset, watch, control, register, handleSubmit, formState } = form;
  const { watchAll, savedValues } = useDraftValues({
    drafts,
    id,
    reset,
    watch,
  });

  const postalField = useWatch({ control, name: "postalCode" });
  useLocator({ reset, postalField });

  const {
    policyType,
    submit,
    submitLoading,
    setPolicyType,
    setPlateType,
    saveDraft,
  } = useSubmitRequest({
    id,
  });

  const onSubmit = (data: IDMRequestFormSchema) => {
    submit(data);
  };

  const handleSave = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    saveDraft(watchAll);
    reset(savedValues);
  };

  const assuredInfo = requestFields.slice(0, 5);
  const assuredAddress = requestFields.slice(5, 9);
  const countryField = requestFields[9];
  const postalCodeField = requestFields[10];
  // const vehicleFields = requestFields.slice(12, 13);

  return (
    <div className="h-[calc(100vh-118px)] overflow-y-scroll">
      <Header title="Request Form" />
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormCard
              icon={
                formState.isValid
                  ? CheckCircleIcon
                  : loading
                    ? LoaderIcon
                    : UserRoundIcon
              }
              route={`assured`}
              title={"Assured Info"}
              extra={id.substring(0, 12)}
            >
              <div className="grid grid-cols-2 gap-x-4 portrait:grid-cols-1 portrait:gap-y-4">
                <div>
                  {assuredInfo.map((item, i) => (
                    <FormField
                      control={control}
                      name={item.name}
                      key={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <InputOption
                            item={item}
                            index={i}
                            length={assuredInfo.length}
                            field={field}
                          />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <div>
                  {assuredAddress.map((item, i) => (
                    <FormField
                      control={control}
                      name={item.name}
                      key={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <InputOption
                            item={item}
                            index={i}
                            length={assuredInfo.length}
                            field={field}
                          />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="grid grid-cols-2">
                    <BotText {...register("country")} {...countryField} />
                    <BotText
                      {...postalCodeField}
                      {...form.register("postalCode")}
                    />
                  </div>
                </div>
              </div>
            </FormCard>

            <FormCard
              icon={ScrollTextIcon}
              route={`upload`}
              title="Policy Info"
            >
              <SelectOption
                title={"Policy Type"}
                label={"Policy Type@required"}
                icon={FileTypeIcon}
                onValueChange={setPolicyType}
                options={policyTypes ?? []}
                transformer={transformer}
                loading={false}
                position="single"
              />
            </FormCard>

            {policyType === "CTPL" || policyType === "CCI" ? (
              <PlateTypeSelector
                register={form.register}
                plateTypes={plateTypes}
                setPlateType={setPlateType}
              />
            ) : null}

            <DocumentUploader id={id} />

            <FormCard icon={BlocksIcon} route={`upload`} title="Extras">
              <div className="flex w-[218px] items-center space-x-2 p-2"></div>
              <div>
                {/* {downloadUrl ? <p className="text-xs">{downloadUrl}</p> : null} */}
              </div>
            </FormCard>
            <div className="flex h-[64px] items-center justify-end space-x-4">
              <Button
                variant={`default`}
                className="flex items-center space-x-2 bg-indigo-400 px-4"
                // type="submit"
                onClick={handleSave}
              >
                <div>Save as draft</div>
                <SaveIcon className="size-3" />
              </Button>
              <Button
                variant={`default`}
                className="flex items-center space-x-2 px-4"
                disabled={!form.formState.isValid}
              >
                <div>Submit Request</div>
                {submitLoading ? (
                  <LoaderIcon className="size-3" />
                ) : (
                  <SendIcon className="size-3" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

type PlateTypeSelectorProps = {
  register: UseFormRegister<IDMRequestFormSchema>;
  plateTypes: SelectOptionType[] | undefined;
  setPlateType: Dispatch<SetStateAction<PlateTypeSchema | undefined>>;
};
const PlateTypeSelector = (props: PlateTypeSelectorProps) => {
  return (
    <FormCard icon={CarIcon} route={"vehicle"} title="Vehicle Info">
      <div className="grid grid-cols-2 gap-x-2 portrait:grid-cols-1">
        <div>
          <SelectOption
            title={"Plate Type"}
            label={"Plate Type@required"}
            icon={FileTypeIcon}
            onValueChange={props.setPlateType}
            options={props.plateTypes ?? []}
            transformer={transformer}
            loading={false}
            position="top"
          />
          <BotText
            icon={FileDigitIcon}
            label="Plate # / Induction@required"
            placeholder="XYZ0000"
            {...props.register("plateNumber")}
          />
        </div>
      </div>
    </FormCard>
  );
};

export const DocumentUploader = (props: { id: string | undefined }) => {
  const { id } = props;
  const { imagelist, loading } = useDownloadURLs(id);
  const [viewDropzone, setViewDropzone] = useState(false);

  const ViewOptions = useCallback(() => {
    const options = opts(
      <ImageUploader
        dir={`requests/${id}`}
        filename={`${id}` + `${imagelist?.length}`}
      />,
      <ImageList id={id} imagelist={imagelist} loading={loading} />,
    );
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        {options.get(viewDropzone)}
      </div>
    );
  }, [viewDropzone, id, imagelist, loading]);

  const handleViewDropzone = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleState(setViewDropzone);
  };

  return (
    <FormCard
      title="File Uploader"
      iconStyle="text-black size-5"
      extra={
        <UploaderExtra
          filecount={imagelist.length}
          loading={loading}
          viewDropzone={handleViewDropzone}
        />
      }
      route="upload"
      icon={ArrowUpOnSquareStackIcon}
    >
      <ViewOptions />
    </FormCard>
  );
};

const UploaderExtra = (props: {
  filecount: number;
  loading: boolean;
  viewDropzone: (e: FormEvent<HTMLButtonElement>) => void;
}) => {
  const { filecount, loading, viewDropzone } = props;
  const FilesLoadingOptions = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 animate-spin stroke-[1px]" />,
      <PhotoIcon className="size-4" />,
    );
    return <>{options.get(loading)}</>;
  }, [loading]);

  return (
    <div className="flex items-center space-x-2 font-light">
      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-cyan-600 text-xs tracking-tight text-zap transition-all duration-300 ease-out hover:text-white active:scale-[95%]"
        onClick={(e: FormEvent<HTMLButtonElement>) => e.preventDefault()}
      >
        <FilesLoadingOptions />
        <p>{filecount ?? 0}</p>
        <p>files</p>
      </Button>

      <Button
        size={`sm`}
        variant={"ghost"}
        className="flex items-center space-x-2 bg-white font-sans text-xs tracking-tight text-cyan-600 shadow-sm transition-all duration-300 ease-out hover:text-cyan-900 active:scale-[95%]"
        onClick={viewDropzone}
      >
        <p>upload file</p>
        <UploadCloudIcon className="size-4 stroke-[1.5px]" />
      </Button>
    </div>
  );
};
