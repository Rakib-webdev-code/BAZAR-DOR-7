"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

type Sort = "default" | "asc" | "desc";

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // দাম number হিসেবে সংরক্ষিত (p.today), তাই sort হয় সংখ্যার মান ধরে।
  // বাংলা সংখ্যা শুধু দেখানোর সময় (toBn) বানানো হয়, string compare হয় না।
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) =>
      sort === "asc" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-4">
        <label htmlFor="sort" className="text-sm text-gray-600">সাজান:</label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="appearance-none bg-white border border-green-200 rounded-md pl-3 pr-9 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <ProductGrid products={sorted} />
    </>
  );
}