
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-green-700 md:text-8xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি
          পাওয়া যায়নি অথবা সরিয়ে ফেলা হয়েছে।
        </p>

        {/* Back Home */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
