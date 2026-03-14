"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useMemo, useState } from "react";
import { MapPin, Star } from "lucide-react";

type Hotel = {
  id: number;
  name: string;
  location: string;
  rating: number | null;
};

const hotels: Hotel[] = [
  { id: 1, name: "Monara Leisure Anuradapura", location: "Anuradhapura", rating: 3 },
  { id: 2, name: "Dickwella Browns", location: "Dickwella", rating: 5 },
  { id: 3, name: "Occidental Paradise Dambulla Browns", location: "Dambulla", rating: 5 },
  { id: 4, name: "Hotel Sigiriya Browns", location: "Sigiriya", rating: 5 },
  { id: 5, name: "Club Dolphin Browns", location: "Waikkal", rating: 5 },
  { id: 6, name: "Occidental Eden Beruwala Browns", location: "Beruwala", rating: 5 },
  { id: 7, name: "Thaala Browns", location: "Bentota", rating: 5 },
  { id: 8, name: "The Calm Resort n Spa Browns", location: "Pasikuda", rating: 5 },
  { id: 9, name: "Pegasus Reef Wattala", location: "Wattala", rating: 4 },
  { id: 10, name: "Araliya Red", location: "Nuwara Eliya", rating: 4 },
  { id: 11, name: "Araliya Green Hills", location: "Nuwara Eliya", rating: 4 },
  { id: 12, name: "Araliya Green City", location: "Nuwara Eliya", rating: 5 },
  { id: 13, name: "Kubura Anuradhapura", location: "Anuradhapura", rating: 4 },
  { id: 14, name: "Jims Farm's Villa", location: "Unknown", rating: 4 },
  { id: 15, name: "Ekho Surf Bentota", location: "Bentota", rating: 5 },
  { id: 16, name: "Lake House Polonnaruwa Ekho", location: "Polonnaruwa", rating: 5 },
  { id: 17, name: "Queen Hotel", location: "Kandy", rating: null },
  { id: 18, name: "Ekho Safari", location: "Yala", rating: 5 },
  { id: 19, name: "Ekho Sigiriya", location: "Sigiriya", rating: 4 },
  { id: 20, name: "Ekho Ella", location: "Ella", rating: 4 },
  { id: 21, name: "Hotel Suisse", location: "Kandy", rating: null },
  { id: 22, name: "Lolu Village Anuradhapura", location: "Anuradhapura", rating: 3 },
  { id: 23, name: "Blue Wild Yala", location: "Yala", rating: null },
  { id: 24, name: "Villa Wadduwa", location: "Wadduwa", rating: 5 },
  { id: 25, name: "Oliphant", location: "Nuwara Eliya", rating: 4 },
  { id: 26, name: "Langdale Boutique", location: "Nuwara Eliya", rating: 5 },
  { id: 27, name: "Hanthana Boutique", location: "Kandy", rating: null },
  { id: 28, name: "Amaya Hills Kandy & Amaya Lake Dambulla", location: "Kandy / Dambulla", rating: 5 },
  { id: 29, name: "Arsulana Eco Lodge", location: "Unknown", rating: null },
  { id: 30, name: "Hikka Villa Oceana By Heritage", location: "Hikkaduwa", rating: null },
  { id: 31, name: "Heritage Hotel Anuradapura", location: "Anuradhapura", rating: 4 },
  { id: 32, name: "Farm Villa by Heritage - Yala", location: "Yala", rating: 4 },
  { id: 33, name: "Monara Anuradapura", location: "Anuradhapura", rating: 3 },
  { id: 34, name: "Monara Ella", location: "Ella", rating: 3 },
  { id: 35, name: "Goldi Sands Negombo", location: "Negombo", rating: 5 },
  { id: 36, name: "Suriya Resort Waikkala", location: "Waikkal", rating: 5 },
  { id: 37, name: "Theva Residency", location: "Kandy", rating: 5 },
  { id: 38, name: "Garndbell", location: "Colombo", rating: 4 },
  { id: 39, name: "Amari Colombo", location: "Colombo", rating: 5 },
];

function Stars({ rating }: { rating: number | null }) {
  if (!rating) {
    return <span className="text-sm font-medium text-[#7b8b82]">Unrated</span>;
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-[#556b5d]">
        {rating} Star
      </span>
    </div>
  );
}

export default function HotelsPage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  const locations = useMemo(() => {
    return ["All Locations", ...Array.from(new Set(hotels.map((hotel) => hotel.location))).sort()];
  }, []);

  const ratings = ["All Ratings", "5 Star", "4 Star", "3 Star", "Unrated"];

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesLocation =
        selectedLocation === "All Locations" ||
        hotel.location === selectedLocation;

      const matchesRating =
        selectedRating === "All Ratings" ||
        (selectedRating === "Unrated" && hotel.rating === null) ||
        hotel.rating === Number(selectedRating.charAt(0));

      return matchesLocation && matchesRating;
    });
  }, [selectedLocation, selectedRating]);

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#1f3b2d]">
        <Navbar />
      {/* Hero */}

      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Hotel Collection
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Find hotels by preferred location and star rating
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d6f65]">
            Browse all hotels or narrow the results based on where the user
            wants to stay and the preferred hotel rating.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1f3b2d]">
                Filter by Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-2xl border border-[#d8dfd9] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1f3b2d]">
                Filter by Star Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full rounded-2xl border border-[#d8dfd9] bg-[#fafaf8] px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="w-full rounded-2xl bg-[#1f3b2d] px-5 py-3 text-white shadow-md">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Results
                </p>
                <p className="mt-1 text-xl font-bold">
                  {filteredHotels.length} Hotel{filteredHotels.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {filteredHotels.length === 0 ? (
            <div className="rounded-[28px] bg-white p-10 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-[#1f3b2d]">
                No hotels found
              </h3>
              <p className="mt-3 text-[#61746a]">
                Try changing the location or star rating filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="group rounded-[28px] border border-white/60 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                        Hotel
                      </p>
                      <h2 className="mt-2 text-2xl font-bold leading-snug text-[#1f3b2d]">
                        {hotel.name}
                      </h2>
                    </div>

                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {hotel.rating ? `${hotel.rating}★` : "N/A"}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[#5f7268]">
                    <MapPin className="h-4 w-4 text-emerald-700" />
                    <span className="text-sm font-medium">{hotel.location}</span>
                  </div>

                  <div className="mt-4">
                    <Stars rating={hotel.rating} />
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#edf0eb] pt-5">
                    <span className="text-sm text-[#7b8b82]">
                      Personalized hotel suggestion
                    </span>
                    <button className="rounded-full bg-[#1f3b2d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#163024]">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}