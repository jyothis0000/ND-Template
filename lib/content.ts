// All copy, links and images below come from https://nationaldispatching.com.
// Cart checkout, logins and per-state location pages link out to the live site.
import catalogData from "./data/catalog.json";

export const nd = (path: string) => `https://nationaldispatching.com${path}`;

export type Link = { label: string; href: string };

export const contact = {
  phone: "888.705.5616",
  tel: "tel:+18887055616",
  email: "dispatch@nationaldispatching.com",
  hours: "Mon – Fri: 7:00am – 5:00pm PST",
  address: "5125 N. Gates Ave., Ste. 102 Fresno, CA 93722",
  quoteHref: "/contact-us",
  locationsHref: "/locations",
  reviewsHref: "https://www.google.com/maps/search/?api=1&query=National+Dispatching+Fresno+CA",
  searchAction: "/search",
};

// ---- Equipment catalog (scraped from nationaldispatching.com/equipment/*)
export type Category = { slug: string; label: string; title: string; intro: string[]; count: number };
export type Product = {
  slug: string;
  ndSlug: string;
  label: string;
  category: string;
  overview: string; // "Equipment Overview" copy from the live product page
  day: string;
  week: string;
  month: string;
  image: string;
};
const catalog = catalogData as { categories: Category[]; products: Product[] };

const categoryImages: Record<string, string> = {
  "aerial-work-platforms": "/images/cat-aerial.png",
  "forklifts-material-handling": "/images/cat-forklifts.png",
  "earthmoving-equipment": "/images/cat-earthmoving.png",
  compaction: "/images/cat-compaction.png",
  "generators-light-towers": "/images/cat-generators.png",
  "pumps-tanks-filtration": "/images/cat-pumps.png",
  "portable-sanitation-services": "/images/cat-sanitation.png",
  "construction-site-services": "/images/cat-site-services.png",
  "trucks-trailers": "/images/cat-trucks.png",
};
export const categories: (Link & Category & { image: string })[] = catalog.categories.map((c) => ({
  ...c,
  href: `/equipment/${c.slug}`,
  image: categoryImages[c.slug],
}));
export const allEquipment: Link = { label: "All equipment", href: "/equipment" };

export type Kind = "articulating" | "telescopic" | "electric-scissor" | "rt-scissor";
export type Rental = Link &
  Product & {
    ndHref: string; // the live product page
    photo: string;
    kind?: Kind; // aerial lifts only
    height?: number; // ft, aerial lifts only
  };

// Lift type + height for the aerial work platforms (drives the lift-specific product copy).
const aerial: Record<string, [Kind, number]> = {
  "80-ft-diesel-articulating-boom-lift": ["articulating", 80],
  "65-66-ft-diesel-articulating-boom-lift": ["articulating", 66],
  "60-ft-diesel-telescopic-boom-lift": ["telescopic", 60],
  "45-ft-diesel-articulating-boom-lift": ["articulating", 45],
  "40-ft-diesel-telescopic-boom-lift": ["telescopic", 40],
  "40-ft-electric-scissor-lift": ["electric-scissor", 40],
  "43-ft-rough-terrain-scissor-lift-4wd": ["rt-scissor", 43],
  "26-ft-rough-terrain-scissor-lift-4wd": ["rt-scissor", 26],
  "32-ft-electric-scissor-lift": ["electric-scissor", 32],
  "32-ft-rough-terrain-scissor-lift-4wd": ["rt-scissor", 32],
  "19-ft-electric-scissor-lift": ["electric-scissor", 19],
  "26-ft-electric-scissor-lift": ["electric-scissor", 26],
};

export const allRentals: Rental[] = catalog.products.map((p) => ({
  ...p,
  href: `/products/${p.slug}`,
  ndHref: nd(`/product/${p.ndSlug}/`),
  photo: p.image,
  kind: aerial[p.slug]?.[0],
  height: aerial[p.slug]?.[1],
}));
// "Popular Rentals" on the nationaldispatching.com homepage, in its order.
export const rentals: Rental[] = Object.keys(aerial).map((slug) => allRentals.find((r) => r.slug === slug)!);
export const getRental = (slug: string) => allRentals.find((r) => r.slug === slug);
export const inCategory = (slug: string) => allRentals.filter((r) => r.category === slug);
export const categoryOf = (r: Rental) => categories.find((c) => c.slug === r.category)!;

