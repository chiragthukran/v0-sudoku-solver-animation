'use client'

import { HeroVisualization } from './hero-visualization'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <HeroVisualization />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-mono text-primary tracking-wide">
            Interactive Algorithm Visualizations
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
          <span className="text-primary">Silicon</span>
          <span className="text-foreground">Algo</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg font-mono text-muted-foreground leading-relaxed text-pretty">
          Watch algorithms come alive. Explore sorting, searching, graph traversal,
          backtracking, and more through playful, real-time visual simulations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="#categories"
            className={cn(
              'flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono font-bold text-sm',
              'bg-primary/15 text-primary border-2 border-primary/40',
              'shadow-[0_0_25px_hsl(45_100%_55%/0.2)]',
              'hover:bg-primary/25 hover:shadow-[0_0_35px_hsl(45_100%_55%/0.3)]',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Explore Problems
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/problems/sudoku"
            className={cn(
              'flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm',
              'bg-muted/30 text-foreground border border-border/50',
              'hover:bg-secondary/15 hover:text-secondary hover:border-secondary/40',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Try Sudoku Solver
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary/50 animate-neon-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
