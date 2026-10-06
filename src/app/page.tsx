import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";

/** `/` is the opening screen: name, what I do, and a path to the work. */
export default function HomePage() {
  return (
    <>
      <NightSky />
      <Header />
      <main id="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
