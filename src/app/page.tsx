import { cookies } from "next/headers"
import { MobileApp } from "./mobile_app";
import { Splash } from "./splash";
import { CTPL } from "./_ctpl";
import { Hero } from "./hero";
import { Highlight } from "./highlight";
import { Affiliate } from "./affiliate";

async function getCookieData() {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000),
  );
}


export default async function Home() {
  const cookieData = await getCookieData();
  console.log(cookieData ? typeof cookieData : null)

  return (
    <>
      <Splash />
      <Hero />
      <Highlight />
      <CTPL />
      <Affiliate />
      <MobileApp />
    </>
  );
}

