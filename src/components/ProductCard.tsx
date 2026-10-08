import Link from "next/link";
import { bnNum, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block bg-white rounded-xl border border-green-100 p-4 hover:shadow-md hover:border-green-300 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-2xl">
          {p.image}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{p.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-bold text-lg">{bnNum(p.today)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}