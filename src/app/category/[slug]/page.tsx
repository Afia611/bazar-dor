
import ProductCard from "@/components/homepage/ProductCard";
import type { Product } from "@/types/product";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    notFound();
  }

  const products: Product[] = await response.json();

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-2xl font-bold">
          ক্যাটাগরির পণ্য
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
