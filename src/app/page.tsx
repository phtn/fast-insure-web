import { cookies } from "next/headers";
import { MobileApp } from "./(components)/mobile_app";
import { Splash } from "./(components)/splash";
import { CTPL } from "./(components)/ctpl";
import { Hero } from "./(components)/hero";
import { Highlight } from "./(components)/highlight";
import { Affiliate } from "./(components)/affiliate";

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
  console.log(cookieData ? typeof cookieData : null);

  return (
    <main>
      <Splash />
      <Hero />
      <Highlight />
      <CTPL />
      <Affiliate />
      <MobileApp />
    </main>
  );
}
