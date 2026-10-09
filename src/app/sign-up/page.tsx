
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-md">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#25342A]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-[#E2E9E2] bg-white p-6">
          <form onSubmit={handleSignUp} className="space-y-4">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* Email */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* Password */}
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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* Error */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#008B46] py-3 font-semibold text-white shadow-sm hover:bg-[#00783D] disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-200 px-2 py-2.5 text-xs text-gray-500 opacity-60"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-200 px-2 py-2.5 text-xs text-gray-500 opacity-60"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
