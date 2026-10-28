// Copy for the service, about and procurement pages, from the matching pages on nationaldispatching.com.
import servicesData from "./data/services.json";

export type ServiceItem = { title: string; body: string; image?: string };
export type ServicePage = {
  slug: string;
  label: string;
  ndHref: string;
  brochure: string;
  headline: string;
  sub: string;
  image?: string;
  items: ServiceItem[];
  sections?: { eyebrow: string; title: string; intro?: string; items: ServiceItem[]; image?: string }[];
};

const labels: Record<string, string> = {
  rentals: "Rentals",
  materials: "Materials",
  trucking: "Trucking",
  subcontracting: "Subcontracting",
  "procurement-dispatching": "Procurement & Dispatching",
};

const scraped = servicesData as Omit<ServicePage, "label">[];

const procurement: Omit<ServicePage, "label" | "ndHref" | "brochure"> = {
  slug: "procurement-dispatching",
  headline: "Construction Procurement & Dispatching Services",
  sub: "In the world of construction, where every minute counts and staying within budget is crucial, having the right support can make all the difference. We specialize in ensuring that construction projects run smoothly and efficiently across the United States.",
  image: "/images/services/procurement-hero.webp",
  items: [
    {
      title: "Making Procurement Effortless",
      body: "With our vast network of trusted suppliers, procuring the necessary equipment and materials becomes a straightforward process. Whether you need specialized machinery or bulk materials, we negotiate competitive rates and handle all the logistics, allowing you to focus on project execution.",
    },
    {
      title: "Saving Time and Money",
      body: "By entrusting National Dispatching with your procurement and dispatching needs, you free up valuable time and resources. Our efficient processes and reliable services translate into cost savings and improved project efficiency.",
    },
    {
      title: "Ensuring Timely Delivery Nationwide",
      body: "We find the nearest suppliers to your job site and secure the best quality equipment and materials at the best prices. By optimizing dispatching routes and coordinating logistics, we minimize downtime and keep your project moving forward.",
    },
  ],
  sections: [
    {
      eyebrow: "Our portal",
      title: "Benefits of Our Portal",
      image: "/images/services/procurement-portal.webp",
      items: [
        { title: "Centralized Data Management", body: "Manage and access essential project data from a single platform, eliminating cumbersome manual processes and disparate spreadsheets." },
        { title: "Real-Time Updates", body: "Real-time updates and notifications keep you informed about changes in vendor pricing or availability." },
        { title: "Improved Decision-Making", body: "Make data-driven decisions that optimize procurement processes, reduce costs, save time and enhance project outcomes." },
        { title: "Customization & Flexibility", body: "Solutions customized to each project's requirements, matching current workflows or integrating new features." },
        { title: "Enhanced Collaboration", body: "Seamless coordination and alignment of objectives among project stakeholders throughout the project lifecycle." },
      ],
    },
    {
      eyebrow: "Why us",
      title: "Why Choose National Dispatching?",
      items: [
        { title: "Proven Track Record", body: "With 15 years in the industry, we have a proven track record of delivering exceptional procurement and dispatching services to a wide range of construction projects." },
        { title: "Expert Team", body: "Our product specialists & logistics experts bring over a decade of hands-on experience in the construction sector." },
        { title: "Reliability and Efficiency", body: "From procurement to delivery, we manage every detail to ensure your project stays on schedule and within budget." },
        { title: "Customer-Centric Approach", body: "We work closely with you to understand your specific requirements and provide personalized service to meet your goals." },
        { title: "Comprehensive Network", body: "Our network of trusted suppliers gets you quality equipment and materials at competitive prices, from urban centers to remote sites." },
      ],
    },
  ],
};

export const servicePages: ServicePage[] = scraped.map((s) => ({
  ...s,
  ...(s.slug === "procurement-dispatching" ? procurement : {}),
  label: labels[s.slug],
  brochure: s.brochure || scraped[0].brochure,
}));

export const about = {
  lead: "National Dispatching, established in 2010, is headquartered in Fresno, California. We are a trusted provider of heavy equipment rentals and construction materials, serving clients nationwide.",
  story: [
    "Our founders bring extensive experience in operating heavy machinery, including bulldozers, excavators, and earth-moving equipment, and managing construction projects. They have firsthand experience with the challenges companies face in sourcing and procuring the right types of equipment and materials required for construction projects.",
    "Our company was founded with a particular focus on streamlining procurement and dispatching, saving both cost and time, and optimizing construction projects to their fullest efficiency.",
  ],
  different: [
    { title: "One reliable source", body: "By eliminating the hassle of dealing with multiple vendors, National Dispatching serves as a single, reliable source for all equipment and material needs." },
    { title: "5,000+ local partners", body: "Leveraging our extensive network of over 5,000 local partners across the nation, we ensure easy procurement at the best prices." },
    { title: "On-time logistics", body: "Our logistics and dispatching services ensure that equipment and materials are delivered on time, optimizing both schedules and budgets." },
    { title: "An extension of your team", body: "We take care of all administrative tasks related to equipment rental, material procurement, and dispatching, so you can concentrate on completing projects." },
  ],
  vision:
    "Our vision is to become the most trusted source for procurement in the United States by catering to the individual needs of the client. Success to us means that our clients are fully equipped to complete their job on time, no matter the size, scope and requirements of the project.",
  mission:
    "We are committed to helping contractors and businesses across the country work safely and efficiently through the use of our rental, material and service network. Our mission is to offer simple and accessible solutions that make for a productive job site.",
  values: [
    {
      title: "Performance",
      body: "We are committed to delivering the best rental equipment, products and services at the right time and as requested the first time. We are obsessed with performance and innovation, and we value our performance-driven culture where we work as a team to reach new milestones.",
    },
    {
      title: "Humility",
      body: "We promote a learning culture at National Dispatching: we listen, study, and are empathetic with the customers and communities we operate in. We are dedicated to maintaining a culture of trust and honesty by creating a supportive and empowering work environment.",
    },
    {
      title: "Dedication",
      body: "Our greatest strength is our dedication to improvement. Through a daily commitment to being a little better every day, we bring out the best for our customers. We grow as a team so we can meet new challenges with creativity and cheerfulness.",
    },
  ],
  purpose:
    "We strive to provide the best in rental equipment, products and services. At the same time, we recognize our responsibility to create a safe environment for those utilizing our service. We comply with rules and regulations in the best interests of our customers and vendors, and we believe in faithful partnerships with reliable vendors, material specialists, skilled service engineers, and master practitioners and craftsmen.",
  president: { name: "Shelley Avila", title: "President/CFO", image: "/images/about/president.webp" },
};
