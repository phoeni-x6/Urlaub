"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

const waysToTravel = [
  {
    title: "Round Tours",
    href: "/packages/roundtours",
  },
  {
    title: "Retreat Tours",
    href: "/packages/retreat-tours",
  },
  {
    title: "Customize Your Own Trip",
    href: "/packages/customize-your-own-trip",
  },
  {
    title: "Beach Holiday",
    href: "/packages/beach-holiday",
  },
  {
    title: "Long Stay",
    href: "/packages/long-stay",
  },
  {
    title: "Seasonal Travelling",
    href: "/packages/seasonal-travelling",
  },
];

type TravelGroup = {
  title: string;
  href: string;
};

type MegaDropdownProps = {
  title: string;
  groups: TravelGroup[];
  pathname: string;
};

const isGroupPathActive = (pathname: string, href: string) => {
  return pathname === href || pathname.startsWith(`${href}/`);
};

function DesktopMegaDropdown({
  title,
  groups,
  pathname,
}: MegaDropdownProps) {
  const matchedGroup = useMemo(
    () => groups.find((group) => isGroupPathActive(pathname, group.href)),
    [groups, pathname]
  );

  const [hoveredGroup, setHoveredGroup] = useState<TravelGroup>(groups[0]);

  const activeGroup = matchedGroup ?? hoveredGroup;

  const isDropdownActive =
    pathname.startsWith("/packages") ||
    groups.some((group) => isGroupPathActive(pathname, group.href));

  return (
    <div
      className="group relative"
      onMouseEnter={() => {
        if (!matchedGroup) setHoveredGroup(groups[0]);
      }}
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium transition ${
          isDropdownActive
            ? "text-primary"
            : "text-textmain hover:text-accent"
        }`}
      >
        <span className="relative">
          {title}
          <span
            className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
              isDropdownActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </span>

        <ChevronDown
          className={`h-4 w-4 transition group-hover:rotate-180 ${
            isDropdownActive ? "text-primary" : ""
          }`}
        />
      </button>

      <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[820px] -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="overflow-hidden rounded-[28px] border border-borderlight bg-white shadow-2xl">
          <div className="grid min-h-[400px] grid-cols-[260px_1fr]">
            <div className="border-r border-borderlight bg-[#faf8f5] p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-textsecondary">
                Explore Sri Lanka
              </p>

              <div className="space-y-2">
                {groups.map((group) => {
                  const isActive = isGroupPathActive(pathname, group.href);
                  const isPreviewActive = activeGroup.title === group.title;

                  return (
                    <Link
                      key={group.title}
                      href={group.href}
                      onMouseEnter={() => setHoveredGroup(group)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        isActive || isPreviewActive
                          ? "bg-white text-primary shadow-sm"
                          : "text-textmain hover:bg-white hover:text-primary"
                      }`}
                    >
                      <span>{group.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-between p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textsecondary">
                  Ways to travel
                </p>

                <Link
                  href={activeGroup.href}
                  className="mt-2 inline-block text-3xl font-bold text-textmain transition hover:text-primary"
                >
                  {activeGroup.title}
                </Link>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-textsecondary">
                  Discover thoughtfully designed Sri Lanka experiences built
                  around your travel style, pace, and interests.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={activeGroup.href}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  View {activeGroup.title} Packages
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MobileMegaDropdownProps = {
  title: string;
  groups: TravelGroup[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  pathname: string;
};

function MobileMegaDropdown({
  title,
  groups,
  isOpen,
  onToggle,
  onLinkClick,
  pathname,
}: MobileMegaDropdownProps) {
  const matchedGroup = useMemo(
    () => groups.find((group) => isGroupPathActive(pathname, group.href)),
    [groups, pathname]
  );

  const [openGroup, setOpenGroup] = useState<string | null>(
    matchedGroup?.title ?? groups[0].title
  );

  const isDropdownActive =
    pathname.startsWith("/packages") ||
    groups.some((group) => isGroupPathActive(pathname, group.href));

  return (
    <div
      className={`rounded-xl border ${
        isDropdownActive
          ? "border-primary bg-primary/5"
          : "border-borderlight"
      }`}
    >
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
          isDropdownActive ? "text-primary" : "text-textmain"
        }`}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""} ${
            isDropdownActive ? "text-primary" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-borderlight bg-background/40 p-3">
          <div className="mb-3 rounded-xl bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textsecondary">
              Explore Sri Lanka
            </p>
          </div>

          <div className="space-y-2">
            {groups.map((group) => {
              const groupActive = isGroupPathActive(pathname, group.href);
              const groupOpen =
                openGroup === group.title || matchedGroup?.title === group.title;

              return (
                <div
                  key={group.title}
                  className={`overflow-hidden rounded-xl border ${
                    groupActive
                      ? "border-primary bg-white"
                      : "border-borderlight bg-white"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenGroup((prev) =>
                        prev === group.title ? null : group.title
                      )
                    }
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold ${
                      groupActive ? "text-primary" : "text-textmain"
                    }`}
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        groupOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {groupOpen && (
                    <div className="border-t border-borderlight px-3 py-3">
                      <Link
                        href={group.href}
                        onClick={onLinkClick}
                        className="block rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white"
                      >
                        View {group.title} Packages
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/packages"
            onClick={onLinkClick}
            className="mt-3 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
          >
            View All Packages
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const navLinkClass = (href: string) =>
    `relative text-sm font-medium transition ${
      pathname === href
        ? "text-primary"
        : "text-textmain hover:text-accent"
    }`;

  const mobileLinkClass = (href: string) =>
    `rounded-xl border px-4 py-3 text-sm font-medium transition ${
      pathname === href
        ? "border-primary bg-primary text-white"
        : "border-borderlight text-textmain"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="TravelLanka Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              pathname === "/"
                ? "bg-primary text-white"
                : "bg-accent text-white hover:bg-accent-dark"
            }`}
          >
            Homepage
          </Link>

          <DesktopMegaDropdown
            title="Ways to travel"
            groups={waysToTravel}
            pathname={pathname}
          />

          <Link href="/discover" className={navLinkClass("/discover")}>
            <span className="relative">
              Discover Sri Lanka
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/discover" ? "w-full" : "w-0"
                }`}
              />
            </span>
          </Link>

          <Link href="/hotels" className={navLinkClass("/hotels")}>
            <span className="relative">
              Hotels
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/hotels" ? "w-full" : "w-0"
                }`}
              />
            </span>
          </Link>

          <Link href="/information" className={navLinkClass("/information")}>
            <span className="relative">
              Travel Information
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/information" ? "w-full" : "w-0"
                }`}
              />
            </span>
          </Link>

          <Link href="/about" className={navLinkClass("/about")}>
            <span className="relative">
              About Us
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/about" ? "w-full" : "w-0"
                }`}
              />
            </span>
          </Link>

          <Link href="/contact" className={navLinkClass("/contact")}>
            <span className="relative">
              Contact
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/contact" ? "w-full" : "w-0"
                }`}
              />
            </span>
          </Link>
        </div>

        <div className="hidden lg:block">
          <Link
            href="/book"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition ${
              pathname === "/book"
                ? "bg-accent"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            Plan Your Trip
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-borderlight bg-white text-primary lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-borderlight bg-white px-6 py-5 lg:hidden">
          <div className="mb-4 flex items-center gap-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <Image
                src="/logo.png"
                alt="Urlaub Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
            <div>
              <p className="text-base font-bold text-primary">Urlaub</p>
              <p className="text-xs text-textsecondary">
                Island journeys reimagined
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                pathname === "/"
                  ? "bg-primary text-white"
                  : "bg-accent text-white"
              }`}
            >
              Homepage
            </Link>

            <MobileMegaDropdown
              title="Ways to travel"
              groups={waysToTravel}
              isOpen={openMobileDropdown === "ways-to-travel"}
              onToggle={() => toggleMobileDropdown("ways-to-travel")}
              onLinkClick={closeMobileMenu}
              pathname={pathname}
            />

            <Link
              href="/discover"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/discover")}
            >
              Discover Sri Lanka
            </Link>

            <Link
              href="/hotels"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/hotels")}
            >
              Hotels
            </Link>

            <Link
              href="/information"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/information")}
            >
              Travel Information
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/about")}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/contact")}
            >
              Contact
            </Link>

            <Link
              href="/book"
              onClick={closeMobileMenu}
              className={`mt-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white transition ${
                pathname === "/book" ? "bg-accent" : "bg-primary"
              }`}
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 