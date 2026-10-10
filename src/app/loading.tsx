
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Hero skeleton */}
        <div className="mb-12 grid gap-6 rounded-2xl bg-white p-6 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center gap-5">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="h-10 w-full max-w-md rounded bg-gray-200" />
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-full max-w-lg rounded bg-gray-200" />
            <div className="h-11 w-40 rounded-lg bg-gray-200" />
          </div>

          <div className="h-56 rounded-xl bg-gray-200 md:h-80" />
        </div>

        {/* Product section skeleton */}
        <div className="mb-6 h-8 w-56 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="mb-5 h-12 w-12 rounded-xl bg-gray-200" />
              <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
              <div className="mb-6 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mb-3 h-8 w-28 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