export const services: (Link & { slug: string })[] = [
  { slug: "rentals", label: "Rentals", href: "/services/rentals" },
  { slug: "materials", label: "Materials", href: "/services/materials" },
  { slug: "trucking", label: "Trucking", href: "/services/trucking" },
  { slug: "subcontracting", label: "Subcontracting", href: "/services/subcontracting" },
  { slug: "procurement-dispatching", label: "Procurement & Dispatching", href: "/services/procurement-dispatching" },
];

export const guides: Link[] = [
  { label: "Track loader or skid steer?", href: "/blog/compact-track-loader-skid-steer" },
  { label: "Ordering bagged cement & grout", href: "/blog/bagged-cement-mortar-grout-ordering" },
  { label: "Precast, block or pipe?", href: "/blog/concrete-products-procuremen" },
];

export const moreLinks: Link[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Customer Login", href: "https://myaccount.nationaldispatching.com/Customers/s/" },
  { label: "Vendor Login", href: "https://myaccount.nationaldispatching.com/vss" },
];

export const mobileBigLinks: Link[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export const locationOptions = ["California", "Other"];

export type Review = { quote: string; name: string };
// Google reviews shown on nationaldispatching.com
export const reviews: Review[] = [
  { name: "Eevee G.", quote: "National Dispatching has been an absolute pleasure to work with!! Vanessa was professional, responsive, and incredibly reliable. From the first call to the equipment pickup, everything was handled smoothly and efficiently." },
  { name: "Wylie S.", quote: "National Dispatch does it all! They are always on top of things and respond very quickly! Whether it’s backfill material or concrete or what have you, National Dispatch has you covered!" },
  { name: "Joe P.", quote: "Ramiro and his team assisted with Class II AB, concrete, and sand delivery, as well as providing our trash dumpster. The National Dispatch team always seems to come through, even with last minute requests and ever changing schedules." },
  { name: "Mario C.", quote: "National Dispatching has always come through for all of our projects with ordering backfill material, water needs and rentals. Ramiro and his team are absolutely the best to work with." },
  { name: "Chenchang V.", quote: "I have had an excellent experience working with this company. Vanessa has been exceptional. She responds to emails promptly and provides outstanding customer service. Their pricing is fair." },
  { name: "James J.", quote: "They have always been professional and provided excellent customer service. Their prices have always been very competitive, they have always delivered their equipment on time (usually early)." },
  { name: "M. R.", quote: "Ramiro's expertise in rental units and materials is unmatched, while Stephanie's responsiveness is exceptional. The competitive pricing, one-stop-shop convenience, and their quick response time make them my go-to." },
  { name: "Matthew S.", quote: "The management and staff at National Dispatching is very professional, their communication is top tier with very quick responses to questions we have." },
  { name: "Chuck A.", quote: "These guys are the best! Great rates, prompt response, and can find all the equipment. Thanks" },
  { name: "Andre G.", quote: "Great customer service & great equipment. Highly recommend" },
  { name: "Noah K.", quote: "Great to work with. Very fast and reliable." },
  { name: "Carlo E.", quote: "I highly recommend their service. Thank you for the wonderful services." },
];
export const featuredReview: Review = {
  name: "Dan",
  quote: "I have rented equipment multiple times in the past few years. They always know exactly what I need and equipment arrives on time. The process is quick and stress free.",
};

export const galleryTiles = [
  { image: "/images/project.jpg", quote: "Great to work with. Very fast and reliable.", name: "Noah K." },
  { image: "/images/p-80ft-boom.webp", quote: "Great customer service & great equipment", name: "Andre G." },
  { image: "/images/blog-loader.webp", quote: "Great rates, prompt response, and can find all the equipment", name: "Chuck A." },
  { image: "/images/cat-earthmoving.png", quote: "National Dispatch does it all!", name: "Wylie S." },
  { image: "/images/about-national.jpg", quote: "An absolute pleasure to work with", name: "Eevee G." },
  { image: "/images/p-43ft-rt-scissor.webp", quote: "Equipment arrives on time. The process is quick", name: "Dan" },
  { image: "/images/blog-precast.webp", quote: "The team always seems to come through", name: "Joe P." },
  { image: "/images/cat-forklifts.png", quote: "Delivered their equipment on time (usually early)", name: "James J." },
  { image: "/images/blog-cement.webp", quote: "Ramiro and his team are absolutely the best", name: "Mario C." },
  { image: "/images/p-60ft-tele.webp", quote: "Responds promptly with outstanding service", name: "Chenchang V." },
  { image: "/images/banner-mobile.webp", quote: "Their communication is top tier", name: "Matthew S." },
  { image: "/images/cat-trucks.png", quote: "One-stop-shop convenience and quick response", name: "M. R." },
  { image: "/images/cat-generators.png", quote: "I highly recommend their service", name: "Carlo E." },
  { image: "/images/p-26ft-rt-scissor.webp", quote: "Professional, responsive, and reliable", name: "Eevee G." },
];

export const industries = [
  "Manufacturing", "Transportation", "Dams & Flood Control", "Commercial", "Residential",
  "Agriculture", "Water Infrastructure", "Oil/Gas", "Communication", "Energy",
];

export const faqs = [
  { q: "What does National Dispatching do?", a: "We are a single, reliable source for construction equipment rentals, building materials, trucking, subcontracting, and procurement & dispatching. One call covers your project needs, so you don’t have to deal with multiple vendors." },
  { q: "Where are you located?", a: "National Dispatching was established in 2010 and is headquartered in Fresno, California. We serve contractors nationwide through a network of more than 5,000 qualified local partners." },
  { q: "What equipment can I rent?", a: "Aerial work platforms, forklifts & material handling, earthmoving equipment, compaction, generators & light towers, pumps, tanks & filtration, portable sanitation, construction site services, and trucks & trailers." },
  { q: "How does the process work?", a: "We start with a consultation to understand your project needs, source the right equipment and materials from our qualified suppliers, secure competitive pricing, and handle delivery and transportation logistics through project completion." },
  { q: "Can I book equipment online?", a: "Yes. Our easy-to-use online booking system lets you reserve rental equipment in just minutes. You can also book by phone with central dispatch at 888.705.5616." },
  { q: "Do you supply construction materials too?", a: "Yes. Alongside rentals we source materials such as backfill, aggregate base, sand, concrete products, and bagged cement, mortar and grout, coordinated with your install schedule." },
  { q: "What is the Rental Equipment Protection Plan (REP®)?", a: "REP® provides coverage for specified damages or loss to the rental equipment. REP® amounts can be refunded if you provide a valid Certificate of Insurance (COI) meeting required limits and language prior to delivery. Terms and conditions apply, and a deductible is required in the event of loss." },
  { q: "Do you handle rental extensions and pickup?", a: "Yes. We manage rental extensions, notify suppliers of charges, promptly invoice any extras, and ensure equipment is removed from your site when the job is done." },
  { q: "What are your hours?", a: "Corporate hours are Monday – Friday, 7:00am – 5:00pm PST, closed Saturday and Sunday. Dispatch offers customized project support around your schedule." },
];

// Service areas per state from nationaldispatching.com/locations, with approximate state centroids for the map.
export const states = [
  { name: "Alabama", slug: "alabama", count: 29, lat: 32.8, lng: -86.8 },
  { name: "Alaska", slug: "alaska", count: 5, lat: 61.4, lng: -150.0 },
  { name: "Arizona", slug: "arizona", count: 20, lat: 34.2, lng: -111.7 },
  { name: "Arkansas", slug: "arkansas", count: 15, lat: 34.9, lng: -92.4 },
  { name: "California", slug: "california", count: 243, lat: 36.8, lng: -119.4 },
  { name: "Colorado", slug: "colorado", count: 20, lat: 39.0, lng: -105.5 },
  { name: "Connecticut", slug: "connecticut", count: 12, lat: 41.6, lng: -72.7 },
  { name: "Delaware", slug: "delaware", count: 2, lat: 39.0, lng: -75.5 },
  { name: "Florida", slug: "florida", count: 65, lat: 28.6, lng: -82.4 },
  { name: "Georgia", slug: "georgia", count: 46, lat: 32.7, lng: -83.4 },
  { name: "Hawaii", slug: "hawaii", count: 2, lat: 20.8, lng: -156.3 },
  { name: "Idaho", slug: "idaho", count: 12, lat: 44.1, lng: -114.7 },
  { name: "Illinois", slug: "illinois", count: 42, lat: 40.0, lng: -89.2 },
  { name: "Indiana", slug: "indiana", count: 13, lat: 39.9, lng: -86.3 },
  { name: "Iowa", slug: "iowa", count: 9, lat: 42.0, lng: -93.5 },
  { name: "Kansas", slug: "kansas", count: 13, lat: 38.5, lng: -98.4 },
  { name: "Kentucky", slug: "kentucky", count: 10, lat: 37.5, lng: -85.3 },
  { name: "Louisiana", slug: "louisiana", count: 34, lat: 31.0, lng: -92.0 },
  { name: "Maine", slug: "maine", count: 8, lat: 45.4, lng: -69.2 },
  { name: "Maryland", slug: "maryland", count: 22, lat: 39.0, lng: -76.8 },
  { name: "Massachusetts", slug: "massachusetts", count: 15, lat: 42.3, lng: -71.8 },
  { name: "Michigan", slug: "michigan", count: 16, lat: 43.3, lng: -84.5 },
  { name: "Minnesota", slug: "minnesota", count: 21, lat: 46.3, lng: -94.3 },
  { name: "Mississippi", slug: "mississippi", count: 15, lat: 32.7, lng: -89.7 },
  { name: "Missouri", slug: "missouri", count: 25, lat: 38.4, lng: -92.5 },
  { name: "Montana", slug: "montana", count: 5, lat: 47.0, lng: -109.6 },
  { name: "Nebraska", slug: "nebraska", count: 3, lat: 41.5, lng: -99.8 },
  { name: "Nevada", slug: "nevada", count: 12, lat: 39.3, lng: -116.6 },
  { name: "New Hampshire", slug: "new-hampshire", count: 6, lat: 43.7, lng: -71.6 },
  { name: "New Jersey", slug: "new-jersey", count: 37, lat: 40.2, lng: -74.7 },
  { name: "New Mexico", slug: "new-mexico", count: 8, lat: 34.4, lng: -106.1 },
  { name: "New York", slug: "new-york", count: 40, lat: 42.9, lng: -75.5 },
  { name: "North Carolina", slug: "north-carolina", count: 32, lat: 35.6, lng: -79.4 },
  { name: "North Dakota", slug: "north-dakota", count: 6, lat: 47.5, lng: -100.5 },
  { name: "Ohio", slug: "ohio", count: 38, lat: 40.3, lng: -82.8 },
  { name: "Oklahoma", slug: "oklahoma", count: 26, lat: 35.6, lng: -97.5 },
  { name: "Oregon", slug: "oregon", count: 30, lat: 43.9, lng: -120.6 },
  { name: "Pennsylvania", slug: "pennsylvania", count: 47, lat: 40.9, lng: -77.8 },
  { name: "Rhode Island", slug: "rhode-island", count: 3, lat: 41.7, lng: -71.5 },
  { name: "South Carolina", slug: "south-carolina", count: 24, lat: 33.9, lng: -80.9 },
  { name: "South Dakota", slug: "south-dakota", count: 2, lat: 44.4, lng: -100.2 },
  { name: "Tennessee", slug: "tennessee", count: 23, lat: 35.9, lng: -86.4 },
  { name: "Texas", slug: "texas", count: 126, lat: 31.5, lng: -99.3 },
  { name: "Utah", slug: "utah", count: 17, lat: 39.3, lng: -111.7 },
  { name: "Vermont", slug: "vermont", count: 3, lat: 44.1, lng: -72.7 },
  { name: "Virginia", slug: "virginia", count: 33, lat: 37.5, lng: -78.9 },
  { name: "Washington", slug: "washington", count: 47, lat: 47.4, lng: -120.5 },
  { name: "West Virginia", slug: "west-virginia", count: 11, lat: 38.6, lng: -80.6 },
  { name: "Wisconsin", slug: "wisconsin", count: 19, lat: 44.6, lng: -89.9 },
  { name: "Wyoming", slug: "wyoming", count: 7, lat: 43.0, lng: -107.6 },
].map((s) => ({ ...s, href: nd(`/locations/${s.slug}/`) }));

export const footer = {
  about: "Professional procurement and dispatching solutions for the construction industry. One call for rentals, materials and trucking.",
  social: {
    facebook: "https://www.facebook.com/nationaldispatching",
    linkedin: "https://www.linkedin.com/company/nationaldispatching",
    youtube: "https://www.youtube.com/@NationalDispatching",
    instagram: "https://www.instagram.com/national_dispatching",
  },
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Vision & Mission", href: "/about-us#vision-mission" },
    { label: "Our Values", href: "/about-us#our-values" },
    { label: "Past Performance", href: "/about-us#performance" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  resources: [...services, { label: "Blog", href: "/blog" }, { label: "Service Locations", href: "/locations" }],
  account: [
    { label: "Corporate Login", href: "https://myaccount.nationaldispatching.com/Customers/s/" },
    { label: "Customer Login", href: "https://myaccount.nationaldispatching.com/Customers/s/" },
    { label: "Vendor Login", href: "https://myaccount.nationaldispatching.com/vss" },
    { label: "Your Cart", href: "/cart" },
  ],
  legal: [
    { label: "Locations", href: "/locations" },
    { label: "Privacy Policy", href: nd("/privacy-policy/") },
    { label: "Terms of Use", href: nd("/terms-of-use/") },
  ],
};
