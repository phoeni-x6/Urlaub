import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { packageCategories } from "@/lib/package-data";

export default function AllPackagesPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="border-b border-borderlight bg-[#f8fafc]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
              Ways to Travel
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-textmain md:text-5xl">
              Explore Our Travel Categories
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-textsecondary">
              Discover Sri Lanka through curated travel styles designed for
              culture, wellness, coastlines, slow living, and custom journeys.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packageCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/packages/${category.slug}`}
                className="group rounded-[28px] border border-borderlight bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                  Category
                </p>
                <h2 className="mt-3 text-2xl font-bold text-textmain group-hover:text-primary">
                  {category.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-textsecondary">
                  {category.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  View packages
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}