import { Suspense } from "react";
import EmptyState from "@/components/EmptyState";
import ProductSkeleton from "@/components/ProductSkeleton";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProducts } from "@/lib/api";

async function CategoryProducts({ slug }: { slug: string }) {
  const products = await getProducts(slug);
  if (products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
      />
    );
  }
  return <SortableProducts products={products} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <EmptyState
        title="ক্যাটাগরি পাওয়া যায়নি"
        message="আপনি যে ক্যাটাগরিটি খুঁজছেন তা নেই।"
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{category.icon}</span>
        <h1 className="text-2xl font-bold">{category.nameBn}</h1>
      </div>
      <Suspense fallback={<ProductSkeleton count={6} />}>
        <CategoryProducts slug={slug} />
      </Suspense>
    </div>
  );
}