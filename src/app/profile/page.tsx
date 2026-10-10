"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loggingOut, setLoggingOut] = useState(false);

  // Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in?callbackURL=%2Fprofile");
    }
  }, [isPending, user, router]);

  // Logout function
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগ আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে লগ আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("লগ আউট করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  };

  // Loading skeleton
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
        <div className="mx-auto max-w-2xl animate-pulse">
          <div className="mb-8 h-8 w-48 rounded bg-gray-200" />

          <div className="rounded-2xl bg-white p-8">
            <div className="mb-5 h-20 w-20 rounded-full bg-gray-200" />
            <div className="mb-3 h-6 w-44 rounded bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  // Hide profile content while redirecting
  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
        <p className="text-center text-gray-600">
          সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 md:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#25342A] md:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            আপনার ব্যক্তিগত তথ্য দেখুন ও আপডেট করুন।
          </p>
        </div>

        {/* Profile Information Card */}
        <section className="mb-6 rounded-2xl border border-[#E2E9E2] bg-white p-6 text-gray-900 shadow-sm md:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            {/* Profile Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-3xl font-bold text-green-800">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "প্রোফাইল ছবি"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* User Information */}
            <div className="min-w-0">
              <h2 className="break-words text-xl font-bold text-gray-900">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                নিবন্ধিত ব্যবহারকারী
              </span>
            </div>
          </div>

          {/* Update Information Button */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <Link
              href="/profile/update"
              className="inline-flex items-center justify-center rounded-lg bg-[#008B46] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00783D]"
            >
              তথ্য আপডেট করুন
            </Link>
          </div>
        </section>

        {/* Connect GitHub */}
        <section className="mb-6 rounded-2xl border border-[#E2E9E2] bg-white p-6">
        <h2 className="mb-3 text-lg font-bold text-gray-900">
           GitHub অ্যাকাউন্ট সংযুক্ত করুন
         </h2>

        <p className="mb-4 text-sm text-gray-600">
           আপনার বর্তমান অ্যাকাউন্টের সাথে GitHub সংযুক্ত করুন।
        </p>

        <button
          type="button"
          onClick={async () => {
           try {
             const { error } = await authClient.linkSocial({
              provider: "github",
              callbackURL: "/profile",
         });

         if (error) {
          toast.error(
            error.message || "GitHub সংযুক্ত করা যায়নি।"
          );
        }
      } catch {
        toast.error("GitHub সংযুক্ত করতে সমস্যা হয়েছে।");
      }
    }}
    className="rounded-lg bg-[#008B46] px-6 py-3 text-sm font-semibold text-white hover:bg-[#00783D]"
    >
        Connect GitHub
      </button>
       </section>

        {/* Account Actions */}
        <section className="rounded-2xl border border-[#E2E9E2] bg-white p-6 text-gray-900 shadow-sm md:p-8">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            অ্যাকাউন্ট
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            আপনার অ্যাকাউন্ট থেকে নিরাপদে লগ আউট করুন।
          </p>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-red-500 px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
          </button>
        </section>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}