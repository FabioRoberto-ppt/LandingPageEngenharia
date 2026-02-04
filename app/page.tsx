"use client";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/Hero";
import ConstructionProcess from "@/components/ConstructionProcess";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <WhatsAppButton />
      <Hero />
      <ConstructionProcess />
      <Gallery />
      <ContactSection />
      <Footer />
    </main>
  );
}