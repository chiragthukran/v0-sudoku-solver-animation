'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpDown, Clock, Layers, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SORTING_ALGORITHMS, type SortAlgorithmKey } from '@/lib/sorting-algorithms'
import { useEffect, useRef, useState, useCallback } from 'react'

const algorithms: { key: SortAlgorithmKey; href: string; color: 'yellow' | 'pink' | 'green' | 'blue' }[] = [
  { key: 'bubble', href: '/problems/sorting/bubble-sort', color: 'yellow' },
  { key: 'selection', href: '/problems/sorting/selection-sort', color: 'pink' },
  { key: 'insertion', href: '/problems/sorting/insertion-sort', color: 'green' },
  { key: 'merge', href: '/problems/sorting/merge-sort', color: 'blue' },
  { key: 'quick', href: '/problems/sorting/quick-sort', color: 'pink' },
  { key: 'heap', href: '/problems/sorting/heap-sort', color: 'yellow' },
]

const colorStyles = {
  yellow: {
    border: 'border-primary/30 hover:border-primary/60',
    bg: 'hover:bg-primary/5',
    glow: 'hover:shadow-[0_0_30px_hsl(45_100%_55%/0.12)]',
    icon: 'text-primary bg-primary/10',
    tag: 'text-primary bg-primary/10',
    bar: 'bg-primary',
    barMuted: 'bg-primary/30',
    arrow: 'text-primary',
  },
  pink: {
    border: 'border-secondary/30 hover:border-secondary/60',
    bg: 'hover:bg-secondary/5',
    glow: 'hover:shadow-[0_0_30px_hsl(340_85%_60%/0.12)]',
    icon: 'text-secondary bg-secondary/10',
    tag: 'text-secondary bg-secondary/10',
    bar: 'bg-secondary',
    barMuted: 'bg-secondary/30',
    arrow: 'text-secondary',
  },
  green: {
    border: 'border-accent/30 hover:border-accent/60',
    bg: 'hover:bg-accent/5',
    glow: 'hover:shadow-[0_0_30px_hsl(160_80%_45%/0.12)]',
    icon: 'text-accent bg-accent/10',
    tag: 'text-accent bg-accent/10',
    bar: 'bg-accent',
    barMuted: 'bg-accent/30',
    arrow: 'text-accent',
  },
  blue: {
    border: 'border-[hsl(200_90%_55%)]/30 hover:border-[hsl(200_90%_55%)]/60',
    bg: 'hover:bg-[hsl(200_90%_55%)]/5',
    glow: 'hover:shadow-[0_0_30px_hsl(200_90%_55%/0.12)]',
    icon: 'text-[hsl(200,90%,55%)] bg-[hsl(200,90%,55%)]/10',
    tag: 'text-[hsl(200,90%,55%)] bg-[hsl(200,90%,55%)]/10',
    bar: 'bg-[hsl(200,90%,55%)]',
    barMuted: 'bg-[hsl(200,90%,55%)]/30',
    arrow: 'text-[hsl(200,90%,55%)]',
  },
}

function MiniBarPreview({ color, isHovered }: { color: 'yellow' | 'pink' | 'green' | 'blue'; isHovered: boolean }) {
  const bars = useRef(Array.from({ length: 12 }, () => Math.random() * 80 + 20))
  const [displayBars, setDisplayBars] = useState(bars.current)
  const frameRef = useRef<number | null>(null)
  const stepRef = useRef(0)

  const animateSort = useCallback(() => {
    const arr = [...bars.current]
    const n = arr.length
    let i = Math.floor(stepRef.current / n)
    let j = stepRef.current % n

    if (i >= n) {
      stepRef.current = 0
      bars.current = Array.from({ length: 12 }, () => Math.random() * 80 + 20)
      setDisplayBars([...bars.current])
      frameRef.current = setTimeout(() => animateSort(), 500) as unknown as number
      return
    }

    if (j < n - 1 - i && arr[j] > arr[j + 1]) {
      ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      bars.current = arr
    }

    stepRef.current++
    setDisplayBars([...bars.current])
    frameRef.current = setTimeout(() => animateSort(), 60) as unknown as number
  }, [])

  useEffect(() => {
    if (isHovered) {
      stepRef.current = 0
      animateSort()
    } else {
      if (frameRef.current) clearTimeout(frameRef.current)
    }
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [isHovered, animateSort])

  const c = colorStyles[color]

  return (
    <div className="flex items-end gap-px h-16">
      {displayBars.map((val, i) => (
        <div
          key={i}
          className={cn(
            'w-2 rounded-t-sm transition-all duration-75',
            isHovered ? c.bar : c.barMuted
          )}
          style={{ height: `${val}%` }}
        />
      ))}
    </div>
  )
}

export default function SortingCategoryPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="self-start mb-6 flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <header className="flex flex-col items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md animate-neon-pulse" />
            <ArrowUpDown className="relative w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-balance">
            <span className="text-primary">Sorting</span>
            <span className="text-foreground"> Algorithms</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-mono text-sm text-center max-w-lg leading-relaxed">
          Watch how different sorting strategies tackle the same problem. Compare
          bubble, selection, insertion, merge, quick, and heap sort side by side.
        </p>

        {/* Quick stats */}
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>6 Algorithms</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-secondary" />
            <span>Real-time Visuals</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Step Controls</span>
          </div>
        </div>
      </header>

      {/* Algorithm Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {algorithms.map((algo, idx) => {
          const info = SORTING_ALGORITHMS[algo.key]
          const c = colorStyles[algo.color]
          const isHovered = hoveredIdx === idx

          return (
            <Link
              key={algo.key}
              href={algo.href}
              className="group block"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className={cn(
                  'relative rounded-xl border p-6 transition-all duration-300 overflow-hidden',
                  'backdrop-blur-sm hover:-translate-y-1',
                  c.border,
                  c.bg,
                  c.glow
                )}
              >
                <div className="relative flex flex-col gap-4">
                  {/* Top row: icon + name + complexity */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg', c.icon)}>
                        <ArrowUpDown className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-bold font-sans text-foreground">
                          {info.name}
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground">
                          Avg: {info.complexity.avg}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={cn('text-xs font-mono px-2 py-0.5 rounded-full', c.tag)}>
                        {info.stable ? 'Stable' : 'Unstable'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                    {info.description}
                  </p>

                  {/* Mini bar preview */}
                  <MiniBarPreview color={algo.color} isHovered={isHovered} />

                  {/* Complexity row */}
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span>Best: <span className="text-foreground font-bold">{info.complexity.best}</span></span>
                    <span>Avg: <span className="text-foreground font-bold">{info.complexity.avg}</span></span>
                    <span>Worst: <span className="text-foreground font-bold">{info.complexity.worst}</span></span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end pt-1">
                    <span className={cn(
                      'flex items-center gap-1 text-xs font-mono font-bold tracking-wide transition-transform duration-300',
                      'group-hover:translate-x-1',
                      c.arrow
                    )}>
                      Visualize
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
