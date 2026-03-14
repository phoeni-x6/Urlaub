"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Emily & Daniel",
    location: "United Kingdom",
    title: "A honeymoon we will never forget",
    review:
      "Everything was curated beautifully, from the beachfront stay to the private sunset dinner. The itinerary felt luxurious, smooth, and deeply personal. Sri Lanka became one of our favorite destinations because of this experience.",
    rating: 5,
    trip: "Romance Journey",
  },
  {
    name: "Sophia Carter",
    location: "Australia",
    title: "Perfect balance of adventure and comfort",
    review:
      "We explored Ella, went on safari, and still had time to relax in stunning hotels. The planning was seamless, and every transfer and activity felt thoughtfully arranged. It made the whole trip effortless.",
    rating: 5,
    trip: "Adventure Trail",
  },
  {
    name: "Noah Perera",
    location: "Canada",
    title: "Amazing family holiday",
    review:
      "Traveling with children can be difficult, but this trip was organized so well. The hotels were family-friendly, the guides were patient, and every destination offered something memorable for all of us.",
    rating: 5,
    trip: "Family Escape",
  },
  {
    name: "Lisa Fernando",
    location: "Germany",
    title: "The wellness retreat exceeded expectations",
    review:
      "The Ayurveda retreat, peaceful surroundings, and slow-paced itinerary gave me exactly the reset I needed. It felt authentic, calming, and beautifully designed from start to finish.",
    rating: 5,
    trip: "Wellness Retreat",
  },
];

export default function ReviewSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentReview = reviews[currentIndex];

  return (
    <section className="overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Traveler Stories
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-textmain md:text-5xl">
              Loved by travelers from around the world
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-textsecondary md:text-lg">
              Genuine stories from guests who explored Sri Lanka through curated
              journeys, luxury stays, and meaningful local experiences.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-borderlight bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">4.9/5</p>
                <p className="mt-1 text-sm text-textsecondary">Average rating</p>
              </div>

              <div className="rounded-2xl border border-borderlight bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">1.2k+</p>
                <p className="mt-1 text-sm text-textsecondary">Happy travelers</p>
              </div>

              <div className="rounded-2xl border border-borderlight bg-white p-4 shadow-sm">
                <p className="text-2xl font-bold text-primary">96%</p>
                <p className="mt-1 text-sm text-textsecondary">Would return</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-borderlight bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-sm transition hover:bg-accent-dark"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />

            <article className="relative rounded-[32px] bg-white p-8 shadow-xl ring-1 ring-borderlight md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                  <Quote className="h-7 w-7" />
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: currentReview.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 min-h-[220px]">
                <span className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {currentReview.trip}
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-tight text-textmain md:text-3xl">
                  {currentReview.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-textsecondary md:text-lg">
                  “{currentReview.review}”
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-borderlight pt-6">
                <div>
                  <p className="text-lg font-bold text-primary">
                    {currentReview.name}
                  </p>
                  <p className="text-sm text-textsecondary">
                    {currentReview.location}
                  </p>
                </div>

                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to review ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === index
                          ? "w-8 bg-accent"
                          : "w-2.5 bg-primary/20 hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}