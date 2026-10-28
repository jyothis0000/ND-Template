// Product-page copy. Per-lift wording comes from each lift type's overview on
// nationaldispatching.com; rental terms, REP® and process copy come from its
// product, About and Procurement & Dispatching pages.
import { allRentals, categoryOf, contact, type Kind, type Rental } from "./content";

export const productPhone = { label: "559.705.2444", tel: "tel:+15597052444" }; // "Book By Phone" on the live product pages

type KindInfo = {
  label: string;
  size: (h: number) => string;
  power: string;
  surface: string;
  tagline: (h: number) => string;
  subtitle: string;
  callout: string;
  alsoCalled: string[];
  bestFor: string[];
  why: { title: string; body: (h: number) => string }[];
  uses: { title: string; body: string }[];
};

export const kinds: Record<Kind, KindInfo> = {
  articulating: {
    label: "Articulating boom lift",
    size: (h) => `${h} ft platform height`,
    power: "Diesel",
    surface: "—",
    tagline: (h) => `${h} ft platform height, diesel, delivered to your job site`,
    subtitle: "Up-and-over reach for tight, hard-to-reach work areas",
    callout: "Multiple boom sections hinge or “articulate,” so the operator can reach work areas over obstacles and barriers.",
    alsoCalled: ["knuckle boom", "up-and-over boom"],
    bestFor: ["Tight access", "Over obstacles", "Hard-to-reach areas"],
    why: [
      { title: "Up-and-Over Reach", body: () => "Hinged boom sections reach over obstacles and barriers to the work area." },
      { title: "Tight Access", body: () => "A versatile machine for tight access and hard-to-reach areas." },
      { title: "Platform Height", body: (h) => `Up to ${h} ft of platform height for elevated work.` },
    ],
    uses: [
      { title: "Tight access", body: "Position the platform in confined work areas where a straight boom can't line up." },
      { title: "Over obstacles", body: "Hinge up and over barriers, equipment and structures to reach the work." },
      { title: "Hard-to-reach areas", body: "Get crews to elevated work that sits behind or above other obstructions." },
    ],
  },
  telescopic: {
    label: "Telescopic boom lift",
    size: (h) => `${h} ft platform height`,
    power: "Diesel",
    surface: "—",
    tagline: (h) => `${h} ft straight boom, diesel, delivered to your job site`,
    subtitle: "The greatest horizontal outreach of any aerial platform",
    callout: "Boom sections extend telescopically, which is why these are also commonly known as “stick” booms.",
    alsoCalled: ["stick boom", "straight boom"],
    bestFor: ["Construction", "Industrial", "Bridge work", "Painting", "Inspection"],
    why: [
      { title: "Maximum Outreach", body: () => "Greater horizontal outreach than any other type of aerial platform." },
      { title: "Limited-Access Areas", body: () => "Reach across to work areas the machine can't drive up to." },
      { title: "Platform Height", body: (h) => `${h} ft of platform height for elevated work.` },
    ],
    uses: [
      { title: "Construction", body: "Reach out over the job site from wherever the machine can set up." },
      { title: "Industrial", body: "Access elevated equipment and structures in plants and yards." },
      { title: "Bridge work", body: "Extend out to work areas with limited access from below." },
      { title: "Painting", body: "Long straight reach for coating walls, structures and steel." },
      { title: "Inspection", body: "Put an inspector at height without scaffolding the area." },
      { title: "Entertainment", body: "Rig and light venues and stages from a stable platform." },
    ],
  },
  "electric-scissor": {
    label: "Electric scissor lift",
    size: (h) => `${h} ft working height`,
    power: "Electric",
    surface: "Hard, level surfaces",
    tagline: (h) => `${h} ft working height, electric, for hard level surfaces`,
    subtitle: "Indoor and outdoor aerial construction and maintenance",
    callout: "Best suited to operate from hard, flat surfaces, indoors or outdoors.",
    alsoCalled: [],
    bestFor: ["Sign hanging", "Ceiling work", "Wall work", "Maintenance"],
    why: [
      { title: "Indoor & Outdoor", body: () => "Ideal for indoor and outdoor aerial construction and maintenance projects." },
      { title: "Hard, Level Surfaces", body: () => "Built to work from hard, flat surfaces like slabs and paved areas." },
      { title: "Working Height", body: (h) => `Working heights reaching ${h} ft.` },
    ],
    uses: [
      { title: "Sign hanging", body: "Lift crews and signage to height from a stable, level platform." },
      { title: "Ceiling work", body: "Overhead installs and repairs from hard, level floors." },
      { title: "Wall work", body: "Move along a wall at a steady working height." },
      { title: "Maintenance", body: "Indoor and outdoor aerial maintenance on finished surfaces." },
    ],
  },
  "rt-scissor": {
    label: "Rough terrain scissor lift",
    size: (h) => `${h} ft working height`,
    power: "4WD",
    surface: "Unpaved surfaces",
    tagline: (h) => `${h} ft working height, 4WD, built for unpaved job sites`,
    subtitle: "Scissor lift height for unpaved job site conditions",
    callout: "Four-wheel drive and rough terrain capability for job sites where operation on unpaved surfaces is required.",
    alsoCalled: ["RT scissor lift", "4WD scissor lift"],
    bestFor: ["Unpaved job sites", "Outdoor construction", "Site work"],
    why: [
      { title: "Rough Terrain Ready", body: () => "Made for job site conditions where operation on unpaved surfaces is required." },
      { title: "4WD", body: () => "Four-wheel drive to get across the site to the work." },
      { title: "Working Height", body: (h) => `Working heights reaching ${h} ft.` },
    ],
    uses: [
      { title: "Unpaved job sites", body: "Work from dirt, gravel and graded ground where a slab scissor can't go." },
      { title: "Outdoor construction", body: "Framing, siding and exterior work on active sites." },
      { title: "Site work", body: "Get crews to height before paving and finishes are in." },
    ],
  },
};

