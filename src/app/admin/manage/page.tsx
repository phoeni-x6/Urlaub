"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  DollarSign,
  FileText,
  Image as ImageIcon,
  MapPin,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import InputField from "@/components/admin/InputField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  blogCategories,
  initialTravelPackages,
  TravelPackage,
} from "@/lib/admin-data";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage: string;
  description: string;
  status: "Published" | "Draft";
  created_at?: string;
};

const supabase = createClient();

const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const uploadBlogImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;
  const filePath = `blogs/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  return data.publicUrl;
};

const getStoragePathFromPublicUrl = (publicUrl: string) => {
  try {
    const marker = "/storage/v1/object/public/blog-images/";
    const index = publicUrl.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(publicUrl.substring(index + marker.length));
  } catch {
    return null;
  }
};

export default function AdminManagePage() {
  const router = useRouter();
  const blogFileInputRef = useRef<HTMLInputElement | null>(null);

  const [travelPackages, setTravelPackages] =
    useState<TravelPackage[]>(initialTravelPackages);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogDeletingId, setBlogDeletingId] = useState<number | null>(null);
  const [blogError, setBlogError] = useState("");
  const [blogSuccess, setBlogSuccess] = useState("");
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  const [packageForm, setPackageForm] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    status: "Draft" as "Published" | "Draft",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Cultural Heritage",
    author: "Admin",
    description: "",
    status: "Draft" as "Published" | "Draft",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("travel_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
      return;
    }

    fetchBlogs();
  }, [router]);

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      category: "Cultural Heritage",
      author: "Admin",
      description: "",
      status: "Draft",
    });
    setBlogImageFile(null);
    setEditingBlogId(null);

    if (blogFileInputRef.current) {
      blogFileInputRef.current.value = "";
    }
  };

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    setBlogError("");

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setBlogError(error.message);
      setBlogsLoading(false);
      return;
    }

    const formattedBlogs: BlogPost[] =
      data?.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug || "",
        category: item.category,
        author: item.author,
        coverImage: item.cover_image || "",
        description: item.description || "",
        status: item.status,
        created_at: item.created_at,
      })) || [];

    setBlogs(formattedBlogs);
    setBlogsLoading(false);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!packageForm.title || !packageForm.location || !packageForm.price) return;

    const newPackage: TravelPackage = {
      id: Date.now(),
      title: packageForm.title,
      location: packageForm.location,
      duration: packageForm.duration || "Custom Duration",
      price: packageForm.price,
      image: packageForm.image || "/packages/adventure.jfif",
      status: packageForm.status,
    };

    setTravelPackages((prev) => [newPackage, ...prev]);

    setPackageForm({
      title: "",
      location: "",
      duration: "",
      price: "",
      image: "",
      description: "",
      status: "Draft",
    });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogError("");
    setBlogSuccess("");
    setEditingBlogId(blog.id);
    setBlogImageFile(null);

    setBlogForm({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      description: blog.description,
      status: blog.status,
    });

    if (blogFileInputRef.current) {
      blogFileInputRef.current.value = "";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBlog = async (blog: BlogPost) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) return;

    try {
      setBlogError("");
      setBlogSuccess("");
      setBlogDeletingId(blog.id);

      const { error } = await supabase.from("blogs").delete().eq("id", blog.id);

      if (error) {
        setBlogError(error.message);
        return;
      }

      const storagePath = getStoragePathFromPublicUrl(blog.coverImage);
      if (storagePath) {
        await supabase.storage.from("blog-images").remove([storagePath]);
      }

      setBlogs((prev) => prev.filter((item) => item.id !== blog.id));

      if (editingBlogId === blog.id) {
        resetBlogForm();
      }

      setBlogSuccess("Blog post deleted successfully.");
    } catch (err: any) {
      setBlogError(
        err?.message || "Something went wrong while deleting the blog post."
      );
    } finally {
      setBlogDeletingId(null);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogError("");
    setBlogSuccess("");

    if (!blogForm.title.trim() || !blogForm.category.trim()) {
      setBlogError("Title and category are required.");
      return;
    }

    try {
      setBlogSubmitting(true);

      if (editingBlogId) {
        const existingBlog = blogs.find((item) => item.id === editingBlogId);

        if (!existingBlog) {
          setBlogError("Selected blog post was not found.");
          return;
        }

        let imageUrl = existingBlog.coverImage;

        if (blogImageFile) {
          imageUrl = await uploadBlogImage(blogImageFile);

          const oldStoragePath = getStoragePathFromPublicUrl(
            existingBlog.coverImage
          );

          if (oldStoragePath) {
            await supabase.storage.from("blog-images").remove([oldStoragePath]);
          }
        }

        const updatedSlug =
          existingBlog.title !== blogForm.title.trim()
            ? `${createSlug(blogForm.title)}-${editingBlogId}`
            : existingBlog.slug;

        const payload = {
          title: blogForm.title.trim(),
          slug: updatedSlug,
          category: blogForm.category,
          author: blogForm.author.trim() || "Admin",
          cover_image: imageUrl,
          description: blogForm.description,
          status: blogForm.status,
        };

        const { data, error } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", editingBlogId)
          .select()
          .single();

        if (error) {
          setBlogError(error.message);
          return;
        }

        const updatedBlog: BlogPost = {
          id: data.id,
          title: data.title,
          slug: data.slug || "",
          category: data.category,
          author: data.author,
          coverImage: data.cover_image || "",
          description: data.description || "",
          status: data.status,
          created_at: data.created_at,
        };

        setBlogs((prev) =>
          prev.map((item) => (item.id === editingBlogId ? updatedBlog : item))
        );

        resetBlogForm();
        setBlogSuccess("Blog post updated successfully.");
        return;
      }

      if (!blogImageFile) {
        setBlogError("Please select a cover image.");
        return;
      }

      const baseSlug = createSlug(blogForm.title);
      const uniqueSlug = `${baseSlug}-${Date.now()}`;

      const imageUrl = await uploadBlogImage(blogImageFile);

      const payload = {
        title: blogForm.title.trim(),
        slug: uniqueSlug,
        category: blogForm.category,
        author: blogForm.author.trim() || "Admin",
        cover_image: imageUrl,
        description: blogForm.description,
        status: blogForm.status,
      };

      const { data, error } = await supabase
        .from("blogs")
        .insert(payload)
        .select()
        .single();

      if (error) {
        setBlogError(error.message);
        return;
      }

      const newBlog: BlogPost = {
        id: data.id,
        title: data.title,
        slug: data.slug || "",
        category: data.category,
        author: data.author,
        coverImage: data.cover_image || "",
        description: data.description || "",
        status: data.status,
        created_at: data.created_at,
      };

      setBlogs((prev) => [newBlog, ...prev]);
      resetBlogForm();
      setBlogSuccess("Blog post saved successfully.");
    } catch (err: any) {
      setBlogError(
        err?.message || "Something went wrong while saving the blog post."
      );
    } finally {
      setBlogSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8f6] text-[#123128]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <section className="flex-1">
          <AdminTopbar
            title="Manage Travel Packages & Blogs"
            subtitle="Create and preview package and blog entries."
          />

          <div className="p-5 sm:p-8">
            <div className="grid gap-8">
              <div className="grid gap-6 xl:grid-cols-[1.05fr_1.25fr]">
                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#edf7f3] p-3 text-[#0d5c46]">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Add Travel Package</h3>
                      <p className="text-sm text-[#5f7d74]">
                        Create a new package card for the website.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAddPackage} className="space-y-4">
                    <InputField
                      label="Package Title"
                      value={packageForm.title}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, title: value }))
                      }
                      placeholder="Ex: Luxury South Coast Tour"
                    />

                    <InputField
                      label="Location"
                      value={packageForm.location}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, location: value }))
                      }
                      placeholder="Ex: Galle"
                    />

                    <InputField
                      label="Duration"
                      value={packageForm.duration}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, duration: value }))
                      }
                      placeholder="Ex: 5 Days / 4 Nights"
                    />

                    <InputField
                      label="Price"
                      value={packageForm.price}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, price: value }))
                      }
                      placeholder="Ex: $450"
                    />

                    <InputField
                      label="Image URL"
                      value={packageForm.image}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, image: value }))
                      }
                      placeholder="Paste image URL"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        rows={5}
                        value={packageForm.description}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Package description..."
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Status
                      </label>
                      <select
                        value={packageForm.status}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            status: e.target.value as "Published" | "Draft",
                          }))
                        }
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#0d5c46] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#094735]"
                    >
                      Save Package
                    </button>
                  </form>
                </div>

                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">All Travel Packages</h3>
                      <p className="text-sm text-[#5f7d74]">
                        Preview of hardcoded package items.
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 md:flex">
                      <Search className="h-4 w-4 text-[#5f7d74]" />
                      <input
                        placeholder="Search..."
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {travelPackages.map((item) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-3xl border border-[#edf3f0]"
                      >
                        <div className="grid md:grid-cols-[180px_1fr]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-52 w-full object-cover md:h-full"
                          />

                          <div className="p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-bold">{item.title}</h4>
                                <p className="mt-1 text-sm text-[#5f7d74]">
                                  {item.location}
                                </p>
                              </div>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  item.status === "Published"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#34534a]">
                              <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                <MapPin className="h-4 w-4" />
                                {item.location}
                              </span>
                              <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                <Calendar className="h-4 w-4" />
                                {item.duration}
                              </span>
                              <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                <DollarSign className="h-4 w-4" />
                                {item.price}
                              </span>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              <button className="rounded-2xl bg-[#0d5c46] px-4 py-2.5 text-sm font-semibold text-white">
                                Edit
                              </button>
                              <button className="rounded-2xl border border-[#d7e5df] bg-white px-4 py-2.5 text-sm font-semibold text-[#123128]">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.05fr_1.25fr]">
                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-[#edf7f3] p-3 text-[#0d5c46]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        {editingBlogId ? "Edit Blog Post" : "Add Blog Post"}
                      </h3>
                      <p className="text-sm text-[#5f7d74]">
                        {editingBlogId
                          ? "Update the selected blog post."
                          : "Create a new blog card for the website."}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAddBlog} className="space-y-4">
                    <InputField
                      label="Blog Title"
                      value={blogForm.title}
                      onChange={(value) =>
                        setBlogForm((prev) => ({ ...prev, title: value }))
                      }
                      placeholder="Ex: Best Places to Visit in Ella"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Category
                      </label>
                      <select
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      >
                        {blogCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <InputField
                      label="Author"
                      value={blogForm.author}
                      onChange={(value) =>
                        setBlogForm((prev) => ({ ...prev, author: value }))
                      }
                      placeholder="Ex: Admin"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Cover Image {editingBlogId ? "(optional)" : ""}
                      </label>
                      <input
                        ref={blogFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setBlogImageFile(file);
                        }}
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#0d5c46] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#094735]"
                      />
                      {blogImageFile && (
                        <p className="mt-2 text-xs text-[#5f7d74]">
                          Selected: {blogImageFile.name}
                        </p>
                      )}
                      {editingBlogId && !blogImageFile && (
                        <p className="mt-2 text-xs text-[#5f7d74]">
                          Leave empty to keep the current cover image.
                        </p>
                      )}
                    </div>

                    <RichTextEditor
                      label="Blog Description"
                      value={blogForm.description}
                      onChange={(value) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          description: value,
                        }))
                      }
                      placeholder="Write the full blog content here..."
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Status
                      </label>
                      <select
                        value={blogForm.status}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            status: e.target.value as "Published" | "Draft",
                          }))
                        }
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>

                    {blogError && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {blogError}
                      </div>
                    )}

                    {blogSuccess && (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {blogSuccess}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={blogSubmitting}
                        className="flex-1 rounded-2xl bg-[#0d5c46] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#094735] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {blogSubmitting
                          ? editingBlogId
                            ? "Updating..."
                            : "Saving..."
                          : editingBlogId
                          ? "Update Blog Post"
                          : "Save Blog Post"}
                      </button>

                      {editingBlogId && (
                        <button
                          type="button"
                          onClick={resetBlogForm}
                          className="rounded-2xl border border-[#d7e5df] bg-white px-5 py-4 text-sm font-semibold text-[#123128] transition hover:bg-[#f8fbfa]"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">All Blog Posts</h3>
                      <p className="text-sm text-[#5f7d74]">
                        Blog posts loaded from Supabase.
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 md:flex">
                      <Search className="h-4 w-4 text-[#5f7d74]" />
                      <input
                        placeholder="Search..."
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  {blogsLoading ? (
                    <p className="text-sm text-[#5f7d74]">Loading blogs...</p>
                  ) : blogs.length === 0 ? (
                    <p className="text-sm text-[#5f7d74]">No blog posts found.</p>
                  ) : (
                    <div className="space-y-4">
                      {blogs.map((item) => (
                        <div
                          key={item.id}
                          className="overflow-hidden rounded-3xl border border-[#edf3f0]"
                        >
                          <div className="grid md:grid-cols-[180px_1fr]">
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="h-52 w-full object-cover md:h-full"
                            />

                            <div className="p-5">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <h4 className="text-lg font-bold">{item.title}</h4>
                                  <p className="mt-1 text-sm text-[#5f7d74]">
                                    {item.category} • {item.author}
                                  </p>
                                  {item.slug && (
                                    <p className="mt-1 text-xs text-[#7a948b]">
                                      Slug: {item.slug}
                                    </p>
                                  )}
                                </div>

                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    item.status === "Published"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>

                              {item.description && (
                                <div
                                  className="mt-3 line-clamp-3 text-sm text-[#4f6b63]"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                />
                              )}

                              <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#34534a]">
                                <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                  <FileText className="h-4 w-4" />
                                  {item.category}
                                </span>
                                <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                  <User className="h-4 w-4" />
                                  {item.author}
                                </span>
                                <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                  <ImageIcon className="h-4 w-4" />
                                  Cover image
                                </span>
                              </div>

                              <div className="mt-5 flex flex-wrap gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleEditBlog(item)}
                                  className="rounded-2xl bg-[#0d5c46] px-4 py-2.5 text-sm font-semibold text-white"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(item)}
                                  disabled={blogDeletingId === item.id}
                                  className="rounded-2xl border border-[#d7e5df] bg-white px-4 py-2.5 text-sm font-semibold text-[#123128] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {blogDeletingId === item.id
                                    ? "Deleting..."
                                    : "Delete"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}