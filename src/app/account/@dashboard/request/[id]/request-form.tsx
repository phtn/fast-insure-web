"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { NeutralCard } from "../../(components)/form-card";
import { useRequestService } from "../../(hooks)/useRequestService";
import { requestDefaults, requestFields } from "./schema";
import { Form, FormControl, FormField, FormItem } from "@/app/(ui)/form";
import {
  IDMRequestForm,
  type IDMRequestFormSchema,
} from "@/server/resource/request";
import { type ReactNode, useState, type FormEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Control,
  type ControllerRenderProps,
  useForm,
  useWatch,
} from "react-hook-form";
import tw from "tailwind-styled-components";
import { InputFieldX } from "@/app/(ui)/input";
import { Button } from "@/app/(ui)/button";
import { RadioButton, RadioGroup } from "@/app/(ui)/radio";
import { useLocator } from "../../(hooks)/useLocator";
import { CheckBx } from "@/app/(ui)/checkbox";
import { Label } from "@/app/(ui)/label";
import { cn } from "@/utils/cn";
import { DocumentUploader } from "./uploader";
import { type FieldProps } from "../../(components)/form-types";
import { type PolicyTypeSchema } from "@/server/resource/idm";

export const RequestForm = (props: { id: string }) => {
  const { saveDraft, savedValues } = useRequestService({ id: props.id });

  const [values, setValues] = useState<IDMRequestFormSchema | undefined>(
    savedValues,
  );

  const [selectedPolicyType, setSelected] = useState<PolicyTypeSchema>(
    savedValues?.policyType ?? "CTPL",
  );

  useEffect(() => {
    if (savedValues) {
      console.log(savedValues);
      setValues(savedValues);
    } else setValues(requestDefaults);
  }, [savedValues]);

  const form = useForm<IDMRequestFormSchema>({
    resolver: zodResolver(IDMRequestForm),
    values,
  });

  useEffect(() => {
    if (savedValues) {
      form.reset(savedValues);
      setSelected(savedValues.policyType ?? "CTPL");
    }
  }, [savedValues, form]);

  const assuredInfo = requestFields.slice(0, 3);
  const assuredContact = requestFields.slice(3, 5);
  const assuredAddress1 = requestFields.slice(5, 8);
  const assuredAddress2 = requestFields.slice(8, 10);
  const assuredAddress3 = requestFields[10];

  const postalField = useWatch({ control: form.control, name: "postalCode" });
  useLocator({ reset: form.reset, postalField });

  const [plateChecked, setPlateChecked] = useState(false);
  const [conductionChecked, setConductionChecked] = useState(false);

  const onSubmit = (data: IDMRequestFormSchema) => {
    // submit(data);
    console.log(data);
  };

  const onSave = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const watchAll = form.watch();
    saveDraft({ ...watchAll, policyType: selectedPolicyType });
  };
  return (
    <div className="h-[calc(100vh-91px)] overflow-y-scroll border">
      <div className=""></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="p-5">
            <NeutralCard>
              <FormCardTitle>Assured Info</FormCardTitle>
              <FormSeparator />
              <AssuredFieldContainer>
                <FieldRow title="Assured Name">
                  <Fields control={form.control} fields={assuredInfo} />
                </FieldRow>
                <FieldRow title="Contact Details">
                  <Fields control={form.control} fields={assuredContact} />
                </FieldRow>
                <div className="my-4 h-[0.33px] bg-gradient-to-r from-neutral-400 to-transparent" />
                <FieldRow title="Address">
                  <Fields control={form.control} fields={assuredAddress1} />
                </FieldRow>
                <FieldRow title="">
                  <Fields control={form.control} fields={assuredAddress2} />
                  <InputFieldX
                    {...assuredAddress3}
                    {...form.register("postalCode")}
                    className="w-[300px]"
                  />
                </FieldRow>
              </AssuredFieldContainer>
            </NeutralCard>
          </div>

          <div className="p-5">
            <NeutralCard>
              <FormCardTitle>Select Policy Type</FormCardTitle>
              <FormSeparator />
              <AssuredFieldContainer>
                <RadioGroup defaultValue="CTPL">
                  <div className="grid w-full grid-cols-3 gap-x-6">
                    <FormItem>
                      <RadioButton
                        onClick={() => setSelected("CTPL")}
                        checked={selectedPolicyType === "CTPL"}
                        value="CTPL"
                        description="Compulsory Third-Party Liability Insurance Policy"
                      />
                    </FormItem>
                    <FormItem>
                      <RadioButton
                        checked={selectedPolicyType === "COMP"}
                        onClick={() => setSelected("COMP")}
                        value="COMPREHENSIVE"
                        description="Comprehensive Insurance Policy"
                      />
                    </FormItem>
                    <FormItem>
                      <RadioButton
                        checked={selectedPolicyType === "PAIN"}
                        onClick={() => setSelected("PAIN")}
                        value="PERSONAL ACCIDENT"
                        description="Personal Accidents Insurance Policy"
                        disabled
                      />
                    </FormItem>
                  </div>
                </RadioGroup>
              </AssuredFieldContainer>
            </NeutralCard>
          </div>

          <div className="p-5">
            <NeutralCard>
              <FormCardTitle>Vehicle Info</FormCardTitle>
              <FormSeparator />
              <AssuredFieldContainer>
                <FieldRow title="">
                  <div>
                    <div className="flex items-center space-x-4 px-0.5">
                      <CheckBx
                        id="plate"
                        onCheckedChange={() => setPlateChecked(!plateChecked)}
                      >
                        <CheckIcon
                          className={cn(
                            "size-4 rotate-6 stroke-[0.33px] text-white transition-all duration-300",
                            plateChecked
                              ? `scale-100 stroke-[3px]`
                              : `scale-0 stroke-1`,
                          )}
                        />
                      </CheckBx>
                      <Label
                        htmlFor="plate"
                        className={cn(
                          "font-mono text-xs tracking-[0.5px]",
                          plateChecked ? "opacity-100" : "opacity-50",
                        )}
                      >
                        with Plate Number
                      </Label>
                    </div>
                    <InputFieldX
                      {...requestFields[11]}
                      {...form.register("plateNumber")}
                      className="w-[300px]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-4 px-0.5">
                      <CheckBx
                        id="conduction"
                        onCheckedChange={() =>
                          setConductionChecked(!conductionChecked)
                        }
                      >
                        <CheckIcon
                          className={cn(
                            "size-4 rotate-6 stroke-[0.33px] text-white transition-all duration-300",
                            conductionChecked
                              ? `scale-100 stroke-[3px]`
                              : `scale-0 stroke-1`,
                          )}
                        />
                      </CheckBx>
                      <Label
                        htmlFor="conduction"
                        className={cn(
                          "font-mono text-xs tracking-[0.5px]",
                          conductionChecked ? "opacity-100" : "opacity-50",
                        )}
                      >
                        with Conduction Number
                      </Label>
                    </div>
                    <InputFieldX
                      {...requestFields[12]}
                      {...form.register("conductionNumber")}
                      className="w-[300px]"
                    />
                  </div>
                </FieldRow>
              </AssuredFieldContainer>
            </NeutralCard>
          </div>

          <div className="p-5">
            <DocumentUploader id={props.id}>
              <FormCardTitle>File uploader</FormCardTitle>
              <FormSeparator />
            </DocumentUploader>
          </div>
          <div className="flex h-[100px] items-center justify-end space-x-4 px-4">
            <Button
              className="border-sky-500 font-semibold  text-sky-500"
              size={"lg"}
              variant={"outline"}
              onClick={onSave}
            >
              Save draft
            </Button>
            <Button
              size={"lg"}
              disabled
              className="bg-sky-500"
              onClick={onSave}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const FieldRow = (props: { title: string; children: ReactNode }) => (
  <div className="space-y-1.5">
    <p className="px-1 text-sm font-medium tracking-tighter opacity-80">
      {props.title}
    </p>
    <div className="flex items-center space-x-4">{props.children}</div>
  </div>
);
type TField = { field: ControllerRenderProps<IDMRequestFormSchema> };
/* eslint-disable react/display-name */
const render =
  (item: FieldProps<IDMRequestFormSchema>) =>
  ({ field }: TField) => (
    <FormItem className="">
      <FormControl>
        <InputFieldX
          alt={item.alt}
          className="w-[300px]"
          label={item.label}
          icon={item.icon}
          type={item.type}
          {...field}
        />
      </FormControl>
    </FormItem>
  );
export type FormFieldProps = {
  fields: FieldProps<IDMRequestFormSchema>[];
  control: Control<IDMRequestFormSchema>;
};
const Fields = ({ control, fields }: FormFieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      control={control}
      name={item.name}
      render={render(item)}
    />
  ));
};

const AssuredFieldContainer = tw.div`
  px-4 portrait:gap-y-4 space-y-8
  `;

const FormCardTitle = tw.div`
  p-4 text-lg font-semibold tracking-tight text-dyan
  `;

const FormSeparator = tw.div`
  mx-4 rounded-full mb-6 h-[0.75px] bg-gradient-to-r from-indigo-800/40 via-neutral-400/60 to-transparent
  `;
