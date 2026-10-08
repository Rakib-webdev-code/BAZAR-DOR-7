export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-green-100 p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-14 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}