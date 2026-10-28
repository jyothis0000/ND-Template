import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

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
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}
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
