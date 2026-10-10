
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending, refetch } =
    authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // Redirect if the user is not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.replace(
        "/sign-in?callbackURL=%2Fprofile%2Fupdate"
      );
    }
  }, [isPending, user, router]);

  // Set the user's current name
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  // Update profile information
  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (newName === user?.name) {
      toast.info("নাম পরিবর্তন করা হয়নি।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(
          error.message || "তথ্য আপডেট করা যায়নি।"
        );
        return;
      }

      await refetch();

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");

      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  // Loading skeleton
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
        <div className="mx-auto max-w-lg animate-pulse rounded-2xl bg-white p-8">
          <div className="mb-6 h-8 w-44 rounded bg-gray-200" />
          <div className="mb-4 h-5 w-24 rounded bg-gray-200" />
          <div className="mb-6 h-12 rounded bg-gray-200" />
          <div className="h-12 w-36 rounded bg-gray-200" />
        </div>
      </main>
    );
  }

  // Hide content while redirecting
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
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto max-w-lg">

        {/* Page Heading */}
        <h1 className="mb-6 text-2xl font-bold text-[#25342A]">
          তথ্য আপডেট করুন
        </h1>

        {/* Update Form Card */}
        <div className="rounded-2xl border border-[#E2E9E2] bg-white p-6 text-gray-900 shadow-sm md:p-8">

          <p className="mb-6 text-sm text-gray-600">
            আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
          </p>

          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >
            {/* Name Input */}
            <div>
              <label
                htmlFor="update-name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                আপনার নাম
              </label>

              <input
                id="update-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600"
              />
            </div>

            {/* Email - Read Only */}
            <div>
              <label
                htmlFor="update-email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                ইমেইল
              </label>

              <input
                id="update-email"
                type="email"
                value={user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
              />

              <p className="mt-2 text-xs text-gray-500">
                এই পেজ থেকে ইমেইল পরিবর্তন করা যাবে না।
              </p>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-[#008B46] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00783D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving
                ? "আপডেট হচ্ছে..."
                : "তথ্য আপডেট করুন"}
            </button>
          </form>

          {/* Back to Profile */}
          <Link
            href="/profile"
            className="mt-5 inline-block text-sm font-medium text-green-700 hover:underline"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