export const delivered = { title: "Delivered to Your Site", body: "Delivered right to your project site on time and in perfect condition." };

// Copy for everything outside aerial work platforms, from the category intros on
// nationaldispatching.com/equipment/* and the matching cards on its service pages.
type CategoryInfo = { label: string; subtitle: string; callout: string; bestFor: string[]; why: { title: string; body: string }[]; uses: { title: string; body: string }[] };
const categoryInfo: Record<string, CategoryInfo> = {
  "forklifts-material-handling": {
    label: "Material handling equipment",
    subtitle: "Safely move your materials over soft, rough, or uneven terrain",
    callout: "Ideal for placement of material on the toughest terrain on any project, both construction and industrial.",
    bestFor: ["Material placement", "Rough terrain", "Construction", "Industrial"],
    why: [
      { title: "Rough Terrain", body: "Move materials over soft, rough, or uneven ground." },
      { title: "Material Placement", body: "Place loads where the crew needs them, at height." },
      { title: "Any Site", body: "Works on both commercial and residential sites." },
    ],
    uses: [
      { title: "Material placement", body: "Set pallets and materials at height on the toughest terrain." },
      { title: "Construction", body: "Keep building materials moving across an active site." },
      { title: "Industrial", body: "Handle loads around plants, yards and warehouses." },
    ],
  },
  "earthmoving-equipment": {
    label: "Earthmoving equipment",
    subtitle: "Excavators, skid steers, backhoes and dozers for any earthmoving job",
    callout: "Our excavators, scrapers, skid steers, and backhoes can tackle any earthmoving job you need done, whether private or commercial.",
    bestFor: ["Excavation", "Grading", "Trenching", "Loading"],
    why: [
      { title: "Any Earthmoving Job", body: "Private or commercial, from small digs to mass grading." },
      { title: "Sized to the Job", body: "From mini excavators and skid steers to dozers and graders." },
      { title: "One Call", body: "Pair the machine with materials and trucking on one order." },
    ],
    uses: [
      { title: "Excavation", body: "Dig foundations, footings and utility trenches." },
      { title: "Grading", body: "Cut, fill and level pads, roads and lots." },
      { title: "Loading", body: "Move and load spoil, aggregate and fill on site." },
    ],
  },
  compaction: {
    label: "Compaction equipment",
    subtitle: "Rammers, rollers, jumping jacks and double drum rollers",
    callout: "Our selection of compaction equipment includes rammers, rollers, jumping jacks, double drum rollers and more.",
    bestFor: ["Soil compaction", "Trench backfill", "Base prep", "Asphalt"],
    why: [
      { title: "Right Compactor", body: "From walk-behind rammers to ride-on rollers." },
      { title: "Base & Backfill", body: "Get soils and base to density before you build on them." },
      { title: "Pair With Materials", body: "Order base, fill and asphalt with the same call." },
    ],
    uses: [
      { title: "Trench backfill", body: "Compact soil in narrow trenches and around structures." },
      { title: "Base preparation", body: "Densify aggregate base under slabs, paving and pads." },
      { title: "Asphalt", body: "Roll patches, overlays and new paving." },
    ],
  },
  "generators-light-towers": {
    label: "Power and lighting equipment",
    subtitle: "Keep remote job sites powered and lit",
    callout: "No matter how remote the job, our power generation services will keep your project running from start to finish.",
    bestFor: ["Remote sites", "Temporary power", "Night work"],
    why: [
      { title: "Remote Sites", body: "Power for jobs with no utility service nearby." },
      { title: "Start to Finish", body: "Keep the project running for the whole schedule." },
      { title: "Light the Work", body: "Light towers keep night shifts safe and productive." },
    ],
    uses: [
      { title: "Temporary power", body: "Run tools, trailers and equipment on site." },
      { title: "Night work", body: "Light work areas, haul roads and staging yards." },
      { title: "Backup power", body: "Keep critical equipment running during outages." },
    ],
  },
  "pumps-tanks-filtration": {
    label: "Pump equipment",
    subtitle: "Dewatering, water storage and transfer, and industrial pumping",
    callout: "Solve your site’s water problems with our dewatering, water storage and transfer, and industrial pumping services.",
    bestFor: ["Dewatering", "Water transfer", "Water storage"],
    why: [
      { title: "Dewatering", body: "Keep excavations and trenches dry so work can continue." },
      { title: "Transfer & Storage", body: "Move and hold water where the job needs it." },
      { title: "Industrial Pumping", body: "Pumps sized to the flow your site demands." },
    ],
    uses: [
      { title: "Dewatering", body: "Pull groundwater and stormwater out of excavations." },
      { title: "Water transfer", body: "Move water between tanks, trucks and work areas." },
      { title: "Bypass pumping", body: "Keep flows moving while lines are repaired." },
    ],
  },
  "portable-sanitation-services": {
    label: "Portable sanitation",
    subtitle: "Sanitary, waste management and collection services",
    callout: "Our sanitary, waste management and collection services will keep you OSHA compliant.",
    bestFor: ["OSHA compliance", "Crew facilities", "Remote sites"],
    why: [
      { title: "OSHA Compliant", body: "Keep your site compliant with crew sanitation requirements." },
      { title: "Serviced", body: "Waste management and collection handled for you." },
      { title: "Any Site Size", body: "From small crews to large job sites." },
    ],
    uses: [
      { title: "Construction sites", body: "Restrooms and hand-wash stations for the crew." },
      { title: "Remote sites", body: "Facilities where there is no permanent plumbing." },
      { title: "Events", body: "Temporary facilities for site events and gatherings." },
    ],
  },
  "construction-site-services": {
    label: "Construction site services",
    subtitle: "Dumpsters, fencing, storage and site offices",
    callout: "Supply your site with mobile offices and keep your property secure with our long- and short-term storage facilities.",
    bestFor: ["Waste removal", "Site security", "Storage", "Site offices"],
    why: [
      { title: "Waste Removal", body: "Roll-off dumpsters sized for the debris you generate." },
      { title: "Site Security", body: "Temporary fencing keeps the site and equipment protected." },
      { title: "Storage & Offices", body: "Long- and short-term storage and mobile offices." },
    ],
    uses: [
      { title: "Debris removal", body: "Keep the site clean with scheduled dumpster swaps." },
      { title: "Perimeter fencing", body: "Secure the work area from the public." },
      { title: "On-site storage", body: "Lock up tools and materials between shifts." },
    ],
  },
  "trucks-trailers": {
    label: "Trucks and trailers",
    subtitle: "Transport materials, equipment and cargo anywhere",
    callout: "No matter where your project takes you, we’ll transport the materials, equipment and cargo you need anytime and anywhere.",
    bestFor: ["Material hauling", "Water hauling", "Equipment transport"],
    why: [
      { title: "Haul Materials", body: "Dump trucks move sand, gravel, aggregate and waste." },
      { title: "Water Hauling", body: "Water trucks for dust control and site water needs." },
      { title: "Cargo & Equipment", body: "Trailers for tools, supplies and equipment." },
    ],
    uses: [
      { title: "Material hauling", body: "Move bulk materials to and from the site." },
      { title: "Dust control", body: "Keep haul roads and work areas watered." },
      { title: "Cargo", body: "Extra room for tools, equipment and supplies." },
    ],
  },
};

