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
import WhySection from '@/components/WhySection';
import { WhySummitSection } from '@/components/WhySummitSection';
import { MarketOpportunitySection } from '@/components/MarketOpportunitySection';
import { SessionHighlightsSection } from '@/components/SessionHighlightsSection';
import { WhoShouldAttendSection } from '@/components/WhoShouldAttendSection';
import { SponsorsOverviewSection } from '@/components/SponsorsOverviewSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <WhySection />
        <AboutSection />
        <WhySummitSection />
         <SponsorsSection />
         <MarketOpportunitySection />
        <AgendaSection />
        <SessionHighlightsSection />
        <SpeakersSection />
        <IndustriesSection />
        <WhoShouldAttendSection />
        <SponsorsOverviewSection />
        <PartnerSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
