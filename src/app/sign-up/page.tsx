
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-800";

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      // Better Auth may create a session on registration.
      // Sign out so the user can log in separately.
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        toast.error(
          "অ্যাকাউন্ট তৈরি হয়েছে, কিন্তু সেশন শেষ করা যায়নি।"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");

      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });

      if (error) {
        toast.error(
          error.message || "সোশ্যাল লগইন করা যায়নি।"
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error("সোশ্যাল লগইন করতে সমস্যা হয়েছে।");
      setSocialLoading(null);
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
        <div className="rounded-2xl border border-[#E2E9E2] bg-white p-6 text-gray-900">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                নাম
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

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
                minLength={8}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={labelClass}
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="w-full rounded-lg bg-[#008B46] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00783D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
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

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading || socialLoading !== null}
              className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-xs text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading || socialLoading !== null}
              className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-xs text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 hover:underline"
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
