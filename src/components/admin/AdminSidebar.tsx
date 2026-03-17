"use client";

import Link from "next/link";
import { LayoutDashboard, Package, FileText, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function SidebarButton({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-white text-[#0f3d2e]"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("travel_admin_logged_in");
    router.push("/admin");
  };

  return (
    <aside className="hidden w-72 flex-col border-r border-[#dde9e3] bg-[#0f3d2e] p-6 text-white lg:flex">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Travel Admin
        </p>
        <h2 className="mt-3 text-2xl font-bold">Dashboard Panel</h2>
      </div>

      <nav className="mt-10 space-y-2">
        <SidebarButton
          href="/admin/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard className="h-5 w-5" />}
          active={pathname === "/admin/dashboard"}
        />
        <SidebarButton
          href="/admin/manage"
          label="Travel Packages"
          icon={<Package className="h-5 w-5" />}
          active={pathname === "/admin/manage"}
        />
        <SidebarButton
          href="/admin/manage"
          label="Blogs"
          icon={<FileText className="h-5 w-5" />}
          active={pathname === "/admin/manage"}
        />
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}