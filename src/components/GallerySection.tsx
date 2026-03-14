"use client";

import Image from "next/image";
import Link from "next/link";

const galleryItems = [
  {
    id: 1,
    title: "Golden Beach Escape",
    category: "Coastal",
    image:
      "",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Misty Mountain Trails",
    category: "Highlands",
    image:
      "",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Tropical Hideaways",
    category: "Nature",
    image:
      "",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    title: "Cultural Journeys",
    category: "Heritage",
    image:
      "",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    title: "Luxury Stays",
    category: "Stay",
    image:
      "",
    className: "md:col-span-2 md:row-span-1",
  },
];

export default function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[#f8f6f1] px-6 py-24">
      {/* Background glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Visual highlights
            </p>
            <h2 className="text-4xl font-bold leading-tight text-[#1f3b2d] md:text-5xl">
              Explore unforgettable moments across Sri Lanka
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base leading-7 text-[#4d5c53]">
              A curated gallery of beaches, mountains, stays, and cultural
              escapes designed to inspire your next journey.
            </p>
            <Link
              href="/gallery"
              className="mt-5 inline-flex items-center rounded-full bg-[#1f3b2d] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#163024]"
            >
              View Full Gallery
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[240px] grid-cols-1 gap-5 md:grid-cols-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-[28px] shadow-lg ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition duration-500 group-hover:from-black/80" />

              {/* Floating label */}
              <div className="absolute left-5 top-5 rounded-full bg-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {item.category}
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Discover places that blend beauty, comfort, and experience.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}