import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-icon.png";

const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date());

const Navbar = () => {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">

        {/* Logo and date */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="বাজার দর লোগো"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">
              {banglaDate}
            </p>
          </div>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
