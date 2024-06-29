import type { OCR_DE_FieldSchema } from "@/server/resource/ocr";
import type { Dispatch, ReactElement, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess, onWarn } from "./toast";
import pkg from "../../package.json";
export const getVersion = () => {
  return pkg.version;
};
// import { type VehicleSchema } from "@/app/account/@dashboard/(old)/(autos)/active-form";

export const degreesToRadians = (degrees: number | string): number => {
  const getRad = (d: number) => (d * Math.PI) / 180;

  if (typeof degrees === "string") {
    const deg = parseInt(degrees);
    return getRad(deg);
  }

  return getRad(degrees);
};

export const createInvoiceNumber = (): string => {
  const regex = /-(.*)-/;
  const uid = uuidv4();

  const match = uid.match(regex);
  if (match && match.length > 1) {
    const stringBetweenDashes = match[1];
    return `INV-${stringBetweenDashes}`;
  } else {
    return `INV-${uid.substring(0, 13)}`;
  }
};

export const createReferenceNumber = () => {
  const regex = /-(.*)-/;
  const uid = uuidv4();

  const match = uid.match(regex);
  if (match && match.length > 1) {
    const stringBetweenDashes = match[1];
    return `FAST-${stringBetweenDashes}`;
  } else {
    return `FAST-${uid.substring(0, 13)}`;
  }
};

export const removeLastEqualSign = (str: string) => {
  const regex = /=+$/;
  return str.replace(regex, "");
};

export const hashString = async (...args: string[]): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(args.join(""));

  return crypto.subtle.digest("SHA-256", data).then((hash) => {
    const encoded = btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(hash))),
    );
    const sanitizedHash = encoded
      .replace(/\+/g, "")
      .replace(/\//g, "")
      .replace(/=+$/, "");
    return removeLastEqualSign(sanitizedHash);
  });
};

export const createRefNo = async (
  ...args: Array<string | undefined>
): Promise<string> => {
  if (args.every((arg) => arg !== undefined)) {
    return `${await hashString(...(args as string[]))}`;
  } else {
    return `${await hashString(new Date().getTime().toString(36))}`;
  }
};

export const formatMobile = (mobile_number: string) => {
  const regex = /^0|^(63)|\D/g;
  if (mobile_number) {
    const formattedNumber = mobile_number.replace(regex, "");
    return `+63${formattedNumber}`;
  }
  return "";
};

