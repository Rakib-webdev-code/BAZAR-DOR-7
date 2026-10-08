import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import ProtectedGuard from "@/components/ProtectedGuard";
import { getProducts } from "@/lib/api";
import { bnNum, unitLabel } from "@/lib/bn";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const minPrice = Math.min(...p.markets.map((m) => m.min));
  const maxPrice = Math.max(...p.markets.map((m) => m.max));
  const avgPrice = Math.round(
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / p.markets.length
  );

  const summary = [
    { label: "সর্বনিম্ন দাম", value: minPrice },
    { label: "সর্বোচ্চ দাম", value: maxPrice },
    { label: "গড় দাম", value: avgPrice },
  ];

  const history = [
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];

  return (
    <ProtectedGuard>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Link href={`/category/${p.category}`} className="text-sm text-green-700">
          ← {p.categoryNameBn} ক্যাটাগরিতে ফিরুন
        </Link>

        {/* Summary */}
        <section className="bg-white border border-green-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-4xl">
              {p.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{p.nameBn}</h1>
              <p className="text-sm text-gray-600 mt-1">
                আজ সারা দেশের গড় দাম {bnNum(avgPrice)} টাকা, {unitLabel(p.unit)}।
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="badge badge-outline border-green-300 text-green-700">
                  {p.categoryIcon} {p.categoryNameBn}
                </span>
                <span className="badge badge-ghost">{unitLabel(p.unit)}</span>
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold">{bnNum(p.today)} টাকা</p>
            <div className="mt-1">
              <ChangeBadge change={p.change} />
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section>
          <h2 className="text-lg font-bold mb-3">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {summary.map((x) => (
              <div key={x.label} className="bg-white border border-green-100 rounded-xl p-4">
                <p className="text-xs text-gray-500">{x.label}</p>
                <p className="font-bold text-lg">{bnNum(x.value)} টাকা</p>
              </div>
            ))}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <p className="font-bold text-lg text-green-700">{bnNum(p.today)} টাকা</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {history.map((h) => (
              <div key={h.label} className="bg-white border border-green-100 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">{h.label}</p>
                <p className="font-semibold">{bnNum(h.value)} টাকা</p>
              </div>
            ))}
          </div>
        </section>

        {/* Market wise */}
        <section>
          <h2 className="text-lg font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
          <div className="bg-white border border-green-100 rounded-xl overflow-x-auto">
            <table className="table table-sm sm:table-md">
              <thead>
                <tr className="text-gray-600">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m) => (
                  <tr key={m.market} className="hover:bg-green-50">
                    <td className="font-medium whitespace-nowrap">{m.market}</td>
                    <td className="whitespace-nowrap">{m.division}</td>
                    <td className="text-right">{bnNum(m.min)} টাকা</td>
                    <td className="text-right">{bnNum(m.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {bnNum(Math.round((m.min + m.max) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ProtectedGuard>
  );
}