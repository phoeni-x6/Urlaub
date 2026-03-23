import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabasePublic } from "@/lib/supabase/public";

type PageProps = {
  params: {
    slug: string;
  };
};

const decodeHtmlEntities = (text: string) => {
  if (!text) return "";

  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/");
};

const stripHtml = (html: string) => {
  if (!html) return "";

  return decodeHtmlEntities(html)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const normalizeCoverImage = (url?: string) => {
  if (!url) return "/packages/adventure.jfif";
  if (url.includes("images.unsplash.com") || url.includes("unsplash.com")) {
    return "/packages/adventure.jfif";
  }
  return url;
};

const normalizeBlogHtml = (html?: string) => {
  if (!html) return "";

  let cleaned = decodeHtmlEntities(html)
    .replace(/&nbsp;/gi, " ")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<p>(\s|<br\s*\/?>|&nbsp;)*<\/p>/gi, "")
    .trim();

  // If content comes as plain text or badly formatted editor output,
  // convert paragraph breaks into proper <p> tags.
  const hasHtmlBlocks = /<(p|h1|h2|h3|h4|ul|ol|li|blockquote|img|table)\b/i.test(
    cleaned
  );

  if (!hasHtmlBlocks) {
    cleaned = cleaned
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
  }

  return cleaned;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: blog, error } = await supabasePublic
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .single();

  if (error || !blog) {
    notFound();
  }

  const normalizedBlogHtml = normalizeBlogHtml(blog.description || "");

  const { data: relatedData } = await supabasePublic
    .from("blogs")
    .select(
      "id, title, slug, category, author, cover_image, description, created_at"
    )
    .eq("status", "Published")
    .eq("category", blog.category)
    .neq("slug", blog.slug)
    .order("created_at", { ascending: false })
    .limit(3);

  const relatedBlogs =
    relatedData?.map((item) => {
      const plainText = stripHtml(item.description || "");

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        author: item.author || "Admin",
        coverImage: normalizeCoverImage(item.cover_image),
        excerpt:
          plainText.length > 140
            ? `${plainText.slice(0, 140)}...`
            : plainText,
      };
    }) || [];

  const blogExcerpt = (() => {
    const plainText = stripHtml(blog.description || "");
    return plainText.length > 180
      ? `${plainText.slice(0, 180)}...`
      : plainText;
  })();

  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-16 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-accent/10" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/discover"
            className="mb-6 inline-flex items-center text-sm font-medium text-primary transition hover:text-accent"
          >
            ← Back to Discover
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {blog.category}
            </span>

            <span className="text-sm text-textsecondary">
              {formatDate(blog.created_at)}
            </span>

            <span className="text-sm text-textsecondary">
              By {blog.author || "Admin"}
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-textmain md:text-5xl">
            {blog.title}
          </h1>

          {blogExcerpt && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-textsecondary">
              {blogExcerpt}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 pb-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative h-[260px] overflow-hidden rounded-[30px] md:h-[420px]">
            <Image
              src={normalizeCoverImage(blog.cover_image)}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article
            className="
              min-w-0 overflow-hidden break-words
              prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-textmain
              prose-h2:mt-10 prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:text-2xl
              prose-p:leading-8 prose-p:text-textsecondary
              prose-li:text-textsecondary
              prose-strong:text-textmain
              prose-a:text-primary
              prose-img:rounded-2xl
              prose-blockquote:border-primary prose-blockquote:text-textsecondary
            "
            dangerouslySetInnerHTML={{ __html: normalizedBlogHtml }}
          />

          <aside className="h-fit rounded-[28px] border border-borderlight bg-background/60 p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold text-textmain">
              Article Info
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Category
                </p>
                <p className="mt-1 text-sm text-textsecondary">
                  {blog.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Author
                </p>
                <p className="mt-1 text-sm text-textsecondary">
                  {blog.author || "Admin"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Published
                </p>
                <p className="mt-1 text-sm text-textsecondary">
                  {formatDate(blog.created_at)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Related Articles
              </p>
              <h2 className="mt-2 text-3xl font-bold text-textmain">
                More from {blog.category}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedBlogs.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[28px] border border-borderlight bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/discover/${item.slug}`} className="block">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.category}
                    </span>

                    <Link href={`/discover/${item.slug}`} className="block">
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-textmain transition hover:text-primary">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-textsecondary">
                      {item.excerpt}
                    </p>

                    <Link
                      href={`/discover/${item.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-primary transition hover:text-accent"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}