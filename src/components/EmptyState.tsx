import Link from "next/link";

export default function EmptyState({
  title = "কিছু পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <p className="text-6xl font-bold text-green-700">৪০৪</p>
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600 text-sm">{message}</p>
      <Link href="/" className="btn bg-green-700 hover:bg-green-800 text-white mt-6 btn-sm sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}