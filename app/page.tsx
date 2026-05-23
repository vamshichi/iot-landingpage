import { Navbar } from '@/components/Navbar';
import HeroSection  from '@/components/HeroSection';
import AboutSection  from '@/components/AboutSection';
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
import WhatsAppButton from '@/components/whatsapp';
import OrganizerBadge from "@/components/OrganizerBadge";
import { AwardsSection } from '@/components/AwardsSection';
import { BgSpeakers } from '@/components/bgspeakers';
import { BgPartners } from '@/components/bgpartners';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <WhySection />

        {/* <WhySummitSection /> */}
        {/* <MarketOpportunitySection /> */}
        <IndustriesSection />
        
        <AgendaSection />
        <AwardsSection />
        <SessionHighlightsSection />
        <BgSpeakers />
        {/* <SpeakersSection /> */}
        <WhoShouldAttendSection />
        <SponsorsOverviewSection />
         <SponsorsSection />
         <BgPartners />
        {/* <PartnerSection /> */}
        <ContactSection />
        {/* <OrganizerBadge /> */}
        <WhatsAppButton />
        
      </main>
      <Footer />
    </>
  );
}
