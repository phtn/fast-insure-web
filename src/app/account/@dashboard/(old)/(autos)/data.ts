import { type CheckoutSchema } from "@/server/resource/icash";
import { type OCR_DE_BASE64_Schema } from "@/server/resource/ocr";
import { type VehicleSchema } from "./active-form";

export type PrimaryAutoInfo = {
  auto_name: string;
  make: string;
  photoURL: string;
  isActive: boolean;
} & VehicleSchema;

export const accountItems: Record<string, string>[] = [
  {
    title: "Black Widow",
    description: "Audi R8",
    cover: "/images/spyder.webp",
  },
];

export const plugins: Record<string, string>[] = [
  {
    title: "Road-side Assist",
    description: "Get road-side assistance anywhere.",
    cover: "/peaks/peaks_v1.svg",
  },
  {
    title: "Towing Service",
    description: "Towing Service (NCR)",
    cover: "/peaks/peaks_v4.svg",
  },
];

// iCASH checkout phone: 227 227 227
export const payload: CheckoutSchema = {
  merchantUsername: "fastinsure",
  merchantPassword: "XodZy9D5KTcYsQL@$aRInahMd$ufR39DsY",
  merchantCode: "FASTINSURE",
  merchantRefNo: "FxIy",
  merchantProductDescription: "CTPL XL",
  currencyCode: "PHP",
  amount: "1600.00",
  successUrl: "https://re-up.ph",
  errorUrl: "https://re-up.ph",
};

export const staticScanBase64: OCR_DE_BASE64_Schema = {
  base64: {
    status: "success",
    fields: [
      {
        key: "CR",
        value: "39255231-1",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "DATE",
        value: "05/20/2021",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "No",
        value: "1400",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.95,
      },
      {
        key: "ENGINENO",
        value: "M6JBCY39718*",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "CHASSIS NO",
        value: "MNBJXXARJJCY39718",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "MV FILE NO",
        value: "1364-00000126768",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "PLATE NO",
        value: "WXO117",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "vin",
        value: "MNBJXXARJJCY39718",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.99,
      },
      {
        key: "FUEL",
        value: "GAS",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "DENOMINATION",
        value: "CAR LIGHT",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "PISTON DISPLACEMENT",
        value: "RTA",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.97,
      },
      {
        key: "NO. OF CYLINDERS",
        value: "4",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.97,
      },
      {
        key: "YEAR M",
        value: "2895",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "MAKE",
        value: "Ford",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "BODY TYPE",
        value: "HATCHBACK",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "GROSS WT",
        value: "1495",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "NET WT",
        value: "1050",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "SHIPPING WT",
        value: "1050",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "NET CAPACITY",
        value: "445",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "COMPLETE OWNERS NAME",
        value: "MARLON JOAKIM R TABLIZO",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "TELEPHONE NO./CONTACT DETAILS",
        value:
          "67L9 SUNFLOWER ST CAPITOL PRK HMSĄ KALOOKAN CITY NCR THIRD DISTRICT NATIONAL CAPITAL",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Owner",
        value: "Marlon Joakim R Tablizo",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.98,
      },
      {
        key: "REGION ENCUMBERED TO",
        value: "000-000-000-000",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "O.R. DATE",
        value: "08/08/2013",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "O.R. No",
        value: "000201344548086",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "AMT",
        value: "5,897.18",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "REGISTRANT'S SIGNATURE",
        value: "JOSEPH PAUL C. PĘTILLA",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "BY",
        value: "CHIEF OF OFFICE",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 0.95,
      },
      {
        key: "Signature/Date",
        value: "0520",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Country code",
        value: "USA",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Country name",
        value: "United States of America",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Document type",
        value: "Vehicle registration",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Expiration date",
        value: "not provided in the document",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "Is salvage?",
        value: "No",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "State code",
        value: "MT",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
      {
        key: "State name",
        value: "Montana",
        bounding_box: [{ left: 0, top: 0, width: 0, height: 0 }],
        confidence_score: 1,
      },
    ],

    cost: 0.25,
  },
};
