
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 md:py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        {/* Heading skeleton */}
        <div className="mb-8">
          <div className="h-9 w-52 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-200" />
        </div>

        {/* Sorting skeleton */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-10 w-48 rounded-lg bg-gray-200" />
        </div>

        {/* Product card skeletons */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-5"
            >
              <div className="mb-5 h-16 w-16 rounded-xl bg-gray-200" />
              <div className="mb-3 h-5 w-32 rounded bg-gray-200" />
              <div className="mb-5 h-4 w-24 rounded bg-gray-200" />

              <div className="flex items-center justify-between">
                <div className="h-7 w-24 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded-full bg-gray-200" />
              </div>

              <div className="mt-5 h-10 w-full rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
