"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ParallaxBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const maxShift = 60; // pixels of max parallax displacement

      // Offset is based on how far the section is from the viewport center.
      // This keeps the image centered over the section instead of sliding out of view.
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const progress = (sectionCenter - viewportCenter) / viewportCenter; // -1..1
      const clamped = Math.max(-1, Math.min(1, progress)) * maxShift;

      if (!ticking) {
        requestAnimationFrame(() => {
          setOffset(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[260px] overflow-hidden md:h-[300px]">
      
      {/* Parallax Image */}
      <div
        className="absolute inset-0 scale-110 will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src="/banner/parallax.jfif"
          alt="Sri Lanka tropical beach"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Island moments
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Discover Sri Lanka beyond the ordinary
          </h2>

          <p className="mt-4 text-sm text-white/85 md:text-base">
            Experience authentic culture, breathtaking landscapes, and
            unforgettable journeys across the island.
          </p>
        </div>
      </div>
    </section>
  );
}