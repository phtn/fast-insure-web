import type { OCR_DE_FieldSchema } from "@/server/resource/ocr";
import type { Dispatch, ReactElement, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess, onWarn } from "./toast";

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
    return `FIN-${stringBetweenDashes}`;
  } else {
    return `FIN-${uid.substring(0, 13)}`;
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

export const transformDate = (dateString: string): string => {
  const date = new Date(dateString);
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

type CopyFnParams = {
  name: string;
  text: string;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success

export const copyFn: CopyFn = async ({ name, text }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    onSuccess(`${name ? "Copied: " + name : "Copied."}`, limitText(text));
    return true;
  } catch (error) {
    onError("Copy failed.");
    return false;
  }
};

export const limitText = (text: string | undefined, chars?: number) => {
  if (!text) {
    return "";
  }
  if (chars) {
    return text.substring(0, chars);
  }
  return text.substring(0, 25) + `...`;
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

export const fileType = (
  file_type: string | undefined,
): string | null | undefined => {
  if (!file_type) {
    return null;
  }
  const match = file_type.match(/\/(\w+)$/);
  return match ? match[1] : null;
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
    key: key.toUpperCase().trim(),
    value,
  }));
};

export const filterFields = (
  array: OCR_DE_FieldSchema,
  ...args: string[]
): KVFields[] => {
  const excludedKeys = new Set(
    args
      .concat(
        "state name",
        "state code",
        "country code",
        "country name",
        "no",
        "o",
        "telephone no",
      )
      .map((item) => item.toUpperCase()),
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