export const opts = (...args: ReactElement[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export const decimal = (
  num: string | number | undefined,
  digits: number,
): string => {
  if (num === undefined) return "0.00";
  const parsedNumber = typeof num === "string" ? parseFloat(num) : num;
  return parsedNumber.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

export const prettyDate = (datestring: string | undefined): string => {
  if (!datestring) return "";
  const date = new Date(datestring);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
};

export const getToday = () => {
  const d = new Date();
  const datestring = d.toLocaleDateString();
  const date = prettyDate(datestring).split("at");
  return date[0];
};

type CopyFnParams = {
  name: string;
  text: string;
  limit?: number;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success

export const copyFn: CopyFn = async ({ name, text, limit }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    onSuccess(
      `${name ? "Copied: " + name : "Copied."}`,
      charlimit(text, limit ?? 35)!,
    );
    return true;
  } catch (error) {
    onError("Copy failed.");
    return false;
  }
};

export const getNextElement = <T>(
  array: T[],
  currentIndex: number,
  setState: Dispatch<SetStateAction<number>>,
) => {
  const nextIndex = (currentIndex + 1) % array.length; // Calculate the next index with wrap-around
  setState(nextIndex);
  return nextIndex;
};

export const toggleState = (
  setState: Dispatch<SetStateAction<boolean>>,
): void => {
  setState((prevState) => !prevState);
};

export const fileType = (file_type: string | undefined): string => {
  if (!file_type) {
    return "";
  }
  const match = file_type.match(/\/(\w+)$/);
  return match?.[1] ?? "";
};

export const fileSize = (bytes: number | undefined): string => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  if (!bytes) {
    return "";
  }

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  const roundedValue = unitIndex > 1 ? bytes.toFixed(2) : Math.round(bytes);

  return `${roundedValue} ${units[unitIndex]}`;
};

export const sharpenKey = (input: string): string => {
  let modifiedString = input
    .replace(/\./g, "")
    .replace(/\/+/g, " ")
    .replace(/ +/g, " ")
    .replace(/ +/g, "_")
    .replace(/'+/g, "")
    .replace(/\?+/g, "")
    .replace(/_{2,}/g, "_")
    .trim()
    .toLowerCase();

  if (modifiedString.endsWith("no")) {
    modifiedString = modifiedString.replace(/no$/, "_no");
  }

  return modifiedString;
};

export const screenKey = (input: string): string => {
  let modifiedString = "";

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const nextChar = input[i + 1];

    if (currentChar === "_" && nextChar === "_") {
      continue;
    } else if (currentChar === " ") {
      if (i === 0 || i === input.length - 1 || nextChar === " ") {
        continue;
      } else {
        modifiedString += "_";
      }
    } else {
      modifiedString += currentChar;
    }
  }

  return modifiedString.trim();
};

export const filterList = <T>(
  array: T[],
  predicate: (el: T) => boolean,
): T[] => {
  return array?.filter(predicate);
};

export type KVFields = {
  key: string;
  value: string | number;
};

export const extractKV = (array: OCR_DE_FieldSchema) => {
  return array?.map(({ key, value }) => ({
    key: screenKey(sharpenKey(key)),
    value: value.toUpperCase(),
  }));
};

export const filterFields = (
  array: OCR_DE_FieldSchema,
  ...args: string[]
): KVFields[] => {
  const excludedKeys = new Set(
    args
      .concat(
        "state_name",
        "state_code",
        "country_code",
        "country_name",
        "_no",
        "o",
        "telephone_no",
      )
      .map((item) => item),
  );
  const kv = extractKV(array);
  const filteredList = filterList(kv, (item) => !excludedKeys.has(item.key));
  return filteredList;
};

export const getVehicleDefaults = (array: OCR_DE_FieldSchema) => {
  const filteredArray: KVFields[] = filterFields(array);
  const convertedObj = filteredArray.reduce((obj, { key, value }) => {
    return { ...obj, [key]: value };
  }, {});
  return convertedObj;
};

// export const filterAutoValues = (values: VehicleSchema) => {
//   const exclude = new Set(["NO", "O", "TELEPHONE NO"]);

//   const filteredValues = {
//     ...Object.fromEntries(
//       Object.entries(values).filter((key) => !exclude.has(key[0])),
//     ),
//   };

//   return filteredValues;
// };

export const withSpaces = (input: string): string => {
  return input.replace(/_/g, " ");
};

const adj: string[] = [
  "Magnetic",
  "Spinning",
  "Perturbed",
  "Excited",
  "Coherent",
  "Super",
  "Observant",
  "Wavelike",
  "Dual",
  "Tunneling",
  "Computing",
  "Collective",
  "Orbital",
  "Proto",
  "Meta",
  "Fast",
  "Sonic",
  "Blazing",
  "The Great",
];

const moons: string[] = [
  "Moon",
  "Phobos",
  "Deimos",
  "Io",
  "Europa",
  "Ganymede",
  "Callisto",
  "Mimas",
  "Enceladus",
  "Tethys",
  "Dione",
  "Rhea",
  "Titan",
  "Hyperion",
  "Iapetus",
  "Miranda",
  "Ariel",
  "Umbriel",
  "Titania",
  "Oberon",
  "Triton",
  "Nereid",
  "Charon",
  "Styx",
  "Nix",
  "Kerberos",
  "Hydra",
  "Messier",
  "Eradani",
  "Attractor",
  "Hyperspace",
];

export const nameGenerator = (): string => {
  const radj = Math.floor(Math.random() * adj.length);
  const noun = Math.floor(Math.random() * moons.length);

  return `${adj[radj]} ${moons[noun]}`;
};

export const getMonthAndYear = (
  timeInMs: number,
): { month: string; year: number } => {
  const date = new Date(timeInMs);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return { month, year };
};

export const errHandler =
  (setLoading: Dispatch<SetStateAction<boolean>>, ...args: string[]) =>
  (e: Error) => {
    setLoading(false);
    onError(args[0] ?? "Error", e.name);
    if (args[1] && args[1].toLowerCase() === "log") {
      console.log(args[0] ?? "Error", e.name, args[2] ?? "");
    }
  };

export const sanitizeText = (value: string) => {
  const spaces = value.replaceAll(" ", "_");
  const commas: string = spaces.replaceAll(",", "");
  return commas;
};

type DisplaynameParams = {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
};
export const formDisplayname = (params: DisplaynameParams) => {
  const { firstName, middleName, lastName } = params;
  if (!middleName) {
    return `${firstName} ${lastName}`;
  }
  return `${firstName} ${middleName} ${lastName}`;
};

export const getInitials = (name: string | undefined) => {
  if (!name) return;

  const words = name.split(" ");

  if (words.length === 1) {
    return name.slice(0, 2);
  }

  if (words.length === 2) {
    return words[0]!.charAt(0) + words[1]!.charAt(0);
  }

  if (words.length >= 3) {
    return words[0]!.charAt(0) + words[words.length - 1]!.charAt(0);
  }
};

export const basedOnTime = (): string => {
  const date = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: timezone }),
  );

  const hours = localDate.getHours();

  if (hours < 12) {
    return "Good day,";
  }

  if (hours >= 12 && hours < 17) {
    return "Good afternoon,";
  }

  if (hours >= 17 && hours < 20) {
    return "Good evening,";
  }

  return "Good evening,";
};

function counter() {
  let count = 0;

  return function incrementCounter() {
    return +(count += 0.01).toFixed(2);
  };
}

export const onCount = counter();

export const charlimit = (
  text: string | undefined,
  chars?: number,
): string | undefined => {
  if (!text) return;
  return text.substring(0, chars ?? 12);
};
