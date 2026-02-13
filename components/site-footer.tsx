import { Cpu } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary/60" />
          <span className="text-sm font-mono text-muted-foreground">
            <span className="text-primary/60">Silicon</span>
            <span>Algo</span>
          </span>
        </div>

        <p className="text-xs font-mono text-muted-foreground/50 text-center">
          {'Interactive DSA visualizer \u00b7 Built with Next.js \u00b7 Backtracking, sorting, graphs & more'}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground/40">
            Made for learners
          </span>
        </div>
      </div>
    </footer>
  )
}
