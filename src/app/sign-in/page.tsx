
"use client";

import {
  Suspense,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-800";

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      // Redirect back to product if login was required.
      const callbackURL =
        searchParams.get("callbackURL") || "/";

      const destination =
        callbackURL.startsWith("/") &&
        !callbackURL.startsWith("//") &&
        !callbackURL.startsWith("/\\")
          ? callbackURL
          : "/";

      router.replace(destination);
      router.refresh();
    } catch {
      toast.error(
        "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-14">
      <div className="mx-auto max-w-md">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#25342A]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-[#E2E9E2] bg-white p-6 text-gray-900">
          <form
            onSubmit={handleSignIn}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#008B46] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00783D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login - configure OAuth later */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-xs text-gray-600 opacity-60"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-xs text-gray-600 opacity-60"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-14">
          <div className="mx-auto max-w-md animate-pulse">
            <div className="mx-auto mb-6 h-8 w-32 rounded bg-gray-200" />
            <div className="h-80 rounded-2xl bg-white" />
          </div>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
