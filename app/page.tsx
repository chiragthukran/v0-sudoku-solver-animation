import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { StatsSection } from '@/components/stats-section'
import { FeaturedSection } from '@/components/featured-section'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedSection />
      </main>
      <SiteFooter />
    </div>
  )
}
