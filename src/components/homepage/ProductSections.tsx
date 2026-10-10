
"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

const PRODUCTS_API =
  "https://api.abcz.workers.dev/api/bazardor/products";

// Skeleton for one product card
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      <div className="mb-5 h-12 w-12 rounded-xl bg-gray-200" />

      <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />

      <div className="mb-6 h-4 w-1/2 rounded bg-gray-200" />

      <div className="mb-3 h-8 w-28 rounded bg-gray-200" />

      <div className="h-4 w-20 rounded bg-gray-200" />
    </div>
  );
}

// Loading skeleton for the Home Page product sections
function ProductSectionsSkeleton() {
  return (
    <div className="bg-[#F3F7F2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Price Risers Skeleton */}
        <section>
          <div className="mb-5 h-7 w-44 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>

        {/* Price Fallers Skeleton */}
        <section>
          <div className="mb-5 h-7 w-44 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>

        {/* All Products Skeleton */}
        <section id="সব-পণ্য" className="scroll-mt-8">
          <div className="mb-5 space-y-3">
            <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

const ProductSections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products from the API
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        if (!controller.signal.aborted) {
          setProducts(data);
          setError("");
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Product fetch error:", error);
        setError("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  // Section A: Top 6 price increases
  const priceRisers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: Top 6 price decreases
  const priceFallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Show skeleton while loading
  if (loading) {
    return <ProductSectionsSkeleton />;
  }

  // Show error if API fails
  if (error) {
    return (
      <div className="bg-[#F0F5F0] px-4 py-16 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#F3F7F2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Section A: Price Risers */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#25342A]">
            <span className="text-[#DC2626]">▲</span>
            <span>আজ দাম বেড়েছে</span>
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceRisers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* Section B: Price Fallers */}
        <section>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#25342A]">
            <span className="text-[#16A34A]">▼</span>
            <span>আজ দাম কমেছে</span>
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceFallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* Section C: All Products */}
        <section id="সব-পণ্য" className="scroll-mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#25342A]">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-[#8A958C]">
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductSections;
