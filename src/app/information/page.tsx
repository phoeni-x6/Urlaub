"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Plane,
  HeartPulse,
  Backpack,
  CreditCard,
  ReceiptText,
  UserCheck,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from "lucide-react";

type TopicSection = {
  heading: string;
  items: string[];
};

type Topic = {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  intro: string;
  note?: string;
  points?: string[];
  sections?: TopicSection[];
};

const topics: Topic[] = [
  {
    id: "visa-entry",
    title: "Visa Requirements & Entry Requirements for Sri Lanka",
    shortTitle: "Visa & Entry",
    icon: Plane,
    intro:
      "Planning a trip to Sri Lanka? Here you'll find everything you need to know about visas and entry requirements – simple, clear, and stress-free.",
    note:
      "Visa rules and entry requirements can change. Always verify the latest official guidance before booking or departure.",
    sections: [
      {
        heading: "Do I need a visa for Sri Lanka?",
        items: [
          "Yes, most travelers need a visa to enter Sri Lanka.",
          "The process is simple and can be completed online before arrival.",
        ],
      },
      {
        heading: "Types of tourist visas",
        items: [
          "Electronic Travel Authorization (ETA) – the most common option for tourists.",
          "Valid for 30 days and allows two entries.",
          "Recommended to apply online before traveling.",
          "Visa on arrival may be available for some nationalities, but applying for ETA in advance saves time.",
          "Long-term visa options are available for extended stays such as wellness or Ayurveda retreats.",
        ],
      },
      {
        heading: "How to apply for an ETA tourist visa",
        items: [
          "Official website: https://www.eta.gov.lk",
          "Complete the application form online.",
          "Pay the visa fee (approximately 50 USD).",
          "Confirmation is usually sent by email within 24 hours.",
        ],
      },
      {
        heading: "Documents required upon entry",
        items: [
          "Valid passport with at least 6 months validity.",
          "Return or onward flight ticket.",
          "Proof of sufficient financial resources.",
          "Hotel booking or accommodation details (recommended).",
        ],
      },
      {
        heading: "Children & Toddlers",
        items: [
          "For children under 12 years of age the ETA is often free.",
          "However, an application still needs to be submitted.",
        ],
      },
      {
        heading: "Extending your visa",
        items: [
          "Tourist visas can be extended locally for up to 180 days.",
          "Extensions are handled by the Department of Immigration and Emigration in Colombo.",
        ],
      },
      {
        heading: "Visa assistance service",
        items: [
          "If you prefer not to handle the visa process yourself, we can assist with the application.",
          "A small processing fee may apply for this service.",
        ],
      },
      {
        heading: "Useful tips",
        items: [
          "Apply early to avoid travel stress.",
          "Keep a screenshot or printed copy of your ETA confirmation.",
          "Always use the official website to avoid fraudulent visa services.",
        ],
      },
    ],
  },
  {
  id: "vaccinations-health",
  title: "Vaccinations & Health Tips",
  shortTitle: "Health Tips",
  icon: HeartPulse,
  intro:
    "Travel to Sri Lanka is generally straightforward, and with a few simple health precautions you can enjoy your journey comfortably and confidently.",
  note:
    "Medical advice depends on your personal situation. For vaccinations or medication guidance, consult a qualified healthcare professional before travel.",
  sections: [
    {
      heading: "Vaccinations for entry",
      items: [
        "No vaccinations are required for entry into Sri Lanka.",
        "Most travelers can enter without any problems even without mandatory vaccinations.",
      ],
    },
    {
      heading: "Recommended vaccinations",
      items: [
        "Tetanus",
        "Diphtheria",
        "Polio",
        "Hepatitis A",
        "Hepatitis B",
        "Typhoid",
        "Rabies",
      ],
    },
    {
      heading: "Protection from mosquitoes",
      items: [
        "In tropical regions of Sri Lanka there can occasionally be cases of dengue fever or chikungunya.",
        "We provide mosquito spray to help protect you during your stay.",
        "Our drivers and guides are there to support you at all times.",
      ],
    },
    {
      heading: "Traditional wellness support",
      items: [
        "You will receive a traditional Ayurvedic medicine pack with natural remedies from us.",
        "If needed, we are happy to help with alternative traditional herbal medicine support.",
      ],
    },
    {
      heading: "Travel pharmacy (optional)",
      items: [
        "Pain and fever relievers",
        "Disinfectant",
        "Plasters",
        "Personal medications",
      ],
    },
    {
      heading: "Our support during your journey",
      items: [
        "We are there for you throughout your entire journey.",
        "Our traditional medicine support and local team help ensure that you feel safe, comfortable, and well cared for in a natural way.",
      ],
    },
  ],
},
  {
  id: "packing-tips",
  title: "Packing Tips & What You Should Bring / Avoid",
  shortTitle: "Packing Tips",
  icon: Backpack,
  intro:
    "Sri Lanka is a tropical travel destination with unique cultural traditions. With the right items in your luggage you can travel comfortably, respectfully, and fully enjoy your journey.",
  sections: [
    {
      heading: "What you should bring – Clothing",
      items: [
        "Lightweight, breathable clothing made of cotton or linen – perfect for warm tropical climates.",
        "White clothing – especially respectful and suitable for temple visits.",
        "Temple-appropriate clothing – shoulders and knees must be covered.",
        "Swimwear – useful for beach stays or hotel pools.",
        "Light jacket or sweater – helpful for cooler highland regions such as Nuwara Eliya.",
      ],
    },
    {
      heading: "Shoes",
      items: [
        "Comfortable walking shoes for sightseeing and exploring.",
        "Sandals or flip-flops for beach days.",
        "Easy-to-remove shoes – shoes must be removed before entering temples.",
      ],
    },
    {
      heading: "Useful things to pack",
      items: [
        "Sunscreen with a high sun protection factor.",
        "Mosquito repellent (we will also gladly provide this for you).",
        "Sunglasses and headwear for sun protection.",
        "Refillable water bottle.",
        "Travel adapter – Sri Lanka commonly uses type G sockets (UK plug type).",
      ],
    },
    {
      heading: "Health & personal care",
      items: [
        "Personal medications.",
        "A small travel pharmacy (you will also receive a traditional Ayurvedic medicine pack from us).",
        "Hand sanitizer and wet wipes.",
      ],
    },
    {
      heading: "Local shopping tip",
      items: [
        "Sri Lanka is famous for handcrafted clothing and fabrics such as cotton, batik, sarongs, and linen fashion.",
        "You can buy beautiful eco-friendly and temple-appropriate clothing locally at affordable prices.",
        "These items make wonderful souvenirs while also being practical during your stay.",
      ],
    },
    {
      heading: "What you should avoid",
      items: [
        "Shorts, miniskirts, or strapless tops when visiting temples.",
        "Plastic bags – many are banned in Sri Lanka.",
        "Heavy or tight clothing which can be uncomfortable in tropical heat.",
        "Using drones without official permission.",
      ],
    },
    {
      heading: "Our service for you",
      items: [
        "Mosquito spray provided by our team.",
        "Traditional Ayurveda medicine pack included.",
        "Personal attention and assistance from your driver and tour guide throughout the journey.",
        "Travel light, respect the culture, and discover Sri Lanka in comfort and style.",
      ],
    },
  ],
},
  {
  id: "currency-payments",
  title: "Currency & Payment Methods in Sri Lanka",
  shortTitle: "Currency & Payments",
  icon: CreditCard,
  intro:
    "Understanding the local currency and payment options will make it easier to manage transport, shopping, restaurants, and other travel expenses during your stay in Sri Lanka.",
  sections: [
    {
      heading: "Currency",
      items: [
        "The official currency of Sri Lanka is the Sri Lankan Rupee (LKR).",
        "Banknotes are available in denominations such as 10, 20, 50, 100, 500, 1000, and 5000 rupees.",
      ],
    },
    {
      heading: "Where can you exchange money?",
      items: [
        "Foreign currencies can be exchanged at banks, authorized exchange offices, and some hotels.",
        "Currency exchange counters are available at the airport.",
        "It is recommended to exchange around 100–200 EUR or USD at the airport so you have cash available at the start of your trip.",
        "ATMs are widely available in cities and tourist areas.",
      ],
    },
    {
      heading: "Payment methods",
      items: [
        "Most hotels, restaurants, and larger shops accept credit and debit cards such as Visa and MasterCard.",
        "Smaller shops, markets, and rural areas usually prefer cash payments.",
        "It is advisable to keep some cash with you for transport, tips, and small purchases.",
      ],
    },
    {
      heading: "Useful tips",
      items: [
        "Our tour guides can help you find trustworthy exchange locations with good rates.",
        "Inform your bank before traveling so your cards work internationally.",
        "Avoid exchanging money with unofficial providers to prevent fraud.",
      ],
    },
  ],
},
  {
  id: "booking-refund",
  title: "Booking & Refund Policy",
  shortTitle: "Booking & Refund Policy",
  icon: ReceiptText,
  intro:
    "You can easily book your Sri Lanka trip by contacting us directly. Our team is happy to assist with planning, questions, and additional services to make your journey smooth and stress-free.",
  note:
    "For the final booking agreement, detailed terms and conditions will be provided when confirming your travel package.",

  sections: [
    {
      heading: "Booking information",
      items: [
        "Email: info@urlaub-srilanka.com",
        "Phone & WhatsApp – Sri Lanka (Head Office): +94 74 124 8030",
        "Phone & WhatsApp – Germany: +49 175 9479619",
        "Phone & WhatsApp – Germany: +49 1512 8983793",
        "Our team will gladly assist you with your booking, travel questions, and any additional services.",
      ],
    },

    {
      heading: "Payment & booking terms",
      items: [
        "To confirm your booking, a deposit of 70% is required.",
        "The deposit should be paid at least 1 month before arrival.",
        "If possible, we recommend booking your trip about 3 months in advance.",
        "The remaining balance can be paid upon arrival at the airport.",
        "Please note that we make advance payments to hotels and transport providers when securing your travel arrangements.",
      ],
    },

    {
      heading: "Payment methods",
      items: [
        "Bank transfer",
        "Credit card",
        "PayPal",
        "Preferred option: deposit via bank transfer and final payment in cash upon arrival.",
      ],
    },

    {
      heading: "Cancellation & refund policy",
      items: [
        "Up to 30 days before arrival: Full refund of the deposit (minus any bank or transaction fees).",
        "15–29 days before arrival: 50% of the deposit will be refunded.",
        "14 days or less before arrival: The deposit becomes non-refundable.",
        "In exceptional cases such as medical emergencies or travel restrictions, we try to offer flexible solutions like rebooking or partial credit for a future trip.",
        "Please contact us as soon as possible if you need to make changes or cancellations.",
      ],
    },

    {
      heading: "Flight & visa assistance",
      items: [
        "If you need help booking your flights or applying for a visa, we are happy to assist you.",
        "Simply contact our team and we will guide you through the process.",
      ],
    },
  ],
},
{
  id: "guides-safety",
  title: "Registered Guides and Safety",
  shortTitle: "Guides & Safety",
  icon: UserCheck,
  intro:
    "When traveling in Sri Lanka, safety and authentic experiences go hand in hand. Choosing a registered, certified guide and driver ensures your journey is safe, comfortable, and enriched with valuable local insights.",

  sections: [
    {
      heading: "Why choose a registered guide and driver?",
      items: [
        "Our company provides officially licensed guides and drivers who speak both English and German.",
        "Traveling with a certified professional ensures safety, comfort, and a deeper understanding of Sri Lanka’s culture and history.",
      ],
    },

    {
      heading: "What does it mean to have a registered guide?",
      items: [
        "Sri Lankan law requires all professional guides and drivers to be registered and licensed by the Sri Lanka Tourism Development Authority (SLTDA).",
        "Licensed guides and drivers undergo professional training and meet strict standards of knowledge, professionalism, and safety.",
      ],
    },

    {
      heading: "A registered guide means you travel with someone who",
      items: [
        "Has extensive knowledge of Sri Lanka’s history, culture, and local traditions.",
        "Is trained in first aid and safety procedures.",
        "Has experience handling the unique road and traffic conditions in Sri Lanka.",
      ],
    },

    {
      heading: "Safety first",
      items: [
        "Sri Lankan roads can sometimes be unpredictable.",
        "Our licensed drivers follow safety guidelines and understand local traffic conditions.",
        "This ensures your journey is safe and comfortable from start to finish.",
      ],
    },

    {
      heading: "Authentic local knowledge",
      items: [
        "Registered guides share stories, history, and cultural insights you won’t find in guidebooks.",
        "They can also take you to hidden places beyond the typical tourist routes.",
      ],
    },

    {
      heading: "Peace of mind",
      items: [
        "When traveling with a registered guide and driver, you are working with professionals accountable under Sri Lankan law.",
        "This ensures reliable service and a trustworthy travel experience.",
      ],
    },

    {
      heading: "Language options",
      items: [
        "Our certified guides speak both English and German.",
        "This makes communication easy and allows you to fully enjoy your travel experience.",
      ],
    },

    {
      heading: "Why choose our company?",
      items: [
        "We work only with SLTDA-registered guides and drivers.",
        "Our team is passionate about showing you the real beauty of Sri Lanka.",
        "Every trip is carefully organized to ensure your comfort, safety, and unforgettable experiences.",
      ],
    },

    {
      heading: "Ready to travel safely?",
      items: [
        "Contact us today to book your certified English- or German-speaking guide and driver.",
        "Discover Sri Lanka with confidence, comfort, and genuine local expertise.",
      ],
    },
  ],
},
 {
  id: "local-laws-customs",
  title: "Local Laws and Customs in Sri Lanka",
  shortTitle: "Local Laws & Customs",
  icon: Scale,
  intro:
    "Understanding local laws and cultural customs will help you travel respectfully and comfortably while enjoying the warm hospitality Sri Lanka is known for.",
  sections: [
    {
      heading: "Important rules",
      items: [
        "Sri Lanka has very strict drug laws. Possession of illegal drugs can lead to heavy fines or imprisonment.",
        "Smoking is prohibited in many public places such as hospitals, government buildings, and some beaches.",
        "Alcohol may only be consumed in licensed establishments and the legal drinking age is 21.",
        "Do not litter or damage nature. Environmental protection is taken seriously and violations may result in fines.",
        "Dress modestly, especially when visiting temples and religious sites. Shoulders and knees should be covered.",
      ],
    },
    {
      heading: "Etiquette & customs",
      items: [
        "Always remove your shoes before entering a house or temple.",
        "A traditional greeting in Sri Lanka is 'Ayubowan' with hands placed together as in prayer. It means 'may you live long'.",
        "If you have tattoos, especially of Buddha, it is respectful to cover them when visiting temples or religious places.",
      ],
    },
    {
      heading: "Respect for temples",
      items: [
        "Wear clothing that covers shoulders and knees.",
        "Shorts, short skirts, and sleeveless tops are not appropriate inside temples.",
        "Photography is not allowed in some temples, so always ask permission beforehand.",
        "Remain quiet and respectful when visiting religious sites.",
      ],
    },
    {
      heading: "Hospitality & safety in Sri Lanka",
      items: [
        "Sri Lankan people are known for being warm, welcoming, and hospitable.",
        "The country is generally considered safe for travelers, including solo travelers.",
        "Visitors can travel with confidence while enjoying the genuine friendliness of local communities.",
      ],
    },
  ],
}
];

