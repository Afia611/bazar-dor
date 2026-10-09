
import Banner from "@/components/homepage/Banner";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Banner />

      {/* All Products Section */}
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl scroll-mt-8 px-4 py-12 md:px-8"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>

        {/* Product cards will be added here later */}
      </section>
    </>
  );
}
