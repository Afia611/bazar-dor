
export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E0E7E0] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:text-left">
        {/* Left Text */}
        <p className="text-sm font-normal text-[#222222]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-sm font-normal text-[#222222]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
