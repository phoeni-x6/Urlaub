"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, MapPin, Package } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatCard from "@/components/admin/StatCard";
import { initialBlogs, initialTravelPackages } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("travel_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    }
  }, [router]);

  const totalPublishedPackages = initialTravelPackages.filter(
    (item) => item.status === "Published"
  ).length;

  const totalPublishedBlogs = initialBlogs.filter(
    (item) => item.status === "Published"
  ).length;

  return (
    <main className="min-h-screen bg-[#f4f8f6] text-[#123128]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <section className="flex-1">
          <AdminTopbar
            title="Admin Dashboard"
            subtitle="UI only admin panel for your travel website."
          />

          <div className="p-5 sm:p-8">
            <div className="space-y-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Packages"
                  value={initialTravelPackages.length.toString()}
                  sub="All package entries"
                  icon={<Package className="h-5 w-5" />}
                />
                <StatCard
                  title="Published Packages"
                  value={totalPublishedPackages.toString()}
                  sub="Visible on website"
                  icon={<MapPin className="h-5 w-5" />}
                />
                <StatCard
                  title="Total Blogs"
                  value={initialBlogs.length.toString()}
                  sub="All blog entries"
                  icon={<FileText className="h-5 w-5" />}
                />
                <StatCard
                  title="Published Blogs"
                  value={totalPublishedBlogs.toString()}
                  sub="Visible on website"
                  icon={<Calendar className="h-5 w-5" />}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Packages</h3>
                    <button
                      onClick={() => router.push("/admin/manage")}
                      className="text-sm font-semibold text-[#0d5c46]"
                    >
                      View all
                    </button>
                  </div>

                  <div className="space-y-4">
                    {initialTravelPackages.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-[#edf3f0] p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{item.title}</p>
                          <p className="text-sm text-[#5f7d74]">
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
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Blogs</h3>
                    <button
                      onClick={() => router.push("/admin/manage")}
                      className="text-sm font-semibold text-[#0d5c46]"
                    >
                      View all
                    </button>
                  </div>

                  <div className="space-y-4">
                    {initialBlogs.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-[#edf3f0] p-3"
                      >
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{item.title}</p>
                          <p className="text-sm text-[#5f7d74]">
                            {item.category}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}