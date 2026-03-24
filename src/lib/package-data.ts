export type TravelPackage = {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  shortDescription: string;

  subtitle?: string;
  heroImage?: string;
  galleryImages?: string[];
  mapImage?: string;

  route?: string;
  routeSummary?: string;
  accommodation?: string;
  meals?: string;
  travelStyle?: string;
  highlights?: string;
  flightInfo?: string;
  guideInfo?: string;
  minimumPax?: string;
  roomType?: string;
  upgradeNote?: string;
  overviewTitle?: string;
  longDescription?: string;

  itinerary?: {
    day: number;
    title: string;
    items: string[];
  }[];

  includedExperiences?: string[];
};

export const packageCategories = [
  {
    title: "Round Tours",
    slug: "roundtours",
    description:
      "Explore classic Sri Lanka journeys designed to take you through culture, coast, hills, and heritage in one seamless experience.",
  },
  {
    title: "Retreat Tours",
    slug: "retreat-tours",
    description:
      "Restore your body and mind with curated wellness, yoga, and Ayurveda escapes across serene Sri Lankan destinations.",
  },
  {
    title: "Customize Your Own Trip",
    slug: "customize-your-own-trip",
    description:
      "Build your own Sri Lanka journey with handpicked stays, routes, experiences, and private travel support.",
  },
  {
    title: "Beach Holiday",
    slug: "beach-holiday",
    description:
      "Discover sun-soaked beach escapes, oceanfront resorts, and laid-back tropical stays across Sri Lanka’s coastline.",
  },
  {
    title: "Long Stay",
    slug: "long-stay",
    description:
      "Stay longer and travel deeper with slow-living packages, villa stays, and extended tropical escapes.",
  },
  {
    title: "Seasonal Travelling",
    slug: "seasonal-travelling",
    description:
      "Travel with the seasons and enjoy the best destinations, weather windows, and local experiences at the right time.",
  },
];

