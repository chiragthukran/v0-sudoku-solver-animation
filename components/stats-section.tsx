'use client'

import { AnimatedCounter } from './animated-counter'
import { Layers, Zap, Eye, Code2 } from 'lucide-react'

const stats = [
  {
    icon: Layers,
    label: 'DSA Categories',
    value: 8,
    suffix: '',
    color: 'text-primary',
  },
  {
    icon: Zap,
    label: 'Algorithms',
    value: 25,
    suffix: '+',
    color: 'text-secondary',
  },
  {
    icon: Eye,
    label: 'Visual Steps',
    value: 1000,
    suffix: '+',
    color: 'text-accent',
  },
  {
    icon: Code2,
    label: 'Lines of Logic',
    value: 5000,
    suffix: '+',
    color: 'text-[hsl(200,90%,55%)]',
  },
]

export function StatsSection() {
  return (
    <section className="relative py-16 border-y border-border/30">
      <div className="absolute inset-0 bg-muted/5" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div className={`text-3xl md:text-4xl font-bold font-mono ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
