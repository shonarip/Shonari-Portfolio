import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NightSky } from "@/components/NightSky";

/** `/` is the landing only (Chief lock): one screen, nothing below it. */
export default function HomePage() {
  return (
    <>
      <NightSky />
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
