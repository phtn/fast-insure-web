import { MobileApp } from "./mobile_app";
import { Splash } from "./splash";
import { CTPL } from "./_ctpl";
import { Hero } from "./hero";
import { Highlight } from "./highlight";
import { Affiliate } from "./affiliate";

export default async function Home() {
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

