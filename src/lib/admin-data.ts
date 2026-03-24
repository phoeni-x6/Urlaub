export type TravelPackageStatus = "Published" | "Draft";

export type TravelPackageItineraryDay = {
  day: number;
  title: string;
  items: string[];
};

export type TravelPackage = {
  id: number;
  category: string;
  title: string;
  slug: string;
  subtitle?: string;
  shortDescription?: string;
  longDescription?: string;
  overviewTitle?: string;
  location: string;
  route?: string;
  routeSummary?: string;
  duration: string;
  price: string;
  image: string;
  heroImage?: string;
  mapImage?: string;
  galleryImages?: string[];
  travelStyle?: string;
  guideInfo?: string;
  accommodation?: string;
  meals?: string;
  flightInfo?: string;
  roomType?: string;
  highlights?: string;
  upgradeNote?: string;
  includedExperiences?: string[];
  itinerary?: TravelPackageItineraryDay[];
  status: TravelPackageStatus;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage: string;
  description: string;
  status: "Published" | "Draft";
};

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin123";

export const blogCategories = [
  "Cultural Heritage",
  "Religious & spiritual journeys",
  "Nature & Wildlife",
  "Local & authentic experiences",
  "Ayurveda & Wellness",
  "Hilly landscape & tropical adventure",
  "Beaches & Coastal Activities",
  "Cultural festivals",
];

export const packageCategoryOptions = [
  { slug: "round-tours", title: "Round Tours" },
  { slug: "retreat-tours", title: "Retreat Tours" },
  { slug: "customize-your-own-trip", title: "Customize Your Own Trip" },
  { slug: "beach-holiday", title: "Beach Holiday" },
  { slug: "long-stay", title: "Long Stay" },
  { slug: "seasonal-travelling", title: "Seasonal Travelling" },
];

export const initialTravelPackages: TravelPackage[] = [
  {
    id: 1,
    category: "round-tours",
    title: "Luxury South Coast Escape",
    slug: "luxury-south-coast-escape",
    subtitle: "A refined beach and culture journey across Sri Lanka",
    shortDescription:
      "Discover Sri Lanka through a stylish blend of golden beaches, colonial charm, scenic train rides, and curated cultural moments.",
    longDescription:
      "This immersive round tour is designed for travelers who want to experience Sri Lanka in comfort and style. From the bustling capital to misty highlands and the southern coastline, the package combines premium stays, handpicked experiences, and a relaxed yet enriching pace.",
    overviewTitle:
      "An elegant island route combining culture, coast, and comfort",
    location: "Colombo / Kandy / Ella / Galle / Bentota",
    route: "Colombo → Kandy → Nuwara Eliya → Ella → Yala → Galle → Bentota",
    routeSummary:
      "A scenic route through Sri Lanka’s cultural heart, tea country, wildlife zone, and southern coast.",
    duration: "8 Days / 7 Nights",
    price: "$1,250",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    mapImage: "/packages/maptest1.png",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    ],
    travelStyle: "Private Tour",
    guideInfo: "English / German speaking guide available",
    accommodation: "Boutique hotels and premium beach resorts",
    meals: "Daily breakfast included",
    flightInfo: "International flights not included",
    roomType: "Double / Twin room",
    highlights:
      "Southern beaches, train journeys, cultural landmarks, premium stays, and curated local experiences.",
    upgradeNote:
      "Optional hotel upgrades and private chauffeur enhancements are available on request.",
    includedExperiences: [
      "Airport pickup and drop-off",
      "Private transport with chauffeur",
      "Scenic hill country train journey",
      "Selected guided sightseeing",
      "Beach stay extension options",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        items: [
          "Meet and greet at the airport",
          "Transfer to hotel in Colombo",
          "Relax after arrival",
        ],
      },
      {
        day: 2,
        title: "Journey to Kandy",
        items: [
          "Travel to Kandy",
          "Visit Temple of the Tooth",
          "Evening cultural show",
        ],
      },
      {
        day: 3,
        title: "Tea Country Experience",
        items: [
          "Drive through scenic highlands",
          "Tea plantation visit",
          "Overnight near Nuwara Eliya or Ella",
        ],
      },
    ],
    status: "Published",
  },
  {
    id: 2,
    category: "retreat-tours",
    title: "Ayurveda Wellness Retreat",
    slug: "ayurveda-wellness-retreat",
    subtitle: "Restore balance with an authentic Sri Lankan wellness escape",
    shortDescription:
      "A calming retreat focused on Ayurveda, yoga, mindful living, and tropical serenity.",
    longDescription:
      "Ideal for travelers seeking healing, stillness, and personal renewal, this retreat blends traditional Ayurveda treatments with nourishing meals, peaceful surroundings, and wellness rituals rooted in Sri Lankan heritage.",
    overviewTitle:
      "A restorative retreat for body, mind, and spirit",
    location: "Bentota / Ahangama / Southern Coast",
    route: "Airport → Wellness Resort → Ayurveda Center → Beach Relaxation",
    routeSummary:
      "A soft-paced retreat route centered around wellness and coastal calm.",
    duration: "6 Days / 5 Nights",
    price: "$980",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    mapImage: "/packages/maptest1.png",
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    ],
    travelStyle: "Retreat / Wellness",
    guideInfo: "Wellness host and retreat support team",
    accommodation: "Ayurveda resort or boutique wellness villa",
    meals: "Full board wellness meals",
    flightInfo: "Flights not included",
    roomType: "Private wellness suite",
    highlights:
      "Ayurveda consultation, yoga sessions, herbal treatments, nourishing cuisine, and quiet beach time.",
    upgradeNote:
      "Personalized treatment plans can be upgraded after the initial consultation.",
    includedExperiences: [
      "Initial wellness consultation",
      "Daily yoga or meditation",
      "Ayurveda treatments",
      "Healthy meal plan",
      "Airport transfers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Consultation",
        items: [
          "Arrival transfer to retreat property",
          "Welcome drink and check-in",
          "Initial Ayurveda consultation",
        ],
      },
      {
        day: 2,
        title: "Wellness Routine Begins",
        items: [
          "Morning yoga session",
          "Personalized treatment schedule",
          "Healthy meals and relaxation",
        ],
      },
    ],
    status: "Draft",
  },
];

export const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Exploring Sri Lanka’s Southern Coast",
    slug: "exploring-sri-lankas-southern-coast",
    category: "Beaches & Coastal Activities",
    author: "Admin",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    description:
      "<p>Discover golden beaches, surfing towns, sea food spots, and peaceful sunsets along Sri Lanka’s southern coast.</p>",
    status: "Published",
  },
];