export type TravelPackage = {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  status: "Published" | "Draft";
};

export type BlogPost = {
  id: number;
  title: string;
  category: string;
  author: string;
  coverImage: string;
  description?: string;
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

export const initialTravelPackages: TravelPackage[] = [
  {
    id: 1,
    title: "Southern Beach Escape",
    location: "Mirissa",
    duration: "4 Days / 3 Nights",
    price: "$320",
    image: "/packages/adventure.jfif",
    status: "Published",
  },
  {
    id: 2,
    title: "Hill Country Adventure",
    location: "Ella",
    duration: "3 Days / 2 Nights",
    price: "$240",
    image: "/packages/classic.jfif",
    status: "Draft",
  },
];

export const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Places to Visit in Sri Lanka",
    category: "Cultural Heritage",
    author: "Admin",
    coverImage: "/packages/romance.jfif",
    description:
      "<p>Discover the most beautiful and unforgettable destinations across Sri Lanka, from ancient cities to scenic coastal escapes.</p>",
    status: "Published",
  },
  {
    id: 2,
    title: "Best Beaches for a Relaxing Getaway",
    category: "Beaches & Coastal Activities",
    author: "Admin",
    coverImage: "/packages/wellness.jfif",
    description:
      "<p>Explore Sri Lanka’s most peaceful beach destinations for sun, sea, and a truly relaxing tropical experience.</p>",
    status: "Draft",
  },
];