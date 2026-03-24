"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import {
  CalendarDays,
  MapPinned,
  BedDouble,
  UtensilsCrossed,
  Plane,
  BadgeCheck,
  ChevronDown,
  Sparkles,
  Camera,
  Waves,
  Mountain,
  Trees,
  ArrowRight,
} from "lucide-react";

const packageData = {
  title: "Best of Sri Lanka – Custom Tour",
  subtitle: "All-Inclusive Tickets | Half-Board | Hotel-Only Stay",
  duration: "15 Days",
  route:
    "Negombo → Anuradhapura → Polonnaruwa → Dambulla → Sigiriya → Matale → Nuwara Eliya → Ella → Yala → Bentota → Colombo",
  accommodation: "3–4 star hotels and boutique stays",
  meals: "Half-board (Breakfast & Dinner)",
  travelStyle: "Private or Small Group",
  highlights:
    "Cultural sites, scenic train ride, safari, boat tour, cooking experience, and extended beach stay",
  flightInfo: "Not included in Price",
  guideInfo: "German-speaking tour guide included",
  price: "2250 EURO",
  minimumPax: "Minimum 2 Pax",
  roomType: "Double Room or Twin Room",
  upgradeNote:
    "Please note that if you request a Single Room / Deluxe Room / Suite Room / Upgrade Hotel, prices will increase.",
};

const galleryImages = [
  "/packages/srilanka1.jpg",
  "/packages/srilanka2.jpg",
  "/packages/srilanka3.jpg",
  "/packages/srilanka4.jpg",
  "/packages/srilanka5.jpg",
  "/packages/srilanka6.jpg",
];

