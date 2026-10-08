import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ContactSheet } from "@/components/ContactSheet";
import { AboutCard } from "@/components/AboutCard";
import { Footer } from "@/components/Footer";
import { Backdrop } from "@/components/Backdrop";

/** `/` is a contact sheet: the hero proof, a sheet of selected proofs, then the introduction. */
export default function HomePage() {
  return (
    <>
      <Backdrop />
      <Header />
      <main id="main">
        <Hero />
        <ContactSheet />
        <AboutCard />
      </main>
      <Footer />
    </>
  );
}
