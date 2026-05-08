import { HeroSection } from '@/components/awards/hero-section'
import { WhyMattersSection } from '@/components/awards/why-matters-section'
import { WhoShouldNominateSection } from '@/components/awards/who-nominate-section'
import { AwardCategoriesSection } from '@/components/awards/categories-section'
import { MomentOfRecognitionSection } from '@/components/awards/moment-section'
import { NominationFormSection } from '@/components/awards/nomination-form'
import { FinalCTASection } from '@/components/awards/final-cta-section'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <HeroSection />
      <WhyMattersSection />
      <WhoShouldNominateSection />
      <AwardCategoriesSection />
      <MomentOfRecognitionSection />
      <NominationFormSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}