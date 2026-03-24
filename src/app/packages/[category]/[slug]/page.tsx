import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPinned,
  BedDouble,
  UtensilsCrossed,
  Plane,
  BadgeCheck,
  ChevronDown,
  Sparkles,
  Camera,
  Waves,
  Mountain,
  Trees,
  ArrowRight,
} from "lucide-react";
import { packageCategories, travelPackages } from "@/lib/package-data";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

function ItineraryAccordion({
  itinerary,
}: {
  itinerary?: {
    day: number;
    title: string;
    items: string[];
  }[];
}) {
  return (
    <div className="space-y-4">
      {itinerary?.map((day) => (
        <details
          key={day.day}
          className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm"
          open={day.day === 1}
        >
          <summary className="flex cursor-pointer items-center justify-between px-5 py-5 text-left transition hover:bg-gray-50 md:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#0F766E]/20 bg-[#0F766E]/10 text-[#0F766E]">
                <span className="text-sm font-bold">Day {day.day}</span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                  {day.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Click to view the experiences of this day
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <ChevronDown className="h-5 w-5 text-[#F59E0B]" />
            </div>
          </summary>

          <div className="border-t border-gray-200 px-5 py-5 md:px-6">
            <ul className="space-y-3">
              {day.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-7 text-gray-700"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F59E0B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
        <Icon className="h-5 w-5 text-[#0F766E]" />
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="mt-1 font-semibold text-gray-900">{value}</h3>
    </div>
  );
}

export async function generateStaticParams() {
  return travelPackages.map((pkg) => ({
    category: pkg.category,
    slug: pkg.slug,
  }));
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { category, slug } = await params;

  const pkg = travelPackages.find(
    (item) => item.category === category && item.slug === slug
  );

  if (!pkg) {
    notFound();
  }

  const categoryData = packageCategories.find(
    (item) => item.slug === pkg.category
  );

  const galleryImages =
    pkg.galleryImages && pkg.galleryImages.length > 0
      ? pkg.galleryImages
      : [
          pkg.image || "/packages/adventure.jfif",
          pkg.image || "/packages/adventure.jfif",
          pkg.image || "/packages/adventure.jfif",
          pkg.image || "/packages/adventure.jfif",
          pkg.image || "/packages/adventure.jfif",
        ];

  const includedExperiences =
    pkg.includedExperiences && pkg.includedExperiences.length > 0
      ? pkg.includedExperiences
      : [
          "Private airport transfers",
          "Curated accommodation selection",
          "Sightseeing experiences",
          "On-ground travel assistance",
          "Selected meals based on package type",
          "Comfortable guided travel experience",
        ];

  const whyClientsLoveIt = [
    {
      icon: Mountain,
      title: "Curated island journey",
      text:
        pkg.shortDescription ||
        "A thoughtfully designed package blending Sri Lanka’s best highlights into one seamless travel experience.",
    },
    {
      icon: Trees,
      title: "Authentic local experiences",
      text:
        "Designed to combine nature, culture, lifestyle moments, and memorable regional character.",
    },
    {
      icon: Waves,
      title: "Balanced travel flow",
      text:
        "The itinerary is structured to keep the trip inspiring, comfortable, and easy to enjoy from start to finish.",
    },
    {
      icon: Camera,
      title: "Premium presentation",
      text:
        "This layout gives each package a polished, high-end feel suitable for a professional travel brand.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={pkg.heroImage || pkg.image || "/packages/adventure.jfif"}
            alt={pkg.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/75 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.14),transparent_35%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-36">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F766E]/20 bg-white/80 px-4 py-2 text-sm text-[#0F766E] backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#F59E0B]" />
              {categoryData?.title || "Signature Sri Lanka Experience"}
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              {pkg.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              {pkg.subtitle ||
                pkg.shortDescription ||
                "Discover a beautifully curated Sri Lanka journey with memorable stays, experiences, and routes."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-gray-200 bg-white/90 px-5 py-3 text-sm text-gray-700 backdrop-blur-md">
                {pkg.travelStyle || "Private / Small Group"}
              </span>

              {pkg.guideInfo ? (
                <span className="rounded-full border border-[#0F766E]/20 bg-[#0F766E]/10 px-5 py-3 text-sm text-[#0F766E] backdrop-blur-md">
                  {pkg.guideInfo}
                </span>
              ) : null}

              <span className="rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/10 px-5 py-3 text-sm text-[#B45309] backdrop-blur-md">
                {categoryData?.title || "Sri Lanka Journey"}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-7 py-3.5 font-semibold text-white transition hover:bg-[#0c625b]"
              >
                Request This Tour
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Customize Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <InfoCard
            icon={CalendarDays}
            label="Duration"
            value={pkg.duration || "Flexible"}
          />
          <InfoCard
            icon={MapPinned}
            label="Route"
            value={pkg.routeSummary || pkg.location || "Sri Lanka"}
          />
          <InfoCard
            icon={BedDouble}
            label="Stay"
            value={pkg.accommodation || "3–4 Star & Boutique"}
          />
          <InfoCard
            icon={UtensilsCrossed}
            label="Meals"
            value={pkg.meals || "As per itinerary"}
          />
          <InfoCard
            icon={Plane}
            label="Flight"
            value={pkg.flightInfo || "Not Included"}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="mb-8">
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            The visual mood of the package
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <div className="relative h-80 overflow-hidden rounded-[32px] border border-gray-200 md:col-span-5">
            <Image
              src={galleryImages[0]}
              alt={`${pkg.title} gallery image 1`}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {galleryImages.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="relative min-h-[185px] overflow-hidden rounded-[28px] border border-gray-200"
              >
                <Image
                  src={img}
                  alt={`${pkg.title} gallery image ${index + 2}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
  <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
    <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
        Tour Overview
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        {pkg.overviewTitle ||
          "A premium island journey blending heritage, nature, luxury, and coastal relaxation"}
      </h2>

      <p className="mt-5 text-base leading-8 text-gray-600">
        {pkg.longDescription || pkg.shortDescription}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Route</p>
          <p className="mt-2 leading-7 text-gray-700">
            {pkg.route || pkg.location || "Sri Lanka"}
          </p>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Accommodation</p>
          <p className="mt-2 leading-7 text-gray-700">
            {pkg.accommodation || "Curated stays"}
          </p>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Meals</p>
          <p className="mt-2 leading-7 text-gray-700">
            {pkg.meals || "As per itinerary"}
          </p>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Travel Style</p>
          <p className="mt-2 leading-7 text-gray-700">
            {pkg.travelStyle || "Private / Small Group"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#B45309]">
          <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
          Highlights
        </p>
        <p className="mt-3 leading-7 text-gray-700">
          {pkg.highlights ||
            "Curated experiences, premium travel flow, memorable stays, and beautifully structured island exploration."}
        </p>
      </div>
    </div>

    <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
        Why clients will love it
      </p>

      <div className="mt-6 space-y-4">
        {whyClientsLoveIt.map((item, i) => (
          <div
            key={i}
            className="rounded-[24px] border border-gray-200 bg-gray-50 p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
              <item.icon className="h-5 w-5 text-[#0F766E]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Route Map
            </p>

            <div className="relative mt-6 h-[540px] overflow-hidden rounded-[28px] border border-gray-200 bg-gray-100">
              <Image
                src={pkg.mapImage || "/packages/maptest1.png"}
                alt={`${pkg.title} route map`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Itinerary
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Day-by-day journey
            </h2>
            <p className="mt-3 mb-8 text-sm leading-7 text-gray-600">
              Browse each day of the itinerary below.
            </p>

            <ItineraryAccordion itinerary={pkg.itinerary} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
            Included Experiences
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {includedExperiences.map((item, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-gray-200 bg-gray-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                  </div>
                  <p className="text-sm leading-7 text-gray-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Pricing
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-5xl font-bold text-gray-900 md:text-6xl">
                {pkg.price || "Custom Quote"}
              </span>
              <span className="pb-2 text-gray-500">per person</span>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Room Type</p>
                <p className="mt-2 text-gray-700">
                  {pkg.roomType || "Double Room / Twin Room"}
                </p>
              </div>

              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Guide Included</p>
                <p className="mt-2 text-gray-700">
                  {pkg.guideInfo || "Available on request"}
                </p>
              </div>

              <div className="rounded-[24px] border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#B45309]">
                  <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
                  Important Note
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-700">
                  {pkg.upgradeNote ||
                    "Final pricing may vary depending on room category, hotel upgrades, and custom travel requirements."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-gradient-to-br from-[#0F766E]/10 via-white to-[#F59E0B]/10 p-8 shadow-sm">
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Present this package concept with confidence
            </h2>

            <div className="mt-8 space-y-4">
              <Link
                href="/contact"
                className="block w-full rounded-full bg-[#0F766E] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#0c625b]"
              >
                Request This Tour
              </Link>

              <Link
                href="/contact"
                className="block w-full rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-6 py-4 text-center font-semibold text-[#B45309] transition hover:bg-[#F59E0B]/15"
              >
                Customize the Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}