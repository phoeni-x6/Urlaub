"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const travelOffers = [
  { name: "Beach Holidays", href: "/offers/beach-holidays" },
  { name: "Adventure Tours", href: "/offers/adventure-tours" },
  { name: "Family Packages", href: "/offers/family-packages" },
  { name: "Luxury Escapes", href: "/offers/luxury-escapes" },
];

const discoverSriLanka = [
  { name: "South Coast", href: "/discover/south-coast" },
  { name: "Hill Country", href: "/discover/hill-country" },
  { name: "Cultural Triangle", href: "/discover/cultural-triangle" },
  { name: "Wildlife Safaris", href: "/discover/wildlife-safaris" },
];

const travelInformation = [
  { name: "Visa Information", href: "/information/visa" },
  { name: "Transport Guide", href: "/information/transport" },
  { name: "Best Time to Visit", href: "/information/best-time" },
  { name: "Travel Tips", href: "/information/tips" },
];

type DropdownProps = {
  title: string;
  items: { name: string; href: string }[];
  pathname: string;
};

function DesktopDropdown({ title, items, pathname }: DropdownProps) {
  const isDropdownActive = items.some((item) => pathname === item.href);

  return (
    <div className="group relative">
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

      <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 translate-y-2 rounded-2xl border border-borderlight bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-textmain hover:bg-background hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type MobileDropdownProps = {
  title: string;
  items: { name: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  pathname: string;
};

function MobileDropdown({
  title,
  items,
  isOpen,
  onToggle,
  onLinkClick,
  pathname,
}: MobileDropdownProps) {
  const isDropdownActive = items.some((item) => pathname === item.href);

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
        <div className="border-t border-borderlight bg-background/50 p-2">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onLinkClick}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-textsecondary hover:bg-white hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
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

          <DesktopDropdown
            title="Travel Offers"
            items={travelOffers}
            pathname={pathname}
          />

          <DesktopDropdown
            title="Discover Sri Lanka"
            items={discoverSriLanka}
            pathname={pathname}
          />

          <Link href="/hotels" className={navLinkClass("/hotels")}>
            <span className="relative">
              Hotels
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  pathname === "/hotels" ? "w-full" : "w-0 hover:w-full"
                }`}
              />
            </span>
          </Link>

          <DesktopDropdown
            title="Travel Information"
            items={travelInformation}
            pathname={pathname}
          />

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

            <MobileDropdown
              title="Travel Offers"
              items={travelOffers}
              isOpen={openMobileDropdown === "offers"}
              onToggle={() => toggleMobileDropdown("offers")}
              onLinkClick={closeMobileMenu}
              pathname={pathname}
            />

            <MobileDropdown
              title="Discover Sri Lanka"
              items={discoverSriLanka}
              isOpen={openMobileDropdown === "discover"}
              onToggle={() => toggleMobileDropdown("discover")}
              onLinkClick={closeMobileMenu}
              pathname={pathname}
            />

            <Link
              href="/hotels"
              onClick={closeMobileMenu}
              className={mobileLinkClass("/hotels")}
            >
              Hotels
            </Link>

            <MobileDropdown
              title="Travel Information"
              items={travelInformation}
              isOpen={openMobileDropdown === "info"}
              onToggle={() => toggleMobileDropdown("info")}
              onLinkClick={closeMobileMenu}
              pathname={pathname}
            />

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
                pathname === "/book"
                  ? "bg-accent"
                  : "bg-primary"
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