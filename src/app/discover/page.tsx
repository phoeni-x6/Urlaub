"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabasePublic } from "@/lib/supabase/public";

const blogCategories = [
  "Cultural Heritage",
  "Religious & spiritual journeys",
  "Nature & Wildlife",
  "Local & authentic experiences",
  "Ayurveda & Wellness",
  "Hilly landscape & tropical adventure",
  "Beaches & Coastal Activities",
  "Cultural festivals",
];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
};

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

const normalizeCoverImage = (url?: string) => {
  if (!url) return "/packages/adventure.jfif";
  // Avoid remote images that need extra Next.js config (e.g., Unsplash)
  if (url.includes("images.unsplash.com") || url.includes("unsplash.com")) {
    return "/packages/adventure.jfif";
  }
  return url;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabasePublic
        .from("blogs")
        .select(
          "id, title, slug, category, author, cover_image, description, created_at, status"
        )
        .eq("status", "Published")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const formattedBlogs: BlogPost[] =
        data?.map((item) => {
          const plainText = stripHtml(item.description || "");

          return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            category: item.category,
            author: item.author || "Admin",
            date: formatDate(item.created_at),
            coverImage: normalizeCoverImage(item.cover_image),
            excerpt:
              plainText.length > 140
                ? `${plainText.slice(0, 140)}...`
                : plainText,
          };
        }) || [];

      setBlogs(formattedBlogs);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogs;
    return blogs.filter((blog) => blog.category === selectedCategory);
  }, [selectedCategory, blogs]);

  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-20 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-accent/10" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Travel Stories & Insights
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-textmain md:text-5xl">
            Discover Sri Lanka through inspiring stories, culture, wellness,
            and unforgettable travel experiences
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-textsecondary md:text-lg">
            Explore handpicked articles from Urlaub that help travelers
            experience Sri Lanka in a more meaningful, authentic, and memorable
            way.
          </p>
        </div>
      </section>

      <section className="px-6 pb-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-borderlight bg-background/70 p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-textmain">
                  Filter by Category
                </h2>
                <p className="text-sm text-textsecondary">
                  Select a topic to browse relevant blog articles.
                </p>
              </div>

              <div className="text-sm font-medium text-textsecondary">
                Showing{" "}
                <span className="text-primary">{filteredBlogs.length}</span>{" "}
                article{filteredBlogs.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  selectedCategory === "All"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-textmain hover:bg-primary/10 hover:text-primary"
                }`}
              >
                All
              </button>

              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-textmain hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="rounded-3xl border border-borderlight bg-background px-6 py-16 text-center">
              <p className="text-textsecondary">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center">
              <h3 className="text-2xl font-semibold text-red-700">
                Failed to load blogs
              </h3>
              <p className="mt-3 text-red-600">{error}</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-[28px] border border-borderlight bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/discover/${blog.slug}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {blog.category}
                      </span>
                      <span className="text-xs text-textsecondary">
                        {blog.date}
                      </span>
                    </div>

                    <Link href={`/discover/${blog.slug}`} className="block">
                      <h3 className="text-xl font-semibold leading-snug text-textmain transition group-hover:text-primary">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-textsecondary">
                      {blog.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm font-medium text-textsecondary">
                        By {blog.author}
                      </p>

                      <Link
                        href={`/discover/${blog.slug}`}
                        className="text-sm font-semibold text-primary transition hover:text-accent"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-borderlight bg-background px-6 py-16 text-center">
              <h3 className="text-2xl font-semibold text-textmain">
                No blogs found
              </h3>
              <p className="mt-3 text-textsecondary">
                There are no blog posts in this category yet. Try another
                filter.
              </p>

              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Show All Blogs
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}