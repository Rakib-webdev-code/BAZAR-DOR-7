"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-xl font-bold">কিছু একটা ভুল হয়েছে</h1>
      <p className="text-sm text-gray-600 mt-2">ডেটা লোড করা যায়নি। আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn bg-green-700 hover:bg-green-800 text-white mt-5">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}