export const travelPackages: TravelPackage[] = [
  {
    id: 1,
    title: "Classic Sri Lanka Highlights",
    slug: "classic-sri-lanka-highlights",
    category: "roundtours",
    location: "Colombo • Sigiriya • Kandy • Ella • Galle",
    duration: "8 Days / 7 Nights",
    price: "$1,250",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A complete Sri Lanka round tour covering ancient cities, scenic hills, tea country, and the southern coast.",
    subtitle:
      "A beautifully balanced island journey combining heritage, mountain landscapes, wildlife moments, and tropical coastline charm.",
    route:
      "Colombo → Sigiriya → Kandy → Nuwara Eliya / Ella → Yala / South Coast → Galle",
    routeSummary: "Cultural Triangle • Hill Country • South Coast",
    accommodation: "Boutique hotels & handpicked 3–4 star stays",
    meals: "Daily breakfast with selected dinners",
    travelStyle: "Private guided round tour",
    highlights:
      "Sigiriya Rock Fortress, Kandy culture, scenic train journeys, tea country landscapes, and the southern coast.",
    flightInfo: "International flights not included",
    guideInfo: "Private driver-guide included",
    minimumPax: "Minimum 2 Pax",
    roomType: "Double / Twin Room",
    upgradeNote:
      "Final rates depend on travel dates, hotel level, room upgrades, and custom add-ons.",
    overviewTitle:
      "An iconic Sri Lanka route designed for first-time travellers who want culture, scenery, and coastline in one trip",
    longDescription:
      "This package is ideal for travellers who want to experience Sri Lanka’s most loved highlights in a single well-paced itinerary. From ancient rock fortresses and sacred cities to cool hill country escapes and the beauty of the southern coast, it is curated to feel rich, seamless, and memorable from arrival to departure.",
    includedExperiences: [
      "Airport pickup and drop-off",
      "Private vehicle with English-speaking driver-guide",
      "Handpicked accommodation",
      "Daily breakfast",
      "Sightseeing as per itinerary",
      "Travel support throughout the journey",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo and transfer to Sigiriya",
        items: [
          "Airport welcome and private transfer",
          "Relax after arrival and begin your island journey",
          "Overnight stay in the Cultural Triangle region",
        ],
      },
      {
        day: 2,
        title: "Sigiriya exploration and village experiences",
        items: [
          "Visit Sigiriya Rock Fortress",
          "Optional village tour and local lunch experience",
          "Enjoy the peaceful atmosphere of the region",
        ],
      },
      {
        day: 3,
        title: "Cultural discoveries and onward to Kandy",
        items: [
          "Visit Dambulla Cave Temple",
          "Scenic drive toward Kandy",
          "Explore Kandy city and cultural highlights",
        ],
      },
      {
        day: 4,
        title: "Temple heritage and hill country transition",
        items: [
          "Visit the Temple of the Sacred Tooth Relic",
          "Drive into Sri Lanka’s hill country",
          "Check in to a scenic hillside stay",
        ],
      },
      {
        day: 5,
        title: "Tea country and mountain views",
        items: [
          "Enjoy tea plantation scenery",
          "Optional train ride or sightseeing in the hills",
          "Experience cool-climate landscapes and waterfalls",
        ],
      },
      {
        day: 6,
        title: "Journey south toward the coast",
        items: [
          "Travel from the hills to the southern region",
          "Optional safari or en route photo stops",
          "Arrive at your beachside stay",
        ],
      },
      {
        day: 7,
        title: "Leisure on the south coast and Galle",
        items: [
          "Relax by the beach",
          "Visit Galle Fort and explore its colonial charm",
          "Sunset moments on the coast",
        ],
      },
      {
        day: 8,
        title: "Departure transfer",
        items: [
          "Enjoy breakfast at the hotel",
          "Private transfer to the airport",
          "Departure with unforgettable Sri Lanka memories",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Cultural Triangle Journey",
    slug: "cultural-triangle-journey",
    category: "roundtours",
    location: "Dambulla • Sigiriya • Polonnaruwa • Anuradhapura",
    duration: "5 Days / 4 Nights",
    price: "$890",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Dive into Sri Lanka’s cultural heart with temple cities, rock fortresses, and sacred heritage sites.",
    subtitle:
      "A focused heritage journey into the island’s most iconic ancient kingdoms and sacred monuments.",
    route:
      "Dambulla → Sigiriya → Polonnaruwa → Anuradhapura",
    routeSummary: "Ancient Kingdoms • Sacred Heritage • UNESCO Sites",
    accommodation: "Comfortable cultural-region hotels",
    meals: "Daily breakfast",
    travelStyle: "Private heritage journey",
    highlights:
      "Sigiriya, cave temples, ruined capitals, Buddhist heritage, and immersive historical storytelling.",
    flightInfo: "International flights not included",
    guideInfo: "Driver-guide available",
    minimumPax: "Minimum 2 Pax",
    roomType: "Double / Twin Room",
    includedExperiences: [
      "Private transfers",
      "Cultural Triangle sightseeing",
      "Handpicked stays",
      "Daily breakfast",
      "Flexible private touring pace",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and transfer to Cultural Triangle",
        items: [
          "Private transfer to Dambulla / Sigiriya region",
          "Relax and settle into your hotel",
        ],
      },
      {
        day: 2,
        title: "Sigiriya and surrounding heritage",
        items: [
          "Visit Sigiriya Rock Fortress",
          "Enjoy scenic countryside surroundings",
        ],
      },
      {
        day: 3,
        title: "Explore Polonnaruwa",
        items: [
          "Discover the ancient city ruins",
          "Visit temples, statues, and royal remains",
        ],
      },
      {
        day: 4,
        title: "Anuradhapura sacred city",
        items: [
          "Visit sacred stupas and historic religious sites",
          "Learn about Sri Lanka’s early kingdom legacy",
        ],
      },
      {
        day: 5,
        title: "Departure or onward journey",
        items: [
          "Breakfast at hotel",
          "Transfer for departure or next destination",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "South Coast Explorer",
    slug: "south-coast-explorer",
    category: "roundtours",
    location: "Bentota • Mirissa • Weligama • Galle",
    duration: "6 Days / 5 Nights",
    price: "$980",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A tropical coastal escape with beaches, whale watching, surfing vibes, and colonial charm.",
    subtitle:
      "A relaxed south coast route blending golden beaches, surf culture, and charming fort-town heritage.",
    route:
      "Bentota → Mirissa → Weligama → Galle",
    routeSummary: "Beach Escapes • Ocean Life • Colonial Coast",
    accommodation: "Boutique beach hotels",
    meals: "Daily breakfast",
    travelStyle: "Private coastal getaway",
    highlights:
      "Beach relaxation, whale watching, laid-back surf towns, and Galle Fort exploration.",
    flightInfo: "International flights not included",
    guideInfo: "Private transport included",
    minimumPax: "Minimum 2 Pax",
    roomType: "Double / Twin Room",
    includedExperiences: [
      "Private transfers along the coast",
      "Beachside accommodation",
      "Daily breakfast",
      "Flexible coastal sightseeing",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and south coast transfer",
        items: [
          "Begin your journey toward the coast",
          "Check in and relax by the sea",
        ],
      },
      {
        day: 2,
        title: "Beach leisure and local exploration",
        items: [
          "Enjoy beach time and relaxed coastal atmosphere",
          "Optional water-based activities",
        ],
      },
      {
        day: 3,
        title: "Mirissa experience",
        items: [
          "Optional whale watching excursion",
          "Enjoy cafés, beach bars, and ocean scenery",
        ],
      },
      {
        day: 4,
        title: "Weligama and surf-town lifestyle",
        items: [
          "Explore the surf coast",
          "Optional beginner surf session or leisure day",
        ],
      },
      {
        day: 5,
        title: "Galle Fort and heritage coast",
        items: [
          "Visit historic Galle Fort",
          "Explore boutique streets and sunset spots",
        ],
      },
      {
        day: 6,
        title: "Departure transfer",
        items: [
          "Breakfast at hotel",
          "Private transfer for departure",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Ayurveda Wellness Retreat",
    slug: "ayurveda-wellness-retreat",
    category: "retreat-tours",
    location: "Bentota",
    duration: "7 Days / 6 Nights",
    price: "$1,540",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A calming retreat with Ayurveda treatments, nourishing cuisine, and mindful relaxation by the ocean.",
    subtitle:
      "A restorative coastal retreat focused on healing, balance, gentle rituals, and holistic wellbeing.",
    route: "Bentota retreat stay",
    routeSummary: "Wellness • Ayurveda • Ocean Calm",
    accommodation: "Wellness resort / Ayurveda retreat property",
    meals: "Full board wellness meals",
    travelStyle: "Retreat and rejuvenation",
    highlights:
      "Authentic Ayurveda treatments, ocean serenity, nourishing meals, and a deeply restorative travel rhythm.",
    flightInfo: "International flights not included",
    guideInfo: "Retreat assistance available",
    minimumPax: "Minimum 1 Pax",
    roomType: "Wellness room / Deluxe room",
    includedExperiences: [
      "Ayurveda consultation",
      "Daily treatments",
      "Wellness-focused meals",
      "Relaxation and mindfulness sessions",
      "Airport transfers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and retreat check-in",
        items: [
          "Transfer to retreat property",
          "Welcome consultation and rest",
        ],
      },
      {
        day: 2,
        title: "Healing rituals begin",
        items: [
          "Daily Ayurveda therapies",
          "Balanced meals and relaxation time",
        ],
      },
      {
        day: 3,
        title: "Mind-body renewal",
        items: [
          "Continue personalized treatments",
          "Leisure by the ocean or garden spaces",
        ],
      },
      {
        day: 4,
        title: "Deep rest and nourishment",
        items: [
          "Focused wellness programme",
          "Quiet restorative moments",
        ],
      },
      {
        day: 5,
        title: "Gentle movement and healing",
        items: [
          "Optional yoga / breathing practice",
          "Therapies based on consultation",
        ],
      },
      {
        day: 6,
        title: "Closing wellness experiences",
        items: [
          "Final sessions and personal recovery time",
          "Prepare for departure feeling renewed",
        ],
      },
      {
        day: 7,
        title: "Departure transfer",
        items: [
          "Breakfast and retreat checkout",
          "Private transfer to airport",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Yoga & Nature Escape",
    slug: "yoga-and-nature-escape",
    category: "retreat-tours",
    location: "Ella",
    duration: "5 Days / 4 Nights",
    price: "$1,120",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Reconnect through yoga sessions, misty mountain views, and immersive nature experiences.",
    subtitle:
      "A mountain retreat for travellers seeking movement, nature, mindfulness, and clean hill-country air.",
    route: "Ella retreat stay",
    routeSummary: "Yoga • Nature • Mountain Calm",
    accommodation: "Boutique retreat stay in the hills",
    meals: "Breakfast and selected wellness meals",
    travelStyle: "Mindful hill-country escape",
    highlights:
      "Sunrise yoga, scenic viewpoints, fresh mountain air, and gentle restorative travel.",
    flightInfo: "International flights not included",
    guideInfo: "Retreat host support available",
    minimumPax: "Minimum 1 Pax",
    roomType: "Deluxe Room / Nature View Room",
    includedExperiences: [
      "Yoga sessions",
      "Mountain accommodation",
      "Nature-based experiences",
      "Selected meals",
      "Private transfers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Ella",
        items: [
          "Transfer into the hills",
          "Retreat welcome and rest",
        ],
      },
      {
        day: 2,
        title: "Yoga and scenic immersion",
        items: [
          "Morning yoga session",
          "Explore mountain viewpoints and nature",
        ],
      },
      {
        day: 3,
        title: "Slow day in the hills",
        items: [
          "Mindful movement and relaxation",
          "Optional walking trails or leisure",
        ],
      },
      {
        day: 4,
        title: "Wellbeing and mountain atmosphere",
        items: [
          "Another yoga / breathwork session",
          "Quiet time surrounded by greenery",
        ],
      },
      {
        day: 5,
        title: "Departure day",
        items: [
          "Breakfast and checkout",
          "Transfer onward or to airport",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Mindfulness in the Hills",
    slug: "mindfulness-in-the-hills",
    category: "retreat-tours",
    location: "Nuwara Eliya",
    duration: "4 Days / 3 Nights",
    price: "$920",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A peaceful hill country retreat designed for stillness, reflection, and soft luxury.",
    subtitle:
      "A gentle highland retreat with cool-climate serenity, tea-country scenery, and moments of stillness.",
    route: "Nuwara Eliya retreat stay",
    routeSummary: "Tea Country • Calm • Reflection",
    accommodation: "Elegant hill-country stay",
    meals: "Breakfast and selected meals",
    travelStyle: "Slow and mindful retreat",
    highlights:
      "Tea landscapes, crisp mountain weather, reflective downtime, and soft-luxury comfort.",
    flightInfo: "International flights not included",
    guideInfo: "Available on request",
    minimumPax: "Minimum 1 Pax",
    roomType: "Deluxe Room",
    includedExperiences: [
      "Hill-country accommodation",
      "Selected meals",
      "Private transfers",
      "Flexible quiet retreat pace",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in tea country",
        items: [
          "Transfer into Nuwara Eliya region",
          "Check in and settle into your retreat stay",
        ],
      },
      {
        day: 2,
        title: "Mindful hill-country day",
        items: [
          "Leisurely breakfast with scenic views",
          "Explore tea landscapes or relax at the hotel",
        ],
      },
      {
        day: 3,
        title: "Stillness and reflection",
        items: [
          "Unhurried morning in the mountains",
          "Optional gentle sightseeing or wellness time",
        ],
      },
      {
        day: 4,
        title: "Departure",
        items: [
          "Breakfast and checkout",
          "Private transfer onward",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Build Your Dream Sri Lanka",
    slug: "build-your-dream-sri-lanka",
    category: "customize-your-own-trip",
    location: "Islandwide",
    duration: "Flexible",
    price: "Custom Quote",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Create a personalized trip based on your dates, interests, pace, accommodation style, and travel goals.",
    subtitle:
      "A fully flexible Sri Lanka experience designed around your exact travel vision.",
    route: "Customized islandwide routing",
    routeSummary: "Tailor-Made • Private • Flexible",
    accommodation: "Customized to preference",
    meals: "Based on selected plan",
    travelStyle: "Tailor-made private journey",
    highlights:
      "Complete flexibility across destinations, stays, experiences, budget, and pace.",
    flightInfo: "Flights can be arranged separately",
    guideInfo: "Private driver / guide options available",
    minimumPax: "Flexible",
    roomType: "Customized room selection",
    includedExperiences: [
      "Personalized itinerary planning",
      "Hotel curation",
      "Route design",
      "Private transport options",
      "Custom experience recommendations",
    ],
    itinerary: [
      {
        day: 1,
        title: "Trip planning consultation",
        items: [
          "Define destinations, travel style, and pace",
          "Curate the best route based on your interests",
        ],
      },
      {
        day: 2,
        title: "Tailor-made package design",
        items: [
          "Accommodation and experiences selected",
          "Build a journey around your budget and preferences",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "South Coast Beach Escape",
    slug: "south-coast-beach-escape",
    category: "beach-holiday",
    location: "Unawatuna • Mirissa",
    duration: "5 Days / 4 Nights",
    price: "$860",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Sun, sea, and soft sands with boutique beach stays and relaxed coastal experiences.",
    subtitle:
      "A tropical beach break designed for relaxation, easy coastal living, and sun-filled days.",
    route: "Unawatuna → Mirissa",
    routeSummary: "Beach Time • Coastal Leisure • Tropical Ease",
    accommodation: "Boutique beach hotels",
    meals: "Daily breakfast",
    travelStyle: "Relaxed beach getaway",
    highlights:
      "Golden sands, ocean views, relaxed cafés, and memorable coastal downtime.",
    flightInfo: "International flights not included",
    guideInfo: "Private transfers included",
    minimumPax: "Minimum 2 Pax",
    roomType: "Double / Twin Room",
    includedExperiences: [
      "Beach accommodation",
      "Private transfers",
      "Daily breakfast",
      "Flexible leisure itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival to the south coast",
        items: [
          "Private transfer to your beach stay",
          "Relax and enjoy the first evening by the sea",
        ],
      },
      {
        day: 2,
        title: "Leisure beach day",
        items: [
          "Free time to enjoy the beach and hotel",
          "Optional local experiences nearby",
        ],
      },
      {
        day: 3,
        title: "Explore Mirissa vibes",
        items: [
          "Visit Mirissa beach area",
          "Enjoy sunset views and relaxed coastal dining",
        ],
      },
      {
        day: 4,
        title: "Slow travel by the ocean",
        items: [
          "Restful beach day",
          "Optional massage, café visits, or swimming",
        ],
      },
      {
        day: 5,
        title: "Departure",
        items: [
          "Breakfast and checkout",
          "Private transfer onward",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Luxury Beach Stay",
    slug: "luxury-beach-stay",
    category: "beach-holiday",
    location: "Tangalle",
    duration: "4 Days / 3 Nights",
    price: "$1,320",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A premium beach holiday with elegant stays, private transfers, and refined tropical comfort.",
    subtitle:
      "A sophisticated coastline escape for travellers who want privacy, design, and elevated comfort by the sea.",
    route: "Tangalle luxury beach stay",
    routeSummary: "Luxury • Privacy • Oceanfront Comfort",
    accommodation: "Luxury beach resort / villa stay",
    meals: "Breakfast with selected premium inclusions",
    travelStyle: "Luxury coastal retreat",
    highlights:
      "Elegant beachfront living, peaceful surroundings, and refined tropical hospitality.",
    flightInfo: "International flights not included",
    guideInfo: "Private transfers included",
    minimumPax: "Minimum 2 Pax",
    roomType: "Ocean View / Suite options",
    includedExperiences: [
      "Luxury accommodation",
      "Private transfers",
      "Breakfast",
      "Premium beachside leisure",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at luxury beach retreat",
        items: [
          "Private transfer to Tangalle",
          "Check in to your premium beach property",
        ],
      },
      {
        day: 2,
        title: "Exclusive leisure by the ocean",
        items: [
          "Enjoy resort comforts and beachside relaxation",
          "Optional spa or curated dining experience",
        ],
      },
      {
        day: 3,
        title: "Refined tropical downtime",
        items: [
          "Slow morning with ocean views",
          "Relax in privacy and comfort",
        ],
      },
      {
        day: 4,
        title: "Departure",
        items: [
          "Breakfast and checkout",
          "Private transfer onward",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Remote Work in Sri Lanka",
    slug: "remote-work-in-sri-lanka",
    category: "long-stay",
    location: "Weligama • Ahangama",
    duration: "14+ Days",
    price: "Custom Quote",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Extended stays tailored for digital nomads, featuring comfortable accommodation and lifestyle flexibility.",
    subtitle:
      "A lifestyle-driven long-stay package for remote workers seeking comfort, community, and ocean energy.",
    route: "Weligama ↔ Ahangama long stay",
    routeSummary: "Remote Work • Lifestyle • Coastal Long Stay",
    accommodation: "Serviced villa / apartment / boutique stay",
    meals: "Flexible meal basis",
    travelStyle: "Digital nomad long stay",
    highlights:
      "Comfortable long-stay living, work-life balance, surf-town atmosphere, and tropical routine.",
    flightInfo: "Flights not included",
    guideInfo: "Support available on request",
    minimumPax: "Flexible",
    roomType: "Studio / Apartment / Deluxe Room",
    includedExperiences: [
      "Long-stay accommodation options",
      "Airport transfers",
      "Lifestyle-based support",
      "Flexible route and stay customisation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and settle into your base",
        items: [
          "Airport pickup and transfer",
          "Check in to your long-stay accommodation",
        ],
      },
      {
        day: 2,
        title: "Work-life routine begins",
        items: [
          "Set up your stay for productivity and leisure",
          "Explore nearby cafés and lifestyle spots",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Monthly Villa Stays",
    slug: "monthly-villa-stays",
    category: "long-stay",
    location: "Galle • Mirissa",
    duration: "30 Days",
    price: "Custom Quote",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "Enjoy tropical slow living with curated long-stay villas and personalized local support.",
    subtitle:
      "A premium long-stay concept built around privacy, comfort, and soft tropical living.",
    route: "Galle / Mirissa long-stay villa base",
    routeSummary: "Villa Living • Privacy • Extended Escape",
    accommodation: "Private villa stays",
    meals: "Flexible / self-catering / optional services",
    travelStyle: "Extended private stay",
    highlights:
      "Beautiful villa living, longer stays, slower pace, and elevated tropical comfort.",
    flightInfo: "Flights not included",
    guideInfo: "On-ground support available",
    minimumPax: "Flexible",
    roomType: "Private villa / suite",
    includedExperiences: [
      "Villa accommodation curation",
      "Airport transfer options",
      "Extended-stay support",
      "Custom local recommendations",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and villa check-in",
        items: [
          "Transfer to villa property",
          "Settle into your extended tropical base",
        ],
      },
      {
        day: 2,
        title: "Begin your slow-living stay",
        items: [
          "Relax into the rhythm of the coast",
          "Optional services and local experiences available",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Best of December Travel",
    slug: "best-of-december-travel",
    category: "seasonal-travelling",
    location: "South & West Coast",
    duration: "7 Days / 6 Nights",
    price: "$1,180",
    image: "/packages/adventure.jfif",
    heroImage: "/packages/adventure.jfif",
    galleryImages: [
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
      "/packages/adventure.jfif",
    ],
    mapImage: "/packages/maptest1.png",
    shortDescription:
      "A December-perfect itinerary built around the best beaches, weather, and seasonal experiences.",
    subtitle:
      "A seasonally timed Sri Lanka escape designed around ideal coastal weather and festive travel energy.",
    route: "South & West Coast seasonal route",
    routeSummary: "Seasonal Highlights • December Coast • Sunny Escape",
    accommodation: "Beach and boutique stays",
    meals: "Daily breakfast",
    travelStyle: "Seasonal curated getaway",
    highlights:
      "Best-weather destinations, festive atmosphere, beach days, and easy year-end travel flow.",
    flightInfo: "International flights not included",
    guideInfo: "Private transport available",
    minimumPax: "Minimum 2 Pax",
    roomType: "Double / Twin Room",
    includedExperiences: [
      "Seasonally curated route",
      "Accommodation",
      "Daily breakfast",
      "Flexible transfers and support",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and coastal start",
        items: [
          "Transfer to your first December-season destination",
          "Check in and relax",
        ],
      },
      {
        day: 2,
        title: "Beach and sunshine day",
        items: [
          "Enjoy ideal seasonal weather",
          "Optional ocean or leisure activities",
        ],
      },
      {
        day: 3,
        title: "Explore south / west coast highlights",
        items: [
          "Flexible sightseeing along the coast",
          "Enjoy cafés, beaches, and seasonal atmosphere",
        ],
      },
      {
        day: 4,
        title: "Relaxed travel flow",
        items: [
          "Beach downtime and easy travel pace",
          "Optional excursions available",
        ],
      },
      {
        day: 5,
        title: "More seasonal coastal discovery",
        items: [
          "Continue enjoying ideal weather regions",
          "Leisure and lifestyle moments",
        ],
      },
      {
        day: 6,
        title: "Final coastal day",
        items: [
          "Enjoy one more beachside day",
          "Optional shopping or sunset experience",
        ],
      },
      {
        day: 7,
        title: "Departure",
        items: [
          "Breakfast and checkout",
          "Private transfer onward",
        ],
      },
    ],
  },
];