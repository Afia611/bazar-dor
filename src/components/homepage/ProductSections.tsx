
"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

const PRODUCTS_API =
  "https://api.abcz.workers.dev/api/bazardor/products";

const ProductSections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
        setError("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  if (loading) {
    return (
      <div className="bg-[#F0F5F0] py-16 text-center text-gray-500">
        পণ্যের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F0F5F0] py-16 text-center text-red-600">
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
            <ProductCard key={product.id} product={product} />
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
            <ProductCard key={product.id} product={product} />
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  </div>
);
};

export default ProductSections;
