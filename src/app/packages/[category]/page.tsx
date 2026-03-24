import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock3, ArrowRight } from "lucide-react";
import { packageCategories, travelPackages } from "@/lib/package-data";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return packageCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function PackageCategoryPage({ params }: PageProps) {
  const { category } = await params;

  const categoryData = packageCategories.find(
    (item) => item.slug === category
  );

  if (!categoryData) {
    notFound();
  }

  const categoryPackages = travelPackages.filter(
    (pkg) => pkg.category === category
  );

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="relative overflow-hidden border-b border-borderlight bg-[#f8fafc]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
              Ways to Travel
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-textmain md:text-5xl">
              {categoryData.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-textsecondary">
              {categoryData.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Plan This Journey
              </Link>

              <Link
                href="/packages"
                className="rounded-full border border-borderlight px-6 py-3 text-sm font-semibold text-textmain transition hover:border-primary hover:text-primary"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          {categoryPackages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-borderlight bg-[#fafafa] px-6 py-16 text-center">
              <h2 className="text-2xl font-bold text-textmain">
                No packages added yet
              </h2>
              <p className="mt-3 text-textsecondary">
                This category is ready. Add packages from the admin panel and
                they will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
                    Available Packages
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-textmain">
                    Explore {categoryPackages.length} curated journeys
                  </h2>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {categoryPackages.map((pkg) => (
                  <article
                    key={pkg.id}
                    className="group overflow-hidden rounded-[28px] border border-borderlight bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-[250px] overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {categoryData.title}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {pkg.price}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold leading-tight text-textmain transition group-hover:text-primary">
                        {pkg.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-textsecondary">
                        {pkg.shortDescription}
                      </p>

                      <div className="mt-5 space-y-3 text-sm text-textsecondary">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{pkg.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-primary" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={`/packages/${pkg.category}/${pkg.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                        >
                          View Package
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}