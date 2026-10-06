import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutCard } from "@/components/AboutCard";
import { Featured } from "@/components/Featured";
import { Disciplines } from "@/components/Disciplines";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";

/** `/` opens on the hero, then introduces me, shows the featured work, and lists the disciplines. */
export default function HomePage() {
  return (
    <>
      <NightSky />
      <Header />
      <main id="main">
        <Hero />
        <AboutCard />
        <div className="pt-8 md:pt-12">
          <Featured headingLevel="h2" />
        </div>
        <Disciplines />
      </main>
      <Footer />
    </>
  );
}
