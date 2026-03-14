import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function AboutPage() {
  return (
    <main className="bg-background">
        <Navbar />
      {/* HERO */}
      <section className="relative bg-primary py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <h1 className="text-5xl font-bold md:text-6xl">About Us</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Discover the story behind Holidays in Sri Lanka — a journey built on
            passion, authenticity, and the desire to share the true beauty of
            this island with the world.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">

          <div className="relative h-[420px] overflow-hidden rounded-3xl">
            <Image
              src="/about/founder.jpg"
              alt="Founder"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Founder Story
            </p>

            <h2 className="mt-3 text-4xl font-bold text-textmain">
              A journey between two worlds
            </h2>

            <p className="mt-6 text-lg leading-8 text-textsecondary">
              My story begins between two worlds — Sri Lanka, where my roots lie,
              and Europe, where I have lived since my youth. Growing up
              surrounded by Sri Lanka’s lush nature, vibrant traditions, and
              warm hospitality shaped my love for this island.
            </p>

            <p className="mt-4 text-lg leading-8 text-textsecondary">
              After graduating in Tourism and Languages in Italy, I founded my
              first company in Germany in 2021. Through that journey I realized
              how much undiscovered beauty Sri Lanka holds beyond what most
              travelers experience.
            </p>

            <p className="mt-4 text-lg leading-8 text-textsecondary">
              With the support of my family in Sri Lanka, I created Holidays in
              Sri Lanka — a passion project to reveal the island’s authentic
              places, meaningful encounters, and experiences that truly touch
              the heart.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WE STARTED */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Why We Started
          </p>

          <h2 className="mt-4 text-4xl font-bold text-textmain">
            Rethinking tourism
          </h2>

          <p className="mt-8 text-lg leading-8 text-textsecondary">
            Tourism should not only benefit travelers — it should also uplift
            local communities and protect nature. We believe travel can create
            meaningful connections between cultures, people, and places.
          </p>

          <p className="mt-4 text-lg leading-8 text-textsecondary">
            With Holidays in Sri Lanka, we aim to create more than vacation
            packages. We create journeys that allow travelers to slow down,
            experience more deeply, and connect with the island’s true spirit.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border border-borderlight bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              <p className="mt-4 text-lg leading-8 text-textsecondary">
                To reveal the undiscovered beauty of Sri Lanka through
                sustainable and authentic travel experiences that connect
                people, inspire hearts, and leave lasting impressions.
              </p>
            </div>

            <div className="rounded-3xl border border-borderlight bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-primary">Our Mission</h3>

              <ul className="mt-6 space-y-4 text-lg text-textsecondary">
                <li>Design authentic journeys through local perspectives</li>
                <li>Promote fair and sustainable tourism</li>
                <li>Support local communities and protect nature</li>
                <li>Create meaningful travel experiences</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      
<Footer />
    </main>
  );
}