const itinerary = [
  {
    day: 1,
    title: "Arrival in Negombo",
    items: [
      "Airport pickup and transfer to hotel",
      "Leisure time or beach walk",
      "Dinner at the hotel",
    ],
  },
  {
    day: 2,
    title: "Negombo to Anuradhapura",
    items: [
      "Drive to Anuradhapura",
      "Included visits: Sri Maha Bodhi, Ruwanwelisaya, Twin Ponds",
      "Stay in heritage-style hotel",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 3,
    title: "Mihintale Visit and Relaxation",
    items: [
      "Visit to Mihintale, a key Buddhist pilgrimage site",
      "Optional cycling or relaxation at hotel",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 4,
    title: "Anuradhapura to Polonnaruwa",
    items: [
      "Transfer to Polonnaruwa",
      "Stay at a lakeside hotel",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 5,
    title: "Polonnaruwa to Dambulla and Sigiriya",
    items: [
      "Included visit: Dambulla Cave Temple",
      "Transfer to Sigiriya",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 6,
    title: "Sigiriya to Matale",
    items: [
      "Included visit: Sigiriya Rock Fortress (early morning climb)",
      "Drive to Matale and check into a boutique spice garden villa",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 7,
    title: "Matale to Nuwara Eliya (via Kandy)",
    items: [
      "Stop in Kandy to visit Temple of the Tooth (Dalada Maligawa)",
      "Visit Gem Museum",
      "Continue to Nuwara Eliya",
      "Stay at a colonial-style hotel",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 8,
    title: "Nuwara Eliya Exploration",
    items: [
      "Free day to explore Gregory Lake, Hakgala Botanical Garden, or tea plantations",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 9,
    title: "Train Ride to Ella, then Drive to Yala",
    items: [
      "Scenic train journey from Nanu Oya to Ella (reserved seats)",
      "Pickup at Ella and continue to Yala",
      "Stay in a safari hotel or eco-lodge",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 10,
    title: "Yala Safari and Transfer to Bentota",
    items: [
      "Morning jeep safari in Yala National Park",
      "Scenic drive to the southwest coast",
      "Stay at beachfront hotel in Bentota",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 11,
    title: "Bentota Beach Stay",
    items: [
      "Relax by the beach",
      "Enjoy hotel leisure facilities",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 12,
    title: "Bentota Experiences",
    items: [
      "Turtle hatchery visit in Bentota",
      "Boat tour in Bentota",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 13,
    title: "Cooking & Wellness Experience",
    items: [
      "Sri Lankan cooking class in Bentota",
      "1 Free Ayurvedic Head Massage (Shiro Abhyanga)",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 14,
    title: "Leisure by the Coast",
    items: [
      "Relaxation day at the beach",
      "Optional personal activities",
      "Breakfast & Dinner included",
    ],
  },
  {
    day: 15,
    title: "Transfer to Colombo / Departure",
    items: [
      "Drive to Colombo or airport depending on departure plan",
      "End of tour services",
    ],
  },
];

const includedExperiences = [
  "Anuradhapura Sacred City",
  "Mihintale",
  "Polonnaruwa Ruins",
  "Dambulla Cave Temple",
  "Sigiriya Rock Fortress",
  "Temple of the Tooth",
  "Gem Museum",
  "Train ride from Nanu Oya to Ella (reserved seats)",
  "Yala National Park jeep safari",
  "Turtle hatchery visit in Bentota",
  "Boat tour in Bentota",
  "Sri Lankan cooking class in Bentota",
  "1 Free Ayurvedic Head Massage (Shiro Abhyanga)",
  "Airport transfers",
  "Bottled water on travel days",
];

function ItineraryAccordion() {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      {itinerary.map((day) => {
        const isOpen = openDay === day.day;

        return (
          <div
            key={day.day}
            className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenDay(isOpen ? null : day.day)}
              className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-gray-50 md:px-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#0F766E]/20 bg-[#0F766E]/10 text-[#0F766E]">
                  <span className="text-sm font-bold">Day {day.day}</span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                    {day.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to view the experiences of this day
                  </p>
                </div>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="h-5 w-5 text-[#F59E0B]" />
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-gray-200 px-5 py-5 md:px-6">
                  <ul className="space-y-3">
                    {day.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-7 text-gray-700"
                      >
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F59E0B]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
        <Icon className="h-5 w-5 text-[#0F766E]" />
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="mt-1 font-semibold text-gray-900">{value}</h3>
    </div>
  );
}

export default function BestOfSriLankaPackagePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/packages/hero-srilanka.jpg"
            alt="Best of Sri Lanka package"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/75 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.14),transparent_35%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-36">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0F766E]/20 bg-white/80 px-4 py-2 text-sm text-[#0F766E] backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#F59E0B]" />
              Signature Sri Lanka Experience
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              {packageData.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
              {packageData.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-gray-200 bg-white/90 px-5 py-3 text-sm text-gray-700 backdrop-blur-md">
                Private / Small Group
              </span>
              <span className="rounded-full border border-[#0F766E]/20 bg-[#0F766E]/10 px-5 py-3 text-sm text-[#0F766E] backdrop-blur-md">
                German-speaking Guide
              </span>
              <span className="rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/10 px-5 py-3 text-sm text-[#B45309] backdrop-blur-md">
                Culture + Hills + Safari + Beach
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#0F766E] px-7 py-3.5 font-semibold text-white transition hover:bg-[#0c625b]">
                Request This Tour
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="rounded-full border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50">
                Customize Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <InfoCard
            icon={CalendarDays}
            label="Duration"
            value={packageData.duration}
          />
          <InfoCard icon={MapPinned} label="Route" value="11 Destinations" />
          <InfoCard
            icon={BedDouble}
            label="Stay"
            value="3–4 Star & Boutique"
          />
          <InfoCard
            icon={UtensilsCrossed}
            label="Meals"
            value="Half-board"
          />
          <InfoCard icon={Plane} label="Flight" value="Not Included" />
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
            
          </p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            The visual mood of the package
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            Use destination photography here to help the client immediately feel
            the atmosphere of the experience — heritage, train journeys,
            wildlife, beach stays, and premium boutique moments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <div className="relative h-80 overflow-hidden rounded-[32px] border border-gray-200 md:col-span-5">
            <Image
              src={galleryImages[0]}
              alt="Sri Lanka gallery image 1"
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {galleryImages.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="relative min-h-[185px] overflow-hidden rounded-[28px] border border-gray-200"
              >
                <Image
                  src={img}
                  alt={`Sri Lanka gallery image ${index + 2}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Tour Overview
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              A premium island journey blending heritage, nature, luxury, and
              coastal relaxation
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600">
              This 15-day curated Sri Lanka package is designed to showcase the
              island’s most iconic cultural destinations, dramatic landscapes,
              scenic rail experiences, wildlife encounters, and a restorative
              beach stay. The layout below is crafted as a polished client-facing
              presentation before the admin backend is built.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Route</p>
                <p className="mt-2 leading-7 text-gray-700">{packageData.route}</p>
              </div>

              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Accommodation</p>
                <p className="mt-2 leading-7 text-gray-700">
                  {packageData.accommodation}
                </p>
              </div>

              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Meals</p>
                <p className="mt-2 leading-7 text-gray-700">
                  {packageData.meals}
                </p>
              </div>

              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Travel Style</p>
                <p className="mt-2 leading-7 text-gray-700">
                  {packageData.travelStyle}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#B45309]">
                <BadgeCheck className="h-4 w-4 text-[#F59E0B]" />
                Highlights
              </p>
              <p className="mt-3 leading-7 text-gray-700">
                {packageData.highlights}
              </p>
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Why clients will love it
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: Mountain,
                  title: "Scenic hill country",
                  text: "A refined route through tea landscapes, cool climates, and one of the world’s most beautiful train rides.",
                },
                {
                  icon: Trees,
                  title: "Wildlife and nature",
                  text: "Yala safari moments, eco-lodge atmosphere, and a strong contrast to the cultural circuit.",
                },
                {
                  icon: Waves,
                  title: "Beach and wellness ending",
                  text: "Bentota brings the package to a relaxed close with sea views, local activities, and wellness touches.",
                },
                {
                  icon: Camera,
                  title: "High-end package presentation",
                  text: "A polished travel product layout that already feels close to final before backend integration.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-[24px] border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
                    <item.icon className="h-5 w-5 text-[#0F766E]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAP + ITINERARY */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Route Map
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              The island route at a glance
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Add your Sri Lanka route map image here. This can be an illustrated
              branded map, a dotted destination route, or a custom travel
              graphic.
            </p>

            <div className="relative mt-6 h-[540px] overflow-hidden rounded-[28px] border border-gray-200 bg-gray-100">
              <Image
                src="/packages/maptest1.png"
                alt="Sri Lanka route map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Itinerary
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Day-by-day journey
            </h2>
            <p className="mt-3 mb-8 text-sm leading-7 text-gray-600">
              The itinerary is presented as a clean dropdown layout so the client
              can browse each day without scrolling through one long block of
              text.
            </p>

            <ItineraryAccordion />
          </div>
        </div>
      </section>

     
      {/* INCLUDED EXPERIENCES */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
            Included Experiences
          </p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What is included in the package
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {includedExperiences.map((item, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 ring-1 ring-[#0F766E]/15">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                  </div>
                  <p className="text-sm leading-7 text-gray-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Clear package pricing with a premium presentation
            </h2>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-5xl font-bold text-gray-900 md:text-6xl">
                {packageData.price}
              </span>
              <span className="pb-2 text-gray-500">per person</span>
            </div>

            <p className="mt-4 text-gray-600">{packageData.minimumPax}</p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Room Type</p>
                <p className="mt-2 text-gray-700">{packageData.roomType}</p>
              </div>

              <div className="rounded-[24px] border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Guide Included</p>
                <p className="mt-2 text-gray-700">{packageData.guideInfo}</p>
              </div>

              <div className="rounded-[24px] border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5">
                <p className="text-sm font-semibold text-[#B45309]">
                  Important Note
                </p>
                <p className="mt-2 text-sm leading-7 text-gray-700">
                  {packageData.upgradeNote}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-gradient-to-br from-[#0F766E]/10 via-white to-[#F59E0B]/10 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
              Client Call To Action
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Present this package concept with confidence
            </h2>

            <p className="mt-4 text-sm leading-8 text-gray-600">
              This page is designed as a strong visual prototype for your travel
              package system. It already communicates quality, structure, and
              brand tone before any backend functionality is connected.
            </p>

            <div className="mt-8 space-y-4">
              <button className="w-full rounded-full bg-[#0F766E] px-6 py-4 font-semibold text-white transition hover:bg-[#0c625b]">
                Request This Tour
              </button>

              <button className="w-full rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-6 py-4 font-semibold text-[#B45309] transition hover:bg-[#F59E0B]/15">
                Customize the Package
              </button>
            </div>

            <div className="mt-8 rounded-[24px] border border-gray-200 bg-white/80 p-5">
              <p className="text-sm text-gray-500">Flight Information</p>
              <p className="mt-2 text-gray-700">{packageData.flightInfo}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}