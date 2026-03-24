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
  packageCategoryOptions,
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

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

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

type ItineraryDayForm = {
  day: number;
  title: string;
  itemsText: string;
};

const createEmptyPackageForm = () => ({
  category: "round-tours",
  title: "",
  slug: "",
  subtitle: "",
  shortDescription: "",
  longDescription: "",
  overviewTitle: "",
  location: "",
  route: "",
  routeSummary: "",
  duration: "",
  price: "",
  image: "",
  heroImage: "",
  mapImage: "",
  galleryImagesText: "",
  travelStyle: "",
  guideInfo: "",
  accommodation: "",
  meals: "",
  flightInfo: "",
  roomType: "",
  highlights: "",
  upgradeNote: "",
  includedExperiencesText: "",
  status: "Draft" as "Published" | "Draft",
});

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

  const [packageForm, setPackageForm] = useState(createEmptyPackageForm());
  const [packageSuccess, setPackageSuccess] = useState("");
  const [packageError, setPackageError] = useState("");
  const [editingPackageId, setEditingPackageId] = useState<number | null>(null);

  const [itineraryDays, setItineraryDays] = useState<ItineraryDayForm[]>([
    {
      day: 1,
      title: "",
      itemsText: "",
    },
  ]);

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

  const resetPackageForm = () => {
    setPackageForm(createEmptyPackageForm());
    setItineraryDays([
      {
        day: 1,
        title: "",
        itemsText: "",
      },
    ]);
    setEditingPackageId(null);
    setPackageError("");
    setPackageSuccess("");
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

  const parseLines = (text: string) =>
    text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleAddItineraryDay = () => {
    setItineraryDays((prev) => [
      ...prev,
      {
        day: prev.length + 1,
        title: "",
        itemsText: "",
      },
    ]);
  };

  const handleRemoveItineraryDay = (dayNumber: number) => {
    const filtered = itineraryDays.filter((item) => item.day !== dayNumber);
    const resequenced = filtered.map((item, index) => ({
      ...item,
      day: index + 1,
    }));
    setItineraryDays(
      resequenced.length > 0
        ? resequenced
        : [{ day: 1, title: "", itemsText: "" }]
    );
  };

  const handleItineraryChange = (
    dayNumber: number,
    key: "title" | "itemsText",
    value: string
  ) => {
    setItineraryDays((prev) =>
      prev.map((item) =>
        item.day === dayNumber ? { ...item, [key]: value } : item
      )
    );
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    setPackageError("");
    setPackageSuccess("");

    if (!packageForm.title.trim()) {
      setPackageError("Package title is required.");
      return;
    }

    if (!packageForm.category.trim()) {
      setPackageError("Package category is required.");
      return;
    }

    if (!packageForm.price.trim()) {
      setPackageError("Package price is required.");
      return;
    }

    const finalSlug = packageForm.slug.trim()
      ? createSlug(packageForm.slug)
      : createSlug(packageForm.title);

    const parsedGalleryImages = parseLines(packageForm.galleryImagesText);
    const parsedIncludedExperiences = parseLines(
      packageForm.includedExperiencesText
    );
    const parsedItinerary = itineraryDays
      .filter(
        (item) => item.title.trim() || item.itemsText.trim()
      )
      .map((item) => ({
        day: item.day,
        title: item.title.trim() || `Day ${item.day}`,
        items: parseLines(item.itemsText),
      }));

    const newPackage: TravelPackage = {
      id: editingPackageId || Date.now(),
      category: packageForm.category,
      title: packageForm.title.trim(),
      slug: finalSlug,
      subtitle: packageForm.subtitle.trim(),
      shortDescription: packageForm.shortDescription.trim(),
      longDescription: packageForm.longDescription.trim(),
      overviewTitle: packageForm.overviewTitle.trim(),
      location: packageForm.location.trim(),
      route: packageForm.route.trim(),
      routeSummary: packageForm.routeSummary.trim(),
      duration: packageForm.duration.trim() || "Custom Duration",
      price: packageForm.price.trim(),
      image: packageForm.image.trim() || "/packages/adventure.jfif",
      heroImage:
        packageForm.heroImage.trim() ||
        packageForm.image.trim() ||
        "/packages/adventure.jfif",
      mapImage: packageForm.mapImage.trim() || "/packages/maptest1.png",
      galleryImages:
        parsedGalleryImages.length > 0
          ? parsedGalleryImages
          : [packageForm.image.trim() || "/packages/adventure.jfif"],
      travelStyle: packageForm.travelStyle.trim(),
      guideInfo: packageForm.guideInfo.trim(),
      accommodation: packageForm.accommodation.trim(),
      meals: packageForm.meals.trim(),
      flightInfo: packageForm.flightInfo.trim(),
      roomType: packageForm.roomType.trim(),
      highlights: packageForm.highlights.trim(),
      upgradeNote: packageForm.upgradeNote.trim(),
      includedExperiences: parsedIncludedExperiences,
      itinerary: parsedItinerary,
      status: packageForm.status,
    };

    if (editingPackageId) {
      setTravelPackages((prev) =>
        prev.map((item) => (item.id === editingPackageId ? newPackage : item))
      );
      setPackageSuccess("Package updated successfully.");
    } else {
      setTravelPackages((prev) => [newPackage, ...prev]);
      setPackageSuccess("Package added successfully.");
    }

    resetPackageForm();
  };

  const handleEditPackage = (pkg: TravelPackage) => {
    setPackageError("");
    setPackageSuccess("");
    setEditingPackageId(pkg.id);

    setPackageForm({
      category: pkg.category || "round-tours",
      title: pkg.title || "",
      slug: pkg.slug || "",
      subtitle: pkg.subtitle || "",
      shortDescription: pkg.shortDescription || "",
      longDescription: pkg.longDescription || "",
      overviewTitle: pkg.overviewTitle || "",
      location: pkg.location || "",
      route: pkg.route || "",
      routeSummary: pkg.routeSummary || "",
      duration: pkg.duration || "",
      price: pkg.price || "",
      image: pkg.image || "",
      heroImage: pkg.heroImage || "",
      mapImage: pkg.mapImage || "",
      galleryImagesText: pkg.galleryImages?.join("\n") || "",
      travelStyle: pkg.travelStyle || "",
      guideInfo: pkg.guideInfo || "",
      accommodation: pkg.accommodation || "",
      meals: pkg.meals || "",
      flightInfo: pkg.flightInfo || "",
      roomType: pkg.roomType || "",
      highlights: pkg.highlights || "",
      upgradeNote: pkg.upgradeNote || "",
      includedExperiencesText: pkg.includedExperiences?.join("\n") || "",
      status: pkg.status || "Draft",
    });

    setItineraryDays(
      pkg.itinerary && pkg.itinerary.length > 0
        ? pkg.itinerary.map((day, index) => ({
            day: index + 1,
            title: day.title || "",
            itemsText: day.items?.join("\n") || "",
          }))
        : [{ day: 1, title: "", itemsText: "" }]
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePackage = (packageId: number) => {
    const selected = travelPackages.find((item) => item.id === packageId);
    if (!selected) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selected.title}"?`
    );

    if (!confirmed) return;

    setTravelPackages((prev) => prev.filter((item) => item.id !== packageId));

    if (editingPackageId === packageId) {
      resetPackageForm();
    }

    setPackageSuccess("Package deleted successfully.");
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
            subtitle="Create package details for slug pages and manage blog content."
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
                      <h3 className="text-lg font-bold">
                        {editingPackageId ? "Edit Travel Package" : "Add Travel Package"}
                      </h3>
                      <p className="text-sm text-[#5f7d74]">
                        Add all details needed for the package slug page.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAddPackage} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Package Category
                      </label>
                      <select
                        value={packageForm.category}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      >
                        {packageCategoryOptions.map((category) => (
                          <option key={category.slug} value={category.slug}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <InputField
                      label="Package Title"
                      value={packageForm.title}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, title: value }))
                      }
                      placeholder="Ex: Luxury South Coast Escape"
                    />

                    <InputField
                      label="Package Slug (optional)"
                      value={packageForm.slug}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, slug: value }))
                      }
                      placeholder="Ex: luxury-south-coast-escape"
                    />

                    <InputField
                      label="Subtitle"
                      value={packageForm.subtitle}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, subtitle: value }))
                      }
                      placeholder="Short subtitle for the hero section"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Short Description
                      </label>
                      <textarea
                        rows={4}
                        value={packageForm.shortDescription}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            shortDescription: e.target.value,
                          }))
                        }
                        placeholder="Short package description..."
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Long Description
                      </label>
                      <textarea
                        rows={6}
                        value={packageForm.longDescription}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            longDescription: e.target.value,
                          }))
                        }
                        placeholder="Full overview description..."
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <InputField
                      label="Overview Title"
                      value={packageForm.overviewTitle}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          overviewTitle: value,
                        }))
                      }
                      placeholder="Ex: A premium island journey blending culture, coast, and comfort"
                    />

                    <InputField
                      label="Location"
                      value={packageForm.location}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, location: value }))
                      }
                      placeholder="Ex: Colombo / Kandy / Ella / Galle"
                    />

                    <InputField
                      label="Route"
                      value={packageForm.route}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, route: value }))
                      }
                      placeholder="Detailed route"
                    />

                    <InputField
                      label="Route Summary"
                      value={packageForm.routeSummary}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          routeSummary: value,
                        }))
                      }
                      placeholder="Short route summary"
                    />

                    <InputField
                      label="Duration"
                      value={packageForm.duration}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, duration: value }))
                      }
                      placeholder="Ex: 7 Days / 6 Nights"
                    />

                    <InputField
                      label="Price"
                      value={packageForm.price}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, price: value }))
                      }
                      placeholder="Ex: $950"
                    />

                    <InputField
                      label="Card Image URL"
                      value={packageForm.image}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, image: value }))
                      }
                      placeholder="Package card image"
                    />

                    <InputField
                      label="Hero Image URL"
                      value={packageForm.heroImage}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          heroImage: value,
                        }))
                      }
                      placeholder="Hero section image"
                    />

                    <InputField
                      label="Map Image URL"
                      value={packageForm.mapImage}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          mapImage: value,
                        }))
                      }
                      placeholder="Route map image"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Gallery Images
                      </label>
                      <textarea
                        rows={5}
                        value={packageForm.galleryImagesText}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            galleryImagesText: e.target.value,
                          }))
                        }
                        placeholder={`Paste one image URL per line`}
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <InputField
                      label="Travel Style"
                      value={packageForm.travelStyle}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          travelStyle: value,
                        }))
                      }
                      placeholder="Ex: Private / Small Group"
                    />

                    <InputField
                      label="Guide Info"
                      value={packageForm.guideInfo}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          guideInfo: value,
                        }))
                      }
                      placeholder="Ex: English / German Guide Included"
                    />

                    <InputField
                      label="Accommodation"
                      value={packageForm.accommodation}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          accommodation: value,
                        }))
                      }
                      placeholder="Ex: Boutique Hotels & 4-Star Stays"
                    />

                    <InputField
                      label="Meals"
                      value={packageForm.meals}
                      onChange={(value) =>
                        setPackageForm((prev) => ({ ...prev, meals: value }))
                      }
                      placeholder="Ex: Breakfast & Dinner"
                    />

                    <InputField
                      label="Flight Info"
                      value={packageForm.flightInfo}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          flightInfo: value,
                        }))
                      }
                      placeholder="Ex: International Flights Not Included"
                    />

                    <InputField
                      label="Room Type"
                      value={packageForm.roomType}
                      onChange={(value) =>
                        setPackageForm((prev) => ({
                          ...prev,
                          roomType: value,
                        }))
                      }
                      placeholder="Ex: Double / Twin Room"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Highlights
                      </label>
                      <textarea
                        rows={4}
                        value={packageForm.highlights}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            highlights: e.target.value,
                          }))
                        }
                        placeholder="Package highlights..."
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Upgrade Note
                      </label>
                      <textarea
                        rows={3}
                        value={packageForm.upgradeNote}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            upgradeNote: e.target.value,
                          }))
                        }
                        placeholder="Optional pricing or upgrade note..."
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Included Experiences
                      </label>
                      <textarea
                        rows={6}
                        value={packageForm.includedExperiencesText}
                        onChange={(e) =>
                          setPackageForm((prev) => ({
                            ...prev,
                            includedExperiencesText: e.target.value,
                          }))
                        }
                        placeholder={`Add one included experience per line`}
                        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                      />
                    </div>

                    <div className="rounded-[24px] border border-[#d7e5df] bg-[#f8fbfa] p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <h4 className="font-semibold">Itinerary Days</h4>
                          <p className="text-sm text-[#5f7d74]">
                            Add each day with title and bullet points.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddItineraryDay}
                          className="rounded-2xl bg-[#0d5c46] px-4 py-2 text-sm font-semibold text-white"
                        >
                          Add Day
                        </button>
                      </div>

                      <div className="space-y-4">
                        {itineraryDays.map((day) => (
                          <div
                            key={day.day}
                            className="rounded-2xl border border-[#d7e5df] bg-white p-4"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <h5 className="font-semibold">Day {day.day}</h5>

                              {itineraryDays.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItineraryDay(day.day)}
                                  className="text-sm font-semibold text-red-600"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="space-y-3">
                              <InputField
                                label="Day Title"
                                value={day.title}
                                onChange={(value) =>
                                  handleItineraryChange(day.day, "title", value)
                                }
                                placeholder={`Ex: Arrival in Colombo`}
                              />

                              <div>
                                <label className="mb-2 block text-sm font-medium">
                                  Day Items
                                </label>
                                <textarea
                                  rows={5}
                                  value={day.itemsText}
                                  onChange={(e) =>
                                    handleItineraryChange(
                                      day.day,
                                      "itemsText",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Add one activity per line"
                                  className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

                    {packageError && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {packageError}
                      </div>
                    )}

                    {packageSuccess && (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {packageSuccess}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="flex-1 rounded-2xl bg-[#0d5c46] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#094735]"
                      >
                        {editingPackageId ? "Update Package" : "Save Package"}
                      </button>

                      {editingPackageId && (
                        <button
                          type="button"
                          onClick={resetPackageForm}
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
                      <h3 className="text-lg font-bold">All Travel Packages</h3>
                      <p className="text-sm text-[#5f7d74]">
                        Preview of package cards and slug-ready package data.
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
                                <p className="mt-1 text-xs text-[#7a948b]">
                                  Category: {item.category} • Slug: {item.slug}
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

                            {item.shortDescription && (
                              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4f6b63]">
                                {item.shortDescription}
                              </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#34534a]">
                              <span className="flex items-center gap-2 rounded-full bg-[#f3f8f6] px-3 py-2">
                                <MapPin className="h-4 w-4" />
                                {item.location || "Sri Lanka"}
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
                              <button
                                type="button"
                                onClick={() => handleEditPackage(item)}
                                className="rounded-2xl bg-[#0d5c46] px-4 py-2.5 text-sm font-semibold text-white"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePackage(item.id)}
                                className="rounded-2xl border border-[#d7e5df] bg-white px-4 py-2.5 text-sm font-semibold text-[#123128]"
                              >
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
                                <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-[#4f6b63]">
                                  {stripHtml(item.description)}
                                </p>
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