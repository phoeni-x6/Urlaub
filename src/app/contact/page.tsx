
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#f8f6f1] text-[#1f3b2d]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Get in touch
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Let’s plan something unforgettable together
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#556b5d]">
            Whether you have a question, need help planning your stay, or want a
            custom travel experience, we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
         <div className="rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur">
  <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
    <Phone size={22} />
  </div>

  <h3 className="text-xl font-semibold">Call Us</h3>

  <p className="mt-2 text-sm text-[#5f6f66]">
    Reach us directly via Phone or WhatsApp.
  </p>

  {/* Sri Lanka */}
  <div className="mt-4">
    <p className="text-sm font-semibold text-[#1f3b2d]">
      🇱🇰 Sri Lanka (Head Office)
    </p>
    <p className="text-sm text-[#5f6f66]">+94 74 124 8030</p>
    <p className="text-sm text-[#5f6f66]">+94 72 640 5218</p>
  </div>

  {/* Germany */}
  <div className="mt-3">
    <p className="text-sm font-semibold text-[#1f3b2d]">
      🇩🇪 Germany
    </p>
    <p className="text-sm text-[#5f6f66]">+49 175 9479619</p>
    <p className="text-sm text-[#5f6f66]">+49 1512 8983793</p>
  </div>
</div>

          <div className="rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 inline-flex rounded-2xl bg-amber-100 p-3 text-amber-700">
              <Mail size={22} />
            </div>
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p className="mt-2 text-sm text-[#5f6f66]">
              Send us your questions and we’ll reply as soon as possible.
            </p>
            <p className="mt-4 font-medium">info@urlaub-srilanka.com</p>
          </div>

          <div className="rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 inline-flex rounded-2xl bg-sky-100 p-3 text-sky-700">
              <MapPin size={22} />
            </div>
            <h3 className="text-xl font-semibold">Our Location</h3>
            <p className="mt-2 text-sm text-[#5f6f66]">
              Stop by our office and let’s discuss your journey in person.
            </p>
            <p className="mt-4 font-medium">No. 2/92, Circular Road, Obada Waththa, Bentota</p>
          </div>

          <div className="rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 inline-flex rounded-2xl bg-rose-100 p-3 text-rose-700">
              <Clock size={22} />
            </div>
            <h3 className="text-xl font-semibold">Working Hours</h3>
            <p className="mt-2 text-sm text-[#5f6f66]">
              We’re available throughout the week to assist you.
            </p>
            <p className="mt-4 font-medium">Mon - Sun · 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Form */}
          <div className="rounded-[32px] bg-white p-8 shadow-xl md:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Send a message
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                We’re here to help
              </h2>
              <p className="mt-3 max-w-2xl text-[#62756a]">
                Fill in your details and tell us what you’re looking for. Our
                team will get back to you with the best options for your trip.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-[#d7dfd9] bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-[#d7dfd9] bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full rounded-2xl border border-[#d7dfd9] bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="What is this about?"
                    className="w-full rounded-2xl border border-[#d7dfd9] bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full rounded-2xl border border-[#d7dfd9] bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#1f3b2d] px-7 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-[#163024]"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div className="space-y-8">
            <div className="rounded-[32px] bg-[#1f3b2d] p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                Why contact us
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                Personalized travel support
              </h3>
              <p className="mt-4 leading-8 text-white/80">
                From beach escapes to mountain retreats, we help you find the
                right journey, accommodation, and experience tailored to your
                preferences.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="mt-1 rounded-xl bg-white/10 p-2">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Fast responses</h4>
                    <p className="text-sm text-white/75">
                      We aim to respond quickly and clearly to every inquiry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 rounded-xl bg-white/10 p-2">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Local expertise</h4>
                    <p className="text-sm text-white/75">
                      Get recommendations from people who know Sri Lanka best.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 rounded-xl bg-white/10 p-2">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Reliable support</h4>
                    <p className="text-sm text-white/75">
                      We help before, during, and after your booking journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] bg-white shadow-xl">
              <div className="border-b border-[#edf0eb] px-8 py-6">
                <h3 className="text-2xl font-bold">Our Location</h3>
                <p className="mt-2 text-sm text-[#62756a]">
                  Add your Google Map or location embed here.
                </p>
              </div>

              <div className="flex h-[260px] items-center justify-center bg-gradient-to-br from-emerald-100 via-[#f8f6f1] to-amber-100">
                <div className="text-center">
                  <MapPin className="mx-auto mb-3 text-emerald-700" size={34} />
                  <p className="font-semibold">Map Placeholder</p>  
                  <p className="mt-1 text-sm text-[#62756a]">
                    Replace this section with your embedded map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </main>
  );
}