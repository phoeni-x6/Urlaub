import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Mountain, Sparkles, Users } from "lucide-react";

const categories = [
  {
    title: "Classic Escapes",
    description:
      "Timeless journeys through Sri Lanka’s most loved beaches, heritage cities, and scenic highlights.",
    image: "/packages/classic.jfif",
    href: "/packages/classic",
    icon: Sparkles,
  },
  {
    title: "Adventure Trails",
    description:
      "Hiking, surfing, wildlife safaris, and outdoor experiences for travelers who want energy and thrill.",
    image: "/packages/adventure.jfif",
    href: "/packages/adventure",
    icon: Mountain,
  },
  {
    title: "Wellness & Retreats",
    description:
      "Ayurveda, nature stays, and peaceful escapes designed to restore your mind and body.",
    image: "/packages/wellness.jfif",
    href: "/packages/wellness",
    icon: Leaf,
  },
  {
    title: "Romance Journeys",
    description:
      "Curated honeymoon and couple experiences with intimate stays, sunsets, and memorable moments.",
    image: "/packages/romance.jfif",
    href: "/packages/romance",
    icon: Heart,
  },
  {
    title: "Group Adventures",
    description:
      "Perfectly planned trips for families, friends, schools, and private groups with flexible itineraries.",
    image: "/packages/group.jfif",
    href: "/packages/group",
    icon: Users,
  },
];

export default function PackageCategories() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Curated Experiences
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-textmain md:text-5xl">
            Package Categories
          </h2>
          <p className="mt-4 text-base leading-7 text-textsecondary md:text-lg">
            Choose from immersive travel styles crafted for every kind of journey
            across Sri Lanka.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="group relative overflow-hidden rounded-[28px] border border-borderlight bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-md backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <div className="relative p-6">
                  <div className="absolute -top-8 right-6 h-16 w-16 rounded-full bg-accent/15 blur-2xl" />

                  <p className="relative text-base leading-7 text-textsecondary">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={category.href}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Explore Package
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <span className="text-sm font-medium text-accent">
                      Tailored tours
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}