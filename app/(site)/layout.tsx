import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import { fontVars } from "./fonts";

// Root layout for the original site (home1 and every inner page). /home2 has its own root layout in app/(home2),
// so the two designs' global styles never load together; moving between them is a full page load.

export const metadata: Metadata = {
  title: "National Dispatching | Reliable Equipment Rentals & Material Supply Across the U.S",
  description:
    "One stop solution for all your construction equipment rentals and services. Rentals, materials, trucking, subcontracting, and procurement & dispatching nationwide.",
};

// Hides [data-reveal] blocks before first paint; failsafe un-hides them if JS never runs.
const revealBoot = `(function(){var d=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('hg-reveal');window.__hgRevealFailsafe=setTimeout(function(){d.classList.remove('hg-reveal')},4000)})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={fontVars}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
