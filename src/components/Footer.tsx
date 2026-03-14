import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white">
      
      <div className="absolute -top-20 left-1/3 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Image
              src="/logo.png"
              alt="Travel Lanka"
              width={140}
              height={80}
              className="object-contain"
            />

            <p className="mt-6 text-sm leading-7 text-white/80">
              Discover Sri Lanka through curated journeys, luxury stays, and
              unforgettable experiences crafted for modern travelers.
            </p>

            <div className="mt-6 flex gap-4">
              <Link href="#" className="rounded-full bg-white/10 p-3 hover:bg-accent transition">
                <Facebook size={18} />
              </Link>

              <Link href="#" className="rounded-full bg-white/10 p-3 hover:bg-accent transition">
                <Instagram size={18} />
              </Link>

              <Link href="#" className="rounded-full bg-white/10 p-3 hover:bg-accent transition">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Explore</h3>

            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li><Link href="/packages" className="hover:text-accent">Tour Packages</Link></li>
              <li><Link href="/destinations" className="hover:text-accent">Destinations</Link></li>
              <li><Link href="/hotels" className="hover:text-accent">Hotels</Link></li>
              <li><Link href="/blog" className="hover:text-accent">Travel Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>

            <div className="mt-6 space-y-4 text-sm text-white/80">

              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>+94 77 123 4567</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>info@travellanka.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>Colombo, Sri Lanka</span>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Travel Updates</h3>

            <p className="mt-6 text-sm text-white/80">
              Subscribe to receive travel inspiration, guides and special offers.
            </p>

            <div className="mt-5 flex overflow-hidden rounded-full bg-white">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm text-gray-700 outline-none"
              />

              <button className="flex items-center justify-center bg-accent px-4 text-white hover:bg-accent-dark transition">
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/20 pt-6 text-center text-sm text-white/70">
          © {new Date().getFullYear()} TravelLanka. All rights reserved.
        </div>
      </div>
    </footer>
  );
}