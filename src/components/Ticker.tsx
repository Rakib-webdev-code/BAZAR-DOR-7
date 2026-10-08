import { getProducts } from "@/lib/api";
import { bnNum, toBn, unitShort } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default async function Ticker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="marquee overflow-hidden bg-green-50 border-b border-green-100 py-2 text-sm">
      <div className="marquee-track">
        {items.map((p, i) => {
          const color =
            p.change.dir === "up" ? "text-green-700" : p.change.dir === "down" ? "text-red-600" : "text-gray-500";
          const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
          return (
            <span key={i} className="px-4 whitespace-nowrap">
              {p.image} {p.nameBn}{" "}
              <b>{bnNum(p.today)} টাকা/{unitShort(p.unit)}</b>{" "}
              <span className={color}>
                {arrow} {toBn(Math.abs(p.change.pct).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}