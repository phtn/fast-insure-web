type PayData = {
  id: number;
  name: string;
  img_url: string;
  style: string;
};
export const payMethods: PayData[] = [
  {
    id: 0,
    name: "icash",
    img_url: "bg-[url('/svg/icash.png')]",
    style: " border-yellow-300 bg-yellow-50/50 hover:border-yellow-500",
  },
  {
    id: 1,
    name: "gcash",
    img_url: "bg-[url('/svg/gcash.svg')]",
    style: " border-blue-100 bg-blue-50 hover:border-prime",
  },
  {
    id: 2,
    name: "maya",
    img_url: "bg-[url('/svg/maya.svg')]",
    style: " border-emerald-100 bg-[#74EEA5] hover:border-slate-500",
  },
  {
    id: 3,
    name: "shopee",
    img_url: "bg-[url('/svg/gcash.svg')]",
    style: " border-rose-100 bg-rose-50 hover:border-rose-500",
  },
  {
    id: 4,
    name: "grabpay",
    img_url: "bg-[url('/svg/grabpay.svg')]",
    style: " border-teal-100 bg-teal-50 hover:border-teal-500",
  },
];
