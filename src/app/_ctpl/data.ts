import { BikeIcon, CarIcon, TruckIcon, type LucideIcon } from "lucide-react";

export interface Packages {
  id: number;
  title: string;
  description: string;
  price: number;
  icon: LucideIcon;
}

export const brandnew: Packages[] = [
  {
    id: 0,
    title: "Private Cars",
    description: "Including AUVs & Vans",
    price: 1660,
    icon: CarIcon,
  },
  {
    id: 1,
    title: "Motorcycles",
    description: "Tricycles & Trailers",
    price: 770,
    icon: BikeIcon,
  },
  {
    id: 2,
    title: "Light-Medium Trucks",
    description: "Not over 3,930 Kgs",
    price: 1800,
    icon: TruckIcon,
  },
  {
    id: 3,
    title: "Heavy Trucks",
    description: "Not over 3,930 Kgs",
    price: 3490,
    icon: TruckIcon,
  },
];

export const renewal: Packages[] = [
  {
    id: 0,
    title: "Private Cars",
    description: "Including AUVs & Vans",
    price: 610,
    icon: CarIcon,
  },
  {
    id: 1,
    title: "Motorcycles",
    description: "Tricycles & Trailers",
    price: 300,
    icon: BikeIcon,
  },
  {
    id: 2,
    title: "Light-Medium Trucks",
    description: "Not over 3,930 Kgs",
    price: 660,
    icon: TruckIcon,
  },
  {
    id: 3,
    title: "Heavy Trucks",
    description: "Not over 3,930 Kgs",
    price: 1250,
    icon: TruckIcon,
  },
];
