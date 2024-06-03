import { Form } from "@@ui/form";
import { type OCR_DE_FieldSchema } from "@/server/resource/ocr";
import { filterFields, getVehicleDefaults } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  ActiveForm,
  vehicleDefaults,
  vehicleFields,
  vehicleResource,
  type VehicleSchema,
} from "./active-form";

export type AutoFormProps = {
  fields: OCR_DE_FieldSchema | undefined;
  setCount: Dispatch<SetStateAction<number | undefined>>;
  loading: boolean;
  addAuto: (auto_data: VehicleSchema) => void;
  downloadURL: string;
  withScan: boolean;
};

export const AutoForm = ({
  fields,
  setCount,
  loading,
  addAuto,
  downloadURL,
  withScan,
}: AutoFormProps) => {
  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleResource),
    defaultValues: fields ? getVehicleDefaults(fields) : vehicleDefaults,
  });

  return (
    <Form {...form}>
      <ActiveForm
        form={form}
        fields={withScan ? filterFields(fields!) : vehicleFields}
        setCount={setCount}
        loading={loading}
        addAuto={addAuto}
        downloadURL={downloadURL}
        withScan={withScan}
      />
    </Form>
  );
};
