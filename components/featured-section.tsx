'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Grid3X3, ArrowRight, Volume2, Gauge, Play } from 'lucide-react'

const features = [
  {
    icon: Volume2,
    title: 'Sound Effects',
    description: 'Hear the algorithm think with satisfying audio feedback for every step',
  },
  {
    icon: Gauge,
    title: 'Speed Control',
    description: 'Slow down to study each move or crank it up to watch the magic unfold',
  },
  {
    icon: Play,
    title: 'Pause & Resume',
    description: 'Stop the solver mid-run, inspect the state, and continue when ready',
  },
]

export function FeaturedSection() {
  return (
    <section className="py-20 px-6 border-t border-border/30">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Featured Problem */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-secondary uppercase tracking-[0.3em]">
              Featured Visualizer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              <span className="text-primary">Sudoku</span>
              <span className="text-foreground"> Backtracking Solver</span>
            </h2>
            <p className="text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
              Watch the backtracking algorithm groove its way through a Sudoku puzzle.
              Pick a grid size (4x4, 6x6, or 9x9), fill in numbers, and hit solve
              to see every try, backtrack, and placement animate in real time.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-4 pt-2">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-foreground">{f.title}</span>
                    <span className="text-xs font-mono text-muted-foreground leading-relaxed">
                      {f.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/problems/sudoku"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-sm',
                'bg-secondary/15 text-secondary border-2 border-secondary/40 w-fit',
                'shadow-[0_0_20px_hsl(340_85%_60%/0.15)]',
                'hover:bg-secondary/25 hover:shadow-[0_0_30px_hsl(340_85%_60%/0.25)]',
                'transition-all duration-200 active:scale-95'
              )}
            >
              Launch Sudoku Solver
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Visual preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-xl" />
            <div className="relative rounded-2xl border-2 border-primary/20 bg-card/60 backdrop-blur-sm p-8 overflow-hidden">
              {/* Decorative mini sudoku grid */}
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md animate-neon-pulse" />
                    <Grid3X3 className="relative w-8 h-8 text-primary" />
                  </div>
                  <span className="text-2xl font-bold font-mono">
                    <span className="text-primary">Soooo</span>
                    <span className="text-secondary">dokuuuu</span>
                  </span>
                </div>

                {/* Mini grid visualization */}
                <div className="grid grid-cols-9 gap-px bg-border/30 rounded-lg overflow-hidden">
                  {Array.from({ length: 81 }).map((_, i) => {
                    const row = Math.floor(i / 9)
                    const col = i % 9
                    const isHighlighted = (row + col) % 5 === 0
                    const isTrying = (row * col) % 7 === 0

                    return (
                      <div
                        key={i}
                        className={cn(
                          'w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold',
                          'transition-colors duration-300',
                          isHighlighted
                            ? 'bg-accent/20 text-accent'
                            : isTrying
                              ? 'bg-secondary/15 text-secondary'
                              : 'bg-card text-muted-foreground/40',
                          // Heavy borders for boxes
                          col % 3 === 0 && col !== 0 && 'border-l-2 border-primary/20',
                          row % 3 === 0 && row !== 0 && 'border-t-2 border-primary/20',
                        )}
                        style={{
                          animationDelay: `${(row + col) * 50}ms`,
                        }}
                      >
                        {isHighlighted
                          ? ((row + col + 3) % 9 + 1)
                          : isTrying
                            ? ((row * 2 + col) % 9 + 1)
                            : ''}
                      </div>
                    )
                  })}
                </div>

                {/* Fake stats */}
                <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
                  <span>
                    Steps: <span className="text-primary font-bold">247</span>
                  </span>
                  <span>
                    Backtracks: <span className="text-secondary font-bold">38</span>
                  </span>
                  <span>
                    Time: <span className="text-accent font-bold">1.2s</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
