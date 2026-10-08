import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const pct = toBn(Math.abs(change.pct).toFixed(1));
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold";

  if (change.dir === "up")
    return <span className={`${base} bg-green-100 text-green-700`}>▲ {pct}%</span>;
  if (change.dir === "down")
    return <span className={`${base} bg-red-100 text-red-600`}>▼ {pct}%</span>;
  return <span className={`${base} bg-gray-100 text-gray-500`}>— {pct}%</span>;
}