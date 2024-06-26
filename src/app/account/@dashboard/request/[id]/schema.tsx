import { type FieldProps } from "../../(components)/form-types";
import {
  Building2Icon,
  GlobeIcon,
  MapIcon,
  MapPinnedIcon,
  MilestoneIcon,
  PencilLineIcon,
  SignpostIcon,
  StickerIcon,
} from "lucide-react";
import { type IDMRequestFormSchema } from "@/server/resource/request";
import { type SelectOptionType } from "../../(components)/select-option";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";

export const requestFields: FieldProps<IDMRequestFormSchema>[] = [
  {
    name: "firstName",
    alt: "name",
    icon: UserIcon,
    label: "First name@required",
    placeholder: "First name",
    type: "text",
  },
  {
    name: "lastName",
    alt: "name",
    // icon: UserIcon,
    label: "Last name@required",
    placeholder: "Last name",
    type: "text",
  },
  {
    name: "middleName",
    alt: "middle name",
    // icon: UserIcon,
    label: "Middle Name",
    placeholder: "Middle name",
    type: "text",
  },
  {
    name: "email",
    alt: "email",
    icon: EnvelopeIcon,
    label: "Email@required",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "phone",
    alt: "phone",
    icon: PhoneIcon,
    label: "Phone@required",
    placeholder: "Phone number",
    type: "tel",
  },

  {
    name: "line1",
    alt: "line1",
    icon: MilestoneIcon,
    label: "Street / Unit number",
    placeholder: "Street / Unit number",
    type: "text",
  },
  {
    name: "line2",
    alt: "line2",
    icon: MapIcon,
    label: "Subdivision | Area",
    placeholder: "Subdivision",
    type: "text",
  },
  {
    name: "city",
    alt: "city",
    icon: Building2Icon,
    label: "City",
    placeholder: "City",
    type: "text",
  },
  {
    name: "state",
    alt: "state",
    icon: MapPinnedIcon,
    label: "Region",
    placeholder: "Region",
    type: "text",
  },
  {
    name: "country",
    alt: "country",
    icon: GlobeIcon,
    label: "Country",
    placeholder: "Country",
    type: "text",
    disabled: true,
  },
  {
    name: "postalCode",
    alt: "postalCode",
    icon: SignpostIcon,
    label: "Postal Code",
    placeholder: "Postal Code",
    type: "text",
  },
  {
    name: "plateNumber",
    alt: "plate number",
    icon: StickerIcon,
    label: "",
    placeholder: "Plate Number",
    type: "text",
  },
  {
    name: "conductionNumber",
    alt: "conduction number",
    icon: StickerIcon,
    label: "",
    placeholder: "Conduction Number",
    type: "text",
  },
  {
    name: "remarks",
    alt: "remarks",
    icon: PencilLineIcon,
    label: "Remarks",
    placeholder: "Remarks",
    type: "text",
  },
  // {
  //   name: "policyType",
  //   alt: "policy type",
  //   icon: UserRoundIcon,
  //   label: "Policy type@required",
  //   placeholder: "Policy type",
  //   type: "text",
  //   disabled: true,
  // },
];

export const requestDefaults: IDMRequestFormSchema = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  plateNumber: "",
  remarks: "",
  country: "PH",
};

export const policyTypes: SelectOptionType[] = [
  {
    label: "CTPL",
    complete: "Compulsory Third-Party Liability",
    value: "CTPL",
    disabled: false,
  },
  {
    label: "CCI",
    complete: "Comprehensive Car Insurance",
    value: "CCI",
    disabled: false,
  },
  {
    label: "PA",
    complete: "Personal Accident",
    value: "PA",
    disabled: true,
  },
];

export const plateTypes: SelectOptionType[] = [
  {
    label: "Plate Number",
    complete: "Plate Number",
    value: "plate",
    disabled: false,
  },
  {
    label: "Conduction Number",
    complete: "Conduction Number",
    value: "conduction",
    disabled: false,
  },
];

export const transformer = (list: SelectOptionType[] | undefined) => {
  if (list) {
    return list.map((item) => ({
      value: `${item.value}`,
      display: item.url
        ? `${item.label}@${item.complete}@${item.url}`
        : `${item.label}@${item.complete}`,
      disabled: item.disabled,
    }));
  }
};