export type SpecIcon = "diamond" | "height" | "power" | "surface" | "truck" | "shield";
type Spec = { icon: SpecIcon; label: string; value: string };

// Unified product-page copy: lift-type copy for aerial lifts, category copy otherwise.
export const infoFor = (r: Rental) => {
  if (r.kind && r.height) {
    const k = kinds[r.kind];
    const h = r.height;
    return {
      label: k.label,
      tagline: k.tagline(h),
      subtitle: k.subtitle,
      callout: k.callout,
      alsoCalled: k.alsoCalled,
      bestFor: k.bestFor,
      why: k.why.map((w) => ({ title: w.title, body: w.body(h) })),
      uses: k.uses,
      specs: [
        { icon: "diamond", label: "Lift type", value: k.label },
        { icon: "height", label: "Height", value: k.size(h) },
        { icon: "power", label: r.kind === "rt-scissor" ? "Drive" : "Power", value: k.power },
        ...(k.surface !== "—" ? [{ icon: "surface", label: "Best surface", value: k.surface }] : []),
      ] as Spec[],
      compare: [
        ["Lift type", k.label],
        ["Height", k.size(h)],
        ["Power / drive", k.power],
        ["Best surface", k.surface],
      ],
    };
  }
  const c = categoryInfo[r.category];
  const cat = categoryOf(r);
  return {
    label: c.label,
    tagline: `${cat.label} rental, delivered to your job site`,
    subtitle: c.subtitle,
    callout: c.callout,
    alsoCalled: [] as string[],
    bestFor: c.bestFor,
    why: c.why,
    uses: c.uses,
    specs: [{ icon: "diamond", label: "Category", value: cat.label }] as Spec[],
    compare: [["Category", cat.label]],
  };
};

