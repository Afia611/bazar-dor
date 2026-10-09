
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
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

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const badgeColor = isUp
    ? "bg-[#FFF0F0] text-[#DC2626]"
    : isDown
      ? "bg-[#E9F8EF] text-[#15803D]"
      : "bg-gray-100 text-gray-500";

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex min-h-[154px] flex-col justify-between rounded-xl border border-[#E6EBE6] bg-white p-4 transition-all duration-200 hover:border-green-300 hover:shadow-md"
    >
      {/* Product name */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
          {product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#25342A]">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-[#8A958C]">
            প্রতি {unitBn[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#8A958C]">
            আজকের দাম
          </p>

          <p className="mt-1 text-lg font-bold text-[#25342A]">
            {toBangla(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {toBangla(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}
