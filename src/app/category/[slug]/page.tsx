
import { notFound } from "next/navigation";
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

  // Fetch all available categories
  const categoriesResponse = await fetch(`${API_BASE}/categories`, {
    cache: "no-store",
  });

  if (!categoriesResponse.ok) {
    throw new Error("Failed to load categories");
  }

  const categories: Category[] = await categoriesResponse.json();

  // Check whether the category exists
  const category = categories.find(
    (item) => item.slug === slug
  );

  // Invalid category -> Next.js 404 page
  if (!category) {
    notFound();
  }

  // Fetch products for the valid category
  const productsResponse = await fetch(
    `${API_BASE}/products?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!productsResponse.ok) {
    throw new Error("Failed to load category products");
  }

  const products: Product[] = await productsResponse.json();

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Category Heading */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl">
            <span className="text-3xl">{category.icon}</span>

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
