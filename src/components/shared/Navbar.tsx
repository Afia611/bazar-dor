
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import logo from "@/assets/logo-icon.png";
import type { Category } from "@/types/category";
import PriceTicker from "@/components/shared/PriceTicker";
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get logged-in user
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Fetch categories
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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Logout with Toastify
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগ আউট করা যায়নি।");
        return;
      }

      setIsDropdownOpen(false);
      toast.success("সফলভাবে লগ আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("লগ আউট করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* First Row: Logo, Date, Authentication */}
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

          {/* Authentication Area */}
          <div className="flex shrink-0 items-center gap-2">
            {isPending ? (
              // Session loading skeleton
              <div className="flex animate-pulse items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gray-200" />
                <div className="hidden h-4 w-20 rounded bg-gray-200 sm:block" />
              </div>
            ) : user ? (
              // Logged-in Profile Dropdown
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                  onClick={() =>
                    setIsDropdownOpen((previous) => !previous)
                  }
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-bold text-green-800">
                    {user.image ? (
                      // Use img for provider-hosted profile URLs
                      // that may not be in next.config.ts
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name || "প্রোফাইল"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>

                  {/* User Name */}
                  <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-800 sm:block">
                    {user.name}
                  </span>

                  {/* Dropdown Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 text-gray-900 shadow-lg"
                  >
                    {/* User Info */}
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    {/* Profile Link */}
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                      className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      আমার প্রোফাইল
                    </Link>

                    {/* Logout Button */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {loggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Logged-out Buttons
              <>
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
              </>
            )}
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
