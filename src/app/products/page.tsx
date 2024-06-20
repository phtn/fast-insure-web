import { products } from "./data";
import { ProductItems } from "./items";

export default function Products() {
  return (
    <section className="py-18 w-full bg-gradient-to-b from-slate-950 from-10% to-blue-800 lg:py-24 xl:py-32">
      <div className="flex items-center px-4 md:px-10">
        <div className="grid w-full items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <Header />
            <ProductItems data={products} />
          </div>
        </div>
      </div>
    </section>
  );
}

const Header = () => (
  <div className="mb-4 flex w-full flex-col items-start justify-start space-y-2 md:px-10">
    <h1 className="bg-gradient-to-r from-orange-100 to-sky-200 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-3xl xl:text-4xl/none">
      All Products.
    </h1>
    <p className="mx-auto w-full text-left text-zinc-300">
      You can protect your family and your future, one policy at a time.
    </p>
  </div>
);
