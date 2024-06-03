"use client";

import {
  BlocksIcon,
  CarIcon,
  CheckCircleIcon,
  FileTypeIcon,
  FileUpIcon,
  LoaderIcon,
  SaveIcon,
  ScrollTextIcon,
  SendIcon,
  UserRoundIcon,
} from "lucide-react";
import { FormCard } from "../../(components)/form-card";
import { Header } from "../../(components)/header";
import { Form, FormField, FormItem } from "@/app/(ui)/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  policyTypes,
  requestDefaults,
  requestFields,
  transformer,
} from "./schema";
import { BotText, InputOption } from "../../(components)/input-option";
import { ImageUploader } from "../../(components)/image-uploader";
import {
  type ChangeEvent,
  useState,
  useEffect,
  useContext,
  type FormEvent,
} from "react";
import {
  type IDMRequestFormSchema,
  IDMRequestForm,
} from "@/server/resource/request";
import { useLocator } from "../../(hooks)/locator";
import { SelectOption } from "../../(components)/select-option";
import { useSubmitRequest } from "../../(hooks)/submit-request";
import { useDownloadUrls } from "../../(hooks)/file-handler";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Button } from "@/app/(ui)/button";
import { AgentContext } from "../../(context)/context";

export const RequestPage = (props: { id: string }) => {
  const [savedValues, setSavedValues] = useState<
    IDMRequestFormSchema | undefined
  >();
  const ctx = useContext(AgentContext);
  const drafts = ctx?.drafts;
  const loading = ctx?.loading;

  const form = useForm<IDMRequestFormSchema>({
    resolver: zodResolver(IDMRequestForm),
    defaultValues: {
      ...requestDefaults,
    },
  });

  useEffect(() => {
    if (drafts) {
      const doc = drafts.find((item) => item.id === props.id);

      const assuredData = doc?.assuredData;
      const vehicleInfo = doc?.vehicleInfo;

      if (doc) {
        setSavedValues({
          firstName: assuredData?.firstName ?? "",
          lastName: assuredData?.lastName ?? "",
          middleName: assuredData?.middleName ?? "",
          email: assuredData?.email ?? "",
          phone: assuredData?.phone ?? "",
          line1: assuredData?.address?.line1 ?? "",
          line2: assuredData?.address?.line2 ?? "",
          city: assuredData?.address?.city ?? "",
          state: assuredData?.address?.state ?? "",
          country: assuredData?.address?.country ?? "PH",
          postalCode: assuredData?.address?.postalCode ?? "",
          policyType: doc.policyType ?? "CTPL",
          year: vehicleInfo?.year ?? "",
          make: vehicleInfo?.make ?? "",
          model: vehicleInfo?.model ?? "",
          type: vehicleInfo?.type ?? "private",
          body: vehicleInfo?.body ?? "sedan",
        });
      }
    }
  }, [drafts, props.id]);

  useEffect(() => {
    if (savedValues) {
      form.reset(savedValues);
    }
  }, [savedValues, form]);

  const [postalCode, setPostalCode] = useState<string>("");
  const { getLocation, locationValues } = useLocator();
  const { policyType, submit, submitLoading, setPolicyType, saveDraft } =
    useSubmitRequest({
      id: props.id,
    });

  const onSubmit = (data: IDMRequestFormSchema) => {
    submit(data);
  };

  const watchAll = form.watch();
  const handleSave = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    saveDraft({ ...watchAll });
  };

  useEffect(() => {
    if (!locationValues) return;
    form.reset(locationValues);
  }, [form, locationValues]);

  const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 4) {
    }
  };

  const { downloadURLs } = useDownloadUrls(props.id);

  const assuredInfo = requestFields.slice(0, 5);
  const assuredAddress = requestFields.slice(5, 9);
  const countryField = requestFields[9];
  const postalCodeField = requestFields[10];
  const vehicleFieldsA = requestFields.slice(12, 15);
  const vehicleFieldsB = requestFields.slice(15);

  return (
    <div className="h-[calc(100vh-118px)] overflow-y-scroll">
      <Header title="Request Form" />
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormCard
              icon={
                form.formState.isValid
                  ? CheckCircleIcon
                  : loading
                    ? LoaderIcon
                    : UserRoundIcon
              }
              route={`request`}
              title={"Assured Info"}
              extra={props.id}
            >
              <div className="protrait:flex grid grid-cols-2 gap-x-2">
                <div>
                  {assuredInfo.map((item, i) => (
                    <FormField
                      control={form.control}
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
                      control={form.control}
                      name={item.name}
                      key={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <InputOption
                            item={item}
                            index={i}
                            length={assuredAddress.length + 1}
                            field={field}
                          />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="grid grid-cols-2">
                    <FormField
                      name={"country"}
                      key={"country"}
                      render={({ field }) => (
                        <FormItem>
                          <BotText {...countryField} {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={"postalCode"}
                      key={"postalCode"}
                      render={() => (
                        <FormItem>
                          <BotText
                            {...postalCodeField}
                            value={postalCode}
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              if (e.target.value.length === 4) {
                                getLocation(e.target.value);
                              }
                              handlePostalCodeChange(e);
                            }}
                          />
                        </FormItem>
                      )}
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

            {policyType === "CTPL" ? (
              <FormCard icon={CarIcon} route={"vehicle"} title="Vehicle Info">
                <div className="protrait:flex grid grid-cols-2 gap-x-2">
                  <div>
                    {vehicleFieldsA.map((item, i) => (
                      <FormField
                        control={form.control}
                        name={item.name}
                        key={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <InputOption
                              item={item}
                              index={i}
                              length={vehicleFieldsA.length}
                              field={field}
                            />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <div>
                    {vehicleFieldsB.map((item, i) => (
                      <FormField
                        control={form.control}
                        name={item.name}
                        key={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <InputOption
                              item={item}
                              index={i}
                              length={vehicleFieldsB.length}
                              field={field}
                            />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </FormCard>
            ) : null}

            <FormCard
              title="Documents uploaded"
              extra={
                <div className="flex items-center font-light">
                  (
                  <div
                    className={cn(
                      `font-semibold`,
                      !downloadURLs ? `animate-spin` : ``,
                    )}
                  >
                    {downloadURLs?.length ?? `-`}
                  </div>
                  ) files
                </div>
              }
              route="files"
              icon={FileUpIcon}
            >
              <div className="protrait:flex grid grid-cols-4 gap-3">
                <ImageUploader
                  dir={`requests/${props.id}`}
                  filename={props.id + downloadURLs?.length}
                />
                {downloadURLs?.map((item) => (
                  <Image
                    key={item}
                    alt={item}
                    src={item}
                    width={0}
                    height={0}
                    unoptimized
                    className="h-[200px] w-auto rounded-md"
                  />
                ))}
              </div>
            </FormCard>

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
