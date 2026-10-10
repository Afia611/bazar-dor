
import Link from "next/link";
import CategoryProducts from "@/components/category/CategoryProducts";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const API_BASE = "https://api.abcz.workers.dev/api/bazardor";

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  // Fetch category details and products
  const [categoriesResponse, productsResponse] = await Promise.all([
    fetch(`${API_BASE}/categories`, {
      cache: "no-store",
    }),
    fetch(
      `${API_BASE}/products?category=${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    ),
  ]);

  if (!categoriesResponse.ok || !productsResponse.ok) {
    throw new Error("Failed to load category data");
  }

  const categories: Category[] = await categoriesResponse.json();

  const category = categories.find(
    (item) => item.slug === slug
  );

  const products: Product[] = await productsResponse.json();

  // Invalid category or category without products
 if (!category || products.length === 0) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-7xl font-bold text-green-700 md:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          ক্যাটাগরি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি
          খুঁজে পাওয়া যায়নি।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
} 
  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 md:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Category Heading */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl">
            <span className="text-3xl">
              {category.icon}
            </span>

            <span>{category.nameBn}</span>
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            এই ক্যাটাগরির পণ্যের আজকের বাজারদর দেখুন।
          </p>
        </div>

        {/* Sorting + Product Grid */}
        <CategoryProducts products={products} />
      </div>
    </main>
  );
}