function TopicCard({ topic }: { topic: Topic }) {
  const Icon = topic.icon;

  return (
    <section
      id={topic.id}
      className="scroll-mt-28 rounded-[30px] border border-white/60 bg-white p-6 shadow-lg md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-emerald-50 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Travel Information
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1f3b2d] md:text-3xl">
            {topic.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#61746a] md:text-base">
            {topic.intro}
          </p>
        </div>
      </div>

      {topic.note && (
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-6">{topic.note}</p>
        </div>
      )}

      {topic.sections && topic.sections.length > 0 ? (
        <div className="mt-8 space-y-8">
          {topic.sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-lg font-bold text-[#1f3b2d] md:text-xl">
                {section.heading}
              </h3>

              <div className="grid gap-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 rounded-2xl border border-[#edf0eb] bg-[#fcfcfa] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-7 text-[#61746a] md:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {topic.points?.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-2xl border border-[#edf0eb] bg-[#fcfcfa] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <p className="text-sm leading-7 text-[#61746a] md:text-base">
                {point}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function TravelInformationPage() {
  const [selectedTopic, setSelectedTopic] = useState("all");

  const filteredTopics = useMemo(() => {
    if (selectedTopic === "all") return topics;
    return topics.filter((topic) => topic.id === selectedTopic);
  }, [selectedTopic]);

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#1f3b2d]">
      <Navbar />

      <section className="relative overflow-hidden bg-primary px-6 py-20 text-white lg:px-10">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
            Travel Information
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Everything travelers should know before visiting Sri Lanka
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            Explore essential guidance on visas, health, packing, payments,
            bookings, and travel safety in one simple information hub.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
            >
              Contact Us
            </Link>

            <Link
              href="/book"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#1f3b2d]">
                Filter travel information by topic
              </label>

              <div className="relative">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-[#d8dfd9] bg-[#fafaf8] px-4 py-4 pr-12 text-sm outline-none transition focus:border-emerald-500"
                >
                  <option value="all">All Topics</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.shortTitle}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7d73]" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#1f3b2d] px-5 py-4 text-white shadow-md">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Available Topics
                </p>
                <p className="mt-1 text-2xl font-bold">{topics.length}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-[#1f3b2d]">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                  Showing
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {filteredTopics.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTopic("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedTopic === "all"
                  ? "bg-primary text-white"
                  : "bg-[#f3f5f2] text-[#4f6258] hover:bg-[#e9eee9]"
              }`}
            >
              All Topics
            </button>

            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedTopic === topic.id
                    ? "bg-primary text-white"
                    : "bg-[#f3f5f2] text-[#4f6258] hover:bg-[#e9eee9]"
                }`}
              >
                {topic.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-8">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-primary p-8 text-white shadow-lg md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                Need help planning?
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                We can guide your route, hotels, transport, and travel needs
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
                Reach out for support if you want help organizing a complete
                Sri Lanka trip based on your travel style, budget, preferred
                destinations, and comfort level.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
              >
                Contact Us
              </Link>

              <Link
                href="/book"
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}