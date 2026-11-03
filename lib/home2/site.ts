// National Dispatching — layout after lpas.com (cloned from Levo's /home2). Copy, figures, reviews and imagery
// from nationaldispatching.com; images are served from this site, so visitors never load anything from theirs.
const img = (f: string) => `/images/home2/${f}`;
const ND = "https://nationaldispatching.com";

export const company = {
  name: "National Dispatching",
  legal: "National Dispatching",
  group: "Fresno, California",
  email: "dispatch@nationaldispatching.com",
  phone: "888.705.5616",
  phoneHref: "tel:+18887055616",
  offices: [
    { name: "Corporate office", lines: ["5125 N. Gates Ave., Ste. 102", "Fresno, CA 93722"], phone: "888.705.5616" },
    { name: "Central dispatch", lines: ["Customized project support", "Mon – Fri 7:00am – 5:00pm PST"], phone: "888.705.5616" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/national_dispatching" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nationaldispatching" },
    { label: "Facebook", href: "https://www.facebook.com/nationaldispatching" },
    { label: "YouTube", href: "https://www.youtube.com/@NationalDispatching" },
  ],
  terms: `${ND}/terms-of-use/`,
  policy: `${ND}/privacy-policy/`,
};

// N·D — the initials stack, then expand, as the reference's L·P·A·S
export const preloader = ["National", "Dispatching"];

export const hero = {
  img: img("photo-site-manager.webp"),
  details: ["Equipment Rentals & Materials", "Procurement & Dispatching"],
  title: "One stop solution for all your construction equipment rentals and services",
};

// card colours from the brand: its safety yellow, the logo's deeper gold, asphalt and concrete
export const focus = [
  {
    title: "Rentals",
    sub: "Heavy equipment for every job site",
    color: "#ffe60a",
    ink: "#141414",
    img: img("photo-drum-roller.jpg"),
    items: ["Earthmoving", "Material handling", "Elevated work", "Power & site services"],
  },
  {
    title: "Materials",
    sub: "From ready mix to precast",
    color: "#1c1c1a",
    ink: "#fff",
    img: img("photo-material-inspection.webp"),
    items: ["Ready mix", "Aggregates", "Engineered fill", "Asphalt & precast"],
  },
  {
    title: "Trucking",
    sub: "Material transport and heavy haul",
    color: "#e6e1d6",
    ink: "#141414",
    img: img("photo-dump-truck.webp"),
    items: ["Material transport", "Specialty hauling", "Heavy haul", "Bulk hauling"],
  },
  {
    title: "Subcontracting",
    sub: "Certified crews for your site",
    color: "#34332f",
    ink: "#fff",
    img: img("photo-asphalt-paving.webp"),
    items: ["Site security", "Saw-cutting & coring", "Operated crane service", "Fleet maintenance"],
  },
  {
    title: "Procurement & Dispatching",
    sub: "One call, every vendor",
    color: "#fbc712",
    ink: "#141414",
    img: img("photo-handshake.webp"),
    items: ["Vendor sourcing", "Rate negotiation", "Scheduling", "Nationwide delivery"],
  },
];

export const intro = {
  title: "More than procurement. The one-call solution for any project need.",
  tagline: ["Search. Book.", "Start your project."],
  img: img("about-national.jpg"),
  imgCap: "National Dispatching — Fresno, California",
  text:
    "Our founders operated bulldozers, excavators and earthmovers and ran construction projects themselves, so they know how hard it is to source the right equipment and materials. With a network of over 5,000 local partners across the country, we act as an extension of your team: one reliable source for rentals, materials, trucking and site services, delivered on time and on budget.",
};

export const work = {
  title: "Popular rentals",
  all: `${ND}/equipment-rentals/`,
  filters: [
    { label: "Aerial work platforms", href: `${ND}/equipment/aerial-work-platforms/` },
    { label: "Forklifts & material handling", href: `${ND}/equipment/forklifts-material-handling/` },
    { label: "Earthmoving", href: `${ND}/equipment/earthmoving-equipment/` },
    { label: "Compaction", href: `${ND}/equipment/compaction/` },
    { label: "Generators & light towers", href: `${ND}/equipment/generators-light-towers/` },
    { label: "Pumps, tanks & filtration", href: `${ND}/equipment/pumps-tanks-filtration/` },
    { label: "Portable sanitation", href: `${ND}/equipment/portable-sanitation-services/` },
    { label: "Construction site services", href: `${ND}/equipment/construction-site-services/` },
    { label: "Trucks & trailers", href: `${ND}/equipment/trucks-trailers/` },
  ],
  // product shots on white: shown whole, on a light panel, rather than cropped
  rows: [
    [
      { title: "80 ft Diesel Articulating Boom Lift", place: "Day $855 · Week $2,515 · Month $5,399", img: img("rent-80ft-articulating-boom.webp"), big: true },
      { title: "60 ft Diesel Telescopic Boom Lift", place: "Day $536 · Week $1,349 · Month $3,243", img: img("rent-60ft-telescopic-boom.webp") },
      { title: "45 ft Diesel Articulating Boom Lift", place: "Day $374 · Week $1,078 · Month $2,426", img: img("rent-45ft-articulating-boom.webp") },
    ],
    [
      { title: "40 ft Electric Scissor Lift", place: "Day $248 · Week $800 · Month $1,825", img: img("rent-40ft-electric-scissor.webp") },
      { title: "43 ft Rough Terrain Scissor Lift, 4WD", place: "Day $400 · Week $949 · Month $2,162", img: img("rent-43ft-rough-terrain-scissor.webp") },
      { title: "65–66 ft Diesel Articulating Boom Lift", place: "Day $536 · Week $1,349 · Month $3,243", img: img("rent-65ft-articulating-boom.webp"), big: true },
    ],
  ],
};

// US date order (MM.DD.YY)
export const shows = {
  title: "Latest insights",
  all: `${ND}/blog/`,
  list: [
    { title: "Compact Track Loader or Skid Steer?", text: "Ground conditions, surface damage, attachments and rental cost — and what to confirm before the rental is ordered.", date: "10.28.26", img: img("blog-track-loader-skid-steer.webp"), cap: "Compact track loaders and skid steers", href: `${ND}/compact-track-loader-skid-steer/` },
    { title: "Bagged Cement, Mortar and Grout", text: "Match the product to the task, estimate quantities, store bags dry and keep your crews fully supplied.", date: "10.19.26", img: img("blog-bagged-cement.webp"), cap: "Bagged cement, mortar and grout on site", href: `${ND}/bagged-cement-mortar-grout-ordering/` },
    { title: "Precast, Block or Pipe?", text: "Lead times, delivery sequencing and offloading for concrete products, timed to match your install crews.", date: "10.14.26", img: img("blog-concrete-products.webp"), cap: "Precast pipe and block deliveries", href: `${ND}/concrete-products-procuremen/` },
    { title: "Articulated or Rigid Dump Truck?", text: "Terrain, haul distance and road use — and why one is ordered as a rental while the other is booked as trucking.", date: "09.30.26", img: img("photo-dump-truck.webp"), cap: "Rigid haul truck on a quarry run", href: `${ND}/articulated-vs-rigid-dump-truck/` },
    { title: "Hot Mix, Cold Mix or RAP?", text: "How asphalt orders are sourced, timed to plant hours and paving crews, and delivered to the job site.", date: "09.08.26", img: img("photo-asphalt-paving.webp"), cap: "Paving crew laying hot mix", href: `${ND}/asphalt-procurement-construction/` },
  ],
};

export const prefooter = img("loader-sunset.jpg");

export const industries = [
  "Manufacturing", "Transportation", "Dams & Flood Control", "Commercial", "Residential",
  "Agriculture", "Water Infrastructure", "Oil & Gas", "Communication", "Energy",
];

export const approach = {
  title: "From search to job site",
  text: "One call to a single, reliable source. We find the nearest suppliers, negotiate the rates and schedule every delivery, so your crew can keep building.",
  steps: [
    { title: "Search equipment", text: "Browse our wide selection of high-quality rental equipment and find the perfect match for your project.", img: img("photo-choose-excavator.webp") },
    { title: "Book in minutes", text: "Our easy-to-use online booking lets you reserve your rental equipment in just minutes — hassle-free and secure.", img: img("photo-laptop.webp") },
    { title: "Procurement", text: "Expert procurement makes sure you get the right equipment and materials for the project, at competitive prices and the ideal fit.", img: img("photo-procurement-network.jpg") },
    { title: "Dispatching", text: "Our dispatching team gets your heavy equipment there exactly when the project demands it, keeping your schedule on track.", img: img("photo-truck-logistics.jpg") },
    { title: "Start your project", text: "Your equipment arrives at the project site on time and in perfect condition, so you can start working without delay.", img: img("photo-site-fencing.webp") },
  ],
};

export const voices = {
  quotes: [
    {
      text: "National Dispatch does it all! Whether it’s backfill material or concrete, they have you covered. Things are always changing in construction, and Ramiro and the team are super great to work with through those rapid changes.",
      who: "Wylie Shupe",
      where: "Google review",
    },
    {
      text: "Just completed a project in W. Sacramento. Ramiro and his team assisted with Class II AB, concrete and sand delivery, as well as our trash dumpster. The team always seems to come through, even with last-minute requests.",
      who: "Joe Popejoy",
      where: "Google review",
    },
    {
      text: "I work with a pipeline company spread through Northern and Southern California. National Dispatching has always come through for all of our projects with backfill material, water needs and rentals.",
      who: "Mario Campos",
      where: "Google review",
    },
    {
      text: "Their prices have always been very competitive, they have always delivered their equipment on time — usually early — and have always been very responsive to our needs. I cannot recommend them highly enough.",
      who: "James Johnson",
      where: "Google review",
    },
  ],
  stats: [
    { value: "5,072+", label: "Projects served" },
    { value: "12+", label: "Years in business" },
    { value: "5,340+", label: "Service locations" },
    { value: "5,000+", label: "Local partners nationwide" },
  ],
  // affiliations & certifications, from the reference footer
  logos: [
    { name: "American Rental Association", src: img("cert-1.png") },
    { name: "Supplier Clearinghouse — CPUC General Order 156", src: img("cert-2.png") },
    { name: "Industrial Training Services", src: img("cert-4.png") },
    { name: "ISNetworld — RAVS Plus participant", src: img("cert-5.png") },
    { name: "Veriforce", src: img("cert-6.png") },
  ],
};
