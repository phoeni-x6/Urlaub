import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tbfhfaqgkokchjihmvgg.supabase.co",
      },
    ],
  },
};

export default nextConfig; 