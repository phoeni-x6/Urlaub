import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const blogs = [
  {
    title: "7 Hidden Beaches in Sri Lanka You Should Visit",
    excerpt:
      "From quiet southern bays to untouched coastal gems, discover beach escapes beyond the usual tourist trail.",
    image: "/packages/adventure.jfif",
    date: "12 Mar 2026",
    category: "Beach Travel",
    href: "/blog/hidden-beaches-sri-lanka",
  },
  {
    title: "A Complete Ella Travel Guide for First-Time Visitors",
    excerpt:
      "Plan your hill country escape with the best viewpoints, train rides, cafés, and stays in Ella.",
    image: "/packages/classic.jfif",
    date: "08 Mar 2026",
    category: "Travel Guide",
    href: "/blog/ella-travel-guide",
  },
  {
    title: "Best Luxury Stays for a Romantic Getaway",
    excerpt:
      "Explore handpicked resorts and boutique villas perfect for honeymoons and unforgettable couple experiences.",
    image: "/packages/romance.jfif",
    date: "03 Mar 2026",
    category: "Luxury",
    href: "/blog/luxury-romantic-stays",
  },
];

export default function LatestBlogs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Travel Journal
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-textmain md:text-5xl">
              Latest Stories & Insights
            </h2>
            <p className="mt-4 text-base leading-7 text-textsecondary md:text-lg">
              Fresh travel inspiration, destination guides, and local tips to
              help you plan a more meaningful Sri Lankan journey.
            </p>
          </div>

          <Link
            href="/discover"
            className="inline-flex items-center gap-2 self-start rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <article className="group relative overflow-hidden rounded-[32px] bg-primary lg:col-span-7">
            <div className="grid h-full lg:grid-cols-2">
              <div className="relative min-h-[320px]">
                <Image
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="relative flex flex-col justify-between p-8 text-white md:p-10">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

                <div className="relative">
                  <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    {blogs[0].category}
                  </span>

                  <div className="mt-5 flex items-center gap-2 text-sm text-white/75">
                    <CalendarDays className="h-4 w-4" />
                    {blogs[0].date}
                  </div>

                  <h3 className="mt-5 text-3xl font-bold leading-tight">
                    {blogs[0].title}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-white/80">
                    {blogs[0].excerpt}
                  </p>
                </div>

                <Link
                  href={blogs[0].href}
                  className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-5">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog.title}
                className="group overflow-hidden rounded-[28px] border border-borderlight bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid sm:grid-cols-[180px_1fr]">
                  <div className="relative min-h-[220px] sm:min-h-full">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-textsecondary">
                          <CalendarDays className="h-4 w-4" />
                          {blog.date}
                        </div>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-snug text-textmain transition group-hover:text-primary">
                        {blog.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-textsecondary">
                        {blog.excerpt}
                      </p>
                    </div>

                    <Link
                      href={blog.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}