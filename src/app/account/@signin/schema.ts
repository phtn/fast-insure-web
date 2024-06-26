import { type LoginSchema } from "@/server/resource/account";
import { type LoginField } from "./types";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export const loginDefaults: LoginSchema = {
  email: "",
  password: "",
};

export const loginFields: LoginField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    inputType: "input",
    type: "email",
    alt: "email",
    icon: EnvelopeIcon,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    inputType: "input",
    type: "password",
    alt: "password",
    icon: LockClosedIcon,
  },
];
