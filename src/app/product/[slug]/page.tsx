
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetails = {
  id: number | string;
  nameBn: string;
  categoryIcon: string;
  categoryNameBn?: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
};

const toBangla = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  // Step 1: Check login
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  // Step 2: Fetch selected product
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load product details");
  }

  const product: ProductDetails = await response.json();
  const markets = product.markets ?? [];

  // Step 3: Calculate market price summary
  const minimumPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (sum, market) => sum + (market.min + market.max) / 2,
        0
      ) / markets.length
    : product.today;

  const unit = unitBn[product.unit] ?? product.unit;

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Product summary */}
        <section className="rounded-2xl border border-[#E2E9E2] bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-4xl">
              {product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#25342A]">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                আজকের বাজারে {product.nameBn}-এর দাম ও
                বাজারভিত্তিক মূল্যতথ্য দেখুন।
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.categoryNameBn && (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {product.categoryNameBn}
                  </span>
                )}

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  প্রতি {unit}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E2E9E2] bg-white p-5">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>
            <p className="mt-3 text-2xl font-bold text-green-700">
              {toBangla(minimumPrice)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              প্রতি {unit}
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E9E2] bg-white p-5">
            <p className="text-sm text-gray-500">
              সর্বোচ্চ দাম
            </p>
            <p className="mt-3 text-2xl font-bold text-red-600">
              {toBangla(maximumPrice)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              প্রতি {unit}
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E9E2] bg-white p-5">
            <p className="text-sm text-gray-500">
              গড় দাম
            </p>
            <p className="mt-3 text-2xl font-bold text-[#25342A]">
              {toBangla(averagePrice)} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-400">
              প্রতি {unit}
            </p>
          </div>
        </section>

        {/* Market-wise prices */}
        <section className="rounded-2xl border border-[#E2E9E2] bg-white p-5 md:p-6">
          <h2 className="text-xl font-bold text-[#25342A]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 mb-6 text-sm text-gray-500">
            মোট {toBangla(markets.length)}টি বাজারের মূল্যতথ্য
          </p>

          {markets.length === 0 ? (
            <p className="text-sm text-gray-500">
              বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {markets.map((market, index) => (
                <div
                  key={`${market.market}-${index}`}
                  className="rounded-xl border border-[#E2E9E2] bg-[#FAFCFA] p-4"
                >
                  <h3 className="font-bold text-[#25342A]">
                    {market.market}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {market.division}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-xs text-gray-500">
                        সর্বনিম্ন
                      </p>
                      <p className="mt-1 font-bold text-green-700">
                        {toBangla(market.min)} টাকা
                      </p>
                    </div>

                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="text-xs text-gray-500">
                        সর্বোচ্চ
                      </p>
                      <p className="mt-1 font-bold text-red-600">
                        {toBangla(market.max)} টাকা
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
