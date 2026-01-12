export function SkeletonGrid() {
  return (
    <div className="flex justify-center gap-4 flex-wrap p-4 flex-1 overflow-auto">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white p-4 w-54">
          {/* Image placeholder */}
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
            <div className="h-full w-full bg-gray-200" />
          </div>

          {/* Text placeholders */}
          <div className="mt-4 space-y-3">
            <div className="h-16 w-4/4 rounded bg-gray-200" />
            <div className="h-6 w-1/4 rounded bg-gray-200 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
