"use client";

import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  sub,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-[#dde9e3] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf7f3] text-[#0d5c46]">
        {icon}
      </div>
      <p className="text-sm text-[#5f7d74]">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      <p className="mt-2 text-sm text-[#7a948b]">{sub}</p>
    </div>
  );
}