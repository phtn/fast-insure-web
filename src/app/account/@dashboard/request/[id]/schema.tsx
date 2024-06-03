import { type FieldProps } from "../../(components)/form-types";
import {
  BlendIcon,
  Building2Icon,
  BusFrontIcon,
  GlobeIcon,
  HexagonIcon,
  LucideCalendar,
  MailIcon,
  MapIcon,
  MapPinnedIcon,
  MilestoneIcon,
  PencilLineIcon,
  PhoneIcon,
  ShapesIcon,
  SignpostIcon,
  UserRoundIcon,
} from "lucide-react";
import { type IDMRequestFormSchema } from "@/server/resource/request";
import { type SelectOptionType } from "../../(components)/select-option";

export const requestFields: FieldProps<IDMRequestFormSchema>[] = [
  {
    name: "firstName",
    alt: "name",
    icon: UserRoundIcon,
    label: "First name@required",
    placeholder: "First name",
    type: "text",
  },
  {
    name: "lastName",
    alt: "name",
    icon: UserRoundIcon,
    label: "Last name@required",
    placeholder: "Last name",
    type: "text",
  },
  {
    name: "middleName",
    alt: "middle name",
    icon: UserRoundIcon,
    label: "Middle Name",
    placeholder: "Middle name",
    type: "text",
  },
  {
    name: "email",
    alt: "email",
    icon: MailIcon,
    label: "Email@required",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "phone",
    alt: "phone",
    icon: PhoneIcon,
    label: "Phobe@required",
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
    icon: MapPinnedIcon,
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
    icon: MapIcon,
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
    name: "policyType",
    alt: "policy type",
    icon: UserRoundIcon,
    label: "Policy type@required",
    placeholder: "Policy type",
    type: "text",
    disabled: true,
  },
  {
    name: "year",
    alt: "year",
    icon: LucideCalendar,
    label: "Year",
    placeholder: "Year",
    type: "text",
  },
  {
    name: "make",
    alt: "remarks",
    icon: BlendIcon,
    label: "Make",
    placeholder: "Make",
    type: "text",
  },
  {
    name: "model",
    alt: "model",
    icon: HexagonIcon,
    label: "Model",
    placeholder: "Model",
    type: "text",
  },
  {
    name: "type",
    alt: "use-type",
    icon: BusFrontIcon,
    label: "Type",
    placeholder: "Type",
    type: "text",
  },
  {
    name: "body",
    alt: "body",
    icon: ShapesIcon,
    label: "Body",
    placeholder: "Body",
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
];

export const requestDefaults: IDMRequestFormSchema = {
  country: "PH",
};

export const policyTypes: SelectOptionType[] = [
  {
    label: "CTPL",
    complete: "CTPL - Compulsory Third-Party Liability",
    value: "CTPL",
    disabled: false,
  },
  {
    label: "PA",
    complete: "PA - Personal Accidents",
    value: "PA",
    disabled: true,
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
