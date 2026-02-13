import { SiteHeader } from '@/components/site-header'

export default function SortingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col px-4 py-8 md:py-12">
        {children}
      </main>
    </div>
  )
}
