import { TabsList, TabsTrigger } from "../_components/tabs";
import Link from "next/link";

export const Triggers = () => (
  <div className="space-between flex items-center">
    <TabsList>

      <Link href={`/account`}>
        <TabsTrigger value="autos" className="relative">Autos</TabsTrigger>
      </Link>

      <Link href={`/account/travel`}>
        <TabsTrigger value="travel">Travel</TabsTrigger>
      </Link>

      <Link href={`/account/life`}>
        <TabsTrigger value="life">Life</TabsTrigger>
      </Link>

      <Link href={`/account/profile`}>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </Link>

    </TabsList>
  </div>
)
