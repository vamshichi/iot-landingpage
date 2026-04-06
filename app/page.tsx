import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { AgendaSection } from '@/components/AgendaSection';
import { SpeakersSection } from '@/components/SpeakersSection';
import { IndustriesSection } from '@/components/IndustriesSection';
import { SponsorsSection } from '@/components/SponsorsSection';
import { PartnerSection } from '@/components/PartnerSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-background">
        <HeroSection />
        <AboutSection />
        <AgendaSection />
        <SpeakersSection />
        <IndustriesSection />
        <SponsorsSection />
        <PartnerSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
