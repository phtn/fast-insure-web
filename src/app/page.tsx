import Hero from "./hero";
import { Splash } from "./splash";
import { Dough } from "./dough";

export default async function Home() {
  return (
    <main>
      <Splash />
      <Hero />
      <Dough />
    </main>
  );
}
