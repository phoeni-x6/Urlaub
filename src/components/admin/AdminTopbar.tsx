"use client";

import Link from "next/link";

type AdminTopbarProps = {
  title: string;
  subtitle: string;
};

export default function AdminTopbar({
  title,
  subtitle,
}: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#dde9e3] bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-[#5f7d74]">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/manage"
            className="rounded-2xl bg-[#0d5c46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#094735]"
          >
            Add Package
          </Link>
          <Link
            href="/admin/manage"
            className="rounded-2xl border border-[#d6e6df] bg-white px-4 py-3 text-sm font-semibold text-[#123128] transition hover:bg-[#f8fbfa]"
          >
            Add Blog
          </Link>
        </div>
      </div>
    </header>
  );
}