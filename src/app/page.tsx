import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getProducts } from "@/lib/api";

async function HomeSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-green-700">আজ দাম বেড়েছে ▲</h2>
        <ProductGrid products={risers} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-red-600">আজ দাম কমেছে ▼</h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="mt-10 scroll-mt-28">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          সব পণ্যের আজকের দাম ও গতকালের তুলনায় পরিবর্তন
        </p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <Suspense
          fallback={
            <div className="mt-10">
              <ProductSkeleton count={8} />
            </div>
          }
        >
          <HomeSections />
        </Suspense>
      </div>
    </>
  );
}