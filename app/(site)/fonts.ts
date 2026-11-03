import { Instrument_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

// Shared by the (site) root layout and the site-wide 404 page.
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const fontVars = `${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`;
