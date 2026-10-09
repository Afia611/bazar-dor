
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/bazar-hero.png";

const Banner = () => {
  return (
    <section className="bg-[#F0F5F0] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-gray-100 bg-white/90 px-6 py-8 md:flex-row md:px-12 md:py-12">

          {/* Left: Hero content */}
          <div className="w-full space-y-4 md:w-3/5">

            {/* Eyebrow */}
            <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {new Intl.DateTimeFormat("bn-BD", {
                 weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
                 }).format(new Date())}
            </span>

            {/* Main heading */}
            <h1 className="text-2xl font-bold leading-tight text-[#1F3026] md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলের দাম —
              বাজারদরের বিস্তারিত, গতি, সর্বোচ্চ-সর্বনিম্ন এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <Link
              href="#সব-পণ্য"
              className="btn border-none bg-green-700 px-6 text-white hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right: Hero Image */}
          <div className="flex w-full justify-center md:w-2/5 md:justify-end">
            <Image
              src={heroImage}
              alt="বাজারের নিত্যপ্রয়োজনীয় পণ্যের ঝুড়ি"
              width={360}
              height={300}
              priority
              className="h-auto w-56 object-contain sm:w-72 md:w-80"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
