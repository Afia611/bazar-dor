
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-icon.png";
import type { Category } from "@/types/category";
import PriceTicker from "@/components/shared/PriceTicker";

const CATEGORY_API =
  "https://api.abcz.workers.dev/api/bazardor/categories";

// Bengali date
const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date());

const Navbar = () => {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORY_API);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <header className="w-full bg-white">

      {/* Top Row: Logo, Date, Authentication */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">

          {/* Logo and Date */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-700">
              <Image
                src={logo}
                alt="বাজার দর লোগো"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                বাজার দর
              </h1>

              <p className="text-[10px] text-gray-500 md:text-xs">
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/sign-in"
              className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-50 sm:px-4 sm:text-sm"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-800 sm:px-4 sm:text-sm"
            >
              সাইন আপ
            </Link>
          </div>

        </div>
      </div>

      {/* Second Row: Category Navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-b border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-5 overflow-x-auto py-3 whitespace-nowrap sm:gap-7">

            {categories.map((category) => {
              const href = `/category/${category.slug}`;

              const isActive =
                pathname === href ||
                pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={category.id}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-1.5 border-b-2 pb-1 text-xs font-medium transition-colors md:text-sm ${
                    isActive
                      ? "border-green-700 text-green-700"
                      : "border-transparent text-gray-600 hover:text-green-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })}

          </div>
        </div>
      </nav>
    {/* Third Row: Scrolling Price Ticker */}
      <PriceTicker />
    </header>
  );
};

export default Navbar;
