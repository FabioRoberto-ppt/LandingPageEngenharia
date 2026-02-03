"use client";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/Hero";
import ConstructionProcess from "@/components/ConstructionProcess";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <WhatsAppButton />
      <Hero />
      <ConstructionProcess />
      <Gallery />
      <ContactSection />
      <Footer />
    </main>
  );
}