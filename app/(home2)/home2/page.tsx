import { Footer, Header, Preloader } from "@/components/home2/Chrome";
import { Hero } from "@/components/home2/Hero";
import { Approach, Shows, Voices, Work } from "@/components/home2/Sections";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Work />
        <Approach />
        <Voices />
        <Shows />
      </main>
      <Footer />
    </>
  );
}
