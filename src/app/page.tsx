import Navbar from "@/components/Navbar";
import PackageCategories from "@/components/PackageCategories";
import LatestBlogs from "@/components/LatestBlogs";
import ReviewSlideshow from "@/components/ReviewSlideshow";
import Footer from "@/components/Footer";
import ParallaxBanner from "@/components/ParallaxBanner";
import GallerySection from "@/components/GallerySection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

<section className="relative overflow-hidden bg-primary px-6 py-20 text-white lg:px-10">
  <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
    {/* Left Content */}
    <div className="relative z-10">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
        Tropical escapes
      </p>

      <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
        Discover Sri Lanka through curated journeys and unforgettable stays
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-white/85">
        From golden beaches to misty mountains, build a travel experience
        that feels effortless, personal, and inspiring.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark">
          Explore Tours
        </button>
        <button className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20">
          View Destinations
        </button>
      </div>
    </div>

    {/* Right Mascot */}
    <div className="relative z-10 flex justify-center lg:justify-end">
      <div className="relative">
        <div className="absolute inset-0 scale-110 rounded-full bg-accent/20 blur-3xl" />
        <Image
  src="/mascot/mascot3.png"
  alt="Sri Lanka travel mascot"
  width={700}
  height={700}
  priority
  className="relative h-auto w-[420px] drop-shadow-2xl md:w-[520px] lg:w-[620px]"
/>
      </div>
    </div>
  </div>

  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
  <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
</section>

       <PackageCategories />
       <ParallaxBanner />
       <LatestBlogs />
       <GallerySection />
       <ReviewSlideshow />
       <Footer />
    </main>
  );
}