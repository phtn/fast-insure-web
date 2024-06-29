import { MobileApp } from "./(components)/mobile_app";
import { Splash } from "./(components)/splash";
import { Hero } from "./(components)/hero";
import { Highlight } from "./(components)/highlight";
import { Affiliate } from "./(components)/affiliate";

export default async function Home() {
  return (
    <main>
      <Splash />
      <Hero />
      <Highlight />
      {/* <CTPL /> */}
      <Affiliate />
      <MobileApp />
    </main>
  );
}