// Same lift type (or category) first, then closest in height.
export const similarTo = (r: Rental) =>
  allRentals
    .filter((o) => o.slug !== r.slug && (r.kind ? !!o.kind : o.category === r.category))
    .sort(
      (a, b) =>
        Number(b.kind === r.kind) - Number(a.kind === r.kind) ||
        Math.abs((a.height ?? 0) - (r.height ?? 0)) - Math.abs((b.height ?? 0) - (r.height ?? 0)),
    );

export const specs = (r: Rental): Spec[] => [
  ...infoFor(r).specs,
  { icon: "truck", label: "Delivery", value: "Delivered to your project site" },
  { icon: "shield", label: "Protection", value: "REP® or your own COI" },
];

export const priced = (r: Rental) => Boolean(r.day);
export const compareRows = (r: Rental) => [
  ...infoFor(r).compare,
  ["Day rate", r.day || "Call for pricing"],
  ["Week rate", r.week || "Call for pricing"],
  ["Month rate", r.month || "Call for pricing"],
];

export const rep = [
  "REP® provides coverage for specified damages or loss to the rental equipment.",
  "REP® amounts can be refunded if you provide a valid Certificate of Insurance (COI) meeting required limits and language prior to delivery of your rental. Terms and Conditions apply. In the event of loss, a deductible is required.",
  "Please refer to the National Dispatching Rental Agreement Terms & Conditions for more information on REP® and COI requirements.",
];

export const process = [
  ["Initial consultation & assessment", "We start with a consultation to understand your project needs."],
  ["Supplier sourcing", "We source the right equipment and materials from our qualified suppliers."],
  ["Negotiation and budget management", "We secure the best deals and manage your budget efficiently."],
  ["Delivery and logistics", "We ensure timely delivery and handle all transportation logistics."],
  ["Project completion", "We manage rental extensions, notify suppliers of charges, promptly invoice any extras, and ensure equipment removal from the site."],
];

export const faqsFor = (r: Rental) => [
  {
    q: `How much does it cost to rent a ${r.label}?`,
    a: priced(r)
      ? `National Dispatching lists the ${r.label} at ${r.day} per day, ${r.week} per week and ${r.month} per month. Final pricing for your job site is confirmed by our dispatch team.`
      : `Call ${productPhone.label} and our dispatch team will price the ${r.label} for your job site.`,
  },
  { q: `What is the ${r.label}?`, a: r.overview },
  {
    q: "Can I book online or by phone?",
    a: `Yes. Our online booking system lets you book rental equipment in just minutes, or call ${productPhone.label} to book by phone. For help procuring equipment, email ${contact.email}.`,
  },
  { q: "What is the Rental Equipment Protection Plan (REP®)?", a: `${rep[0]} ${rep[1]}` },
  {
    q: "Do you deliver to my job site?",
    a: "Your rental equipment is delivered right to your project site on time and in perfect condition. Our service territory covers all 50 states through our qualified partner network.",
  },
  { q: "Do you handle rental extensions and pickup?", a: process[4][1] },
];
