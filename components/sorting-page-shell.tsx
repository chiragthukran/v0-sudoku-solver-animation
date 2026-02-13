'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SortingVisualizer } from './sorting-visualizer'
import { SORTING_ALGORITHMS, type SortAlgorithmKey } from '@/lib/sorting-algorithms'

interface SortingPageShellProps {
  algorithmKey: SortAlgorithmKey
}

const colorAccents: Record<SortAlgorithmKey, { label: string; class: string; glow: string }> = {
  bubble: { label: 'primary', class: 'text-primary', glow: 'bg-primary/20' },
  selection: { label: 'secondary', class: 'text-secondary', glow: 'bg-secondary/20' },
  insertion: { label: 'accent', class: 'text-accent', glow: 'bg-accent/20' },
  merge: { label: 'blue', class: 'text-[hsl(200,90%,55%)]', glow: 'bg-[hsl(200,90%,55%)]/20' },
  quick: { label: 'secondary', class: 'text-secondary', glow: 'bg-secondary/20' },
  heap: { label: 'primary', class: 'text-primary', glow: 'bg-primary/20' },
}

export function SortingPageShell({ algorithmKey }: SortingPageShellProps) {
  const algo = SORTING_ALGORITHMS[algorithmKey]
  const colors = colorAccents[algorithmKey]

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        href="/problems/sorting"
        className="self-start mb-6 flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sorting
      </Link>

      {/* Header */}
      <header className="flex flex-col items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={cn('absolute -inset-2 rounded-full blur-md animate-neon-pulse', colors.glow)} />
            <ArrowUpDown className={cn('relative w-10 h-10', colors.class)} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-balance">
            <span className={colors.class}>{algo.name}</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-mono text-sm text-center max-w-lg leading-relaxed">
          {algo.description}
        </p>
      </header>

      {/* Visualizer */}
      <SortingVisualizer algorithmKey={algorithmKey} />
    </div>
  )
}
