import Hero from "./hero";
import { Splash } from "./splash";
import { Dough } from "./dough";
import { Jumbotron } from "./_components/jumbotron";
import { CTPL } from "./_ctpl";

export default async function Home() {
  return (
    <main>
      <Splash />
      <CTPL />
      <Hero />
    </main>
  );
}
