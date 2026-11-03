import type { Metadata } from "next";
import Home from "../page";

// /home1 is the original homepage, also served at /. Point search engines at / so the two don't compete.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default Home;
