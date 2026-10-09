
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  nameBn: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

const PRODUCTS_API =
  "https://api.abcz.workers.dev/api/bazardor/products";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

const toBangla = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

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
        console.error("Price ticker error:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-y border-green-100 bg-green-50 py-3">
      <div className="ticker-track flex w-max items-center">

        {/* Duplicate items for seamless infinite scrolling */}
        {[...products, ...products].map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              aria-hidden={index >= products.length}
              className="flex shrink-0 items-center gap-2 px-5 text-sm whitespace-nowrap"
            >
              <span>{product.categoryIcon}</span>

              <span className="font-semibold text-gray-800">
                {product.nameBn}
              </span>

              <span className="text-gray-700">
                {toBangla(product.today)} টাকা/
                {unitBn[product.unit] ?? product.unit}
              </span>

              <span
                className={`font-semibold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBangla(product.change.pct)}%
              </span>

              <span className="ml-3 text-gray-300">|</span>
            </div>
          );
        })}

      </div>
    </div>
  );
}
