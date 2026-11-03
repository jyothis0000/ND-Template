import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ExploreCursor, PrivacyNote, SmoothScroll } from "@/components/home2/Chrome";
import "./home2.css";

// Root layout for /home2 (the second homepage design, merged from the national-dispatching-2 app).
// Its own fonts, global CSS, smooth scroll and cursor stay inside this route group.

// Poppins, as on nationaldispatching.com. next/font downloads it at build time and serves it from this site,
// so visitors never contact Google.
const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"], variable: "--f" });

export const metadata: Metadata = {
  title: "National Dispatching | Reliable Equipment Rentals & Material Supply Across the U.S.",
  description:
    "One stop solution for construction equipment rentals, materials, trucking, subcontracting, procurement and dispatching — from Fresno, California, through 5,000+ local partners nationwide.",
  icons: { icon: "/images/home2/favicon.png", apple: "/images/home2/favicon.png" },
};

// the browser's own chrome (mobile address bar) in the brand's near-black
export const viewport: Viewport = { themeColor: "#141414" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={poppins.variable}>
      <body>
        <SmoothScroll />
        {children}
        <ExploreCursor />
        <PrivacyNote />
      </body>
    </html>
  );
}
