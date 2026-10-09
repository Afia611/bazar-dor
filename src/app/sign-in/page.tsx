
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      const callbackURL =
        searchParams.get("callbackURL") || "/";

      // Only allow internal redirect paths
      const destination =
        callbackURL.startsWith("/") &&
        !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      router.push(destination);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "সাইন ইন করতে সমস্যা হয়েছে।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-14">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#25342A]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E9E2] bg-white p-6">
          <form
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                required
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-3 outline-none focus:border-green-600"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#008B46] py-3 font-semibold text-white shadow-sm hover:bg-[#00783D] disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-green-700"
            >
              সাইন আপ করুন
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
