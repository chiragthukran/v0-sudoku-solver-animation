'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  problems: number
  color: 'yellow' | 'pink' | 'green' | 'blue'
  href: string
  tag: string
}

const colorMap = {
  yellow: {
    border: 'border-primary/30',
    hoverBorder: 'hover:border-primary/60',
    bg: 'bg-primary/5',
    hoverBg: 'hover:bg-primary/10',
    glow: 'group-hover:shadow-[0_0_30px_hsl(45_100%_55%/0.15)]',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    tagBg: 'bg-primary/10',
    tagText: 'text-primary',
    barColor: 'bg-primary/40',
  },
  pink: {
    border: 'border-secondary/30',
    hoverBorder: 'hover:border-secondary/60',
    bg: 'bg-secondary/5',
    hoverBg: 'hover:bg-secondary/10',
    glow: 'group-hover:shadow-[0_0_30px_hsl(340_85%_60%/0.15)]',
    iconBg: 'bg-secondary/15',
    iconColor: 'text-secondary',
    tagBg: 'bg-secondary/10',
    tagText: 'text-secondary',
    barColor: 'bg-secondary/40',
  },
  green: {
    border: 'border-accent/30',
    hoverBorder: 'hover:border-accent/60',
    bg: 'bg-accent/5',
    hoverBg: 'hover:bg-accent/10',
    glow: 'group-hover:shadow-[0_0_30px_hsl(160_80%_45%/0.15)]',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
    tagBg: 'bg-accent/10',
    tagText: 'text-accent',
    barColor: 'bg-accent/40',
  },
  blue: {
    border: 'border-[hsl(200_90%_55%)]/30',
    hoverBorder: 'hover:border-[hsl(200_90%_55%)]/60',
    bg: 'bg-[hsl(200_90%_55%)]/5',
    hoverBg: 'hover:bg-[hsl(200_90%_55%)]/10',
    glow: 'group-hover:shadow-[0_0_30px_hsl(200_90%_55%/0.15)]',
    iconBg: 'bg-[hsl(200_90%_55%)]/15',
    iconColor: 'text-[hsl(200,90%,55%)]',
    tagBg: 'bg-[hsl(200_90%_55%)]/10',
    tagText: 'text-[hsl(200,90%,55%)]',
    barColor: 'bg-[hsl(200_90%_55%)]/40',
  },
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  problems,
  color,
  href,
  tag,
}: CategoryCardProps) {
  const c = colorMap[color]

  return (
    <Link href={href} className="group block">
      <div
        className={cn(
          'relative rounded-xl border p-6 transition-all duration-300',
          'backdrop-blur-sm overflow-hidden',
          c.border, c.hoverBorder,
          c.bg, c.hoverBg,
          c.glow,
          'hover:-translate-y-1'
        )}
      >
        {/* Animated background bars */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={cn('absolute bottom-0 rounded-t-sm', c.barColor)}
              style={{
                left: `${i * 12.5}%`,
                width: '10%',
                height: `${20 + Math.sin(i * 0.8) * 30}%`,
                opacity: 0.3,
                animation: `bar-grow 1.5s ease-in-out ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-12 h-12 rounded-lg', c.iconBg)}>
              <Icon className={cn('w-6 h-6', c.iconColor)} />
            </div>
            <span className={cn('text-xs font-mono px-2.5 py-1 rounded-full', c.tagBg, c.tagText)}>
              {tag}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold font-sans text-foreground group-hover:text-foreground/90 transition-colors">
              {title}
            </h3>
            <p className="text-sm font-mono text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono text-muted-foreground">
              {problems} {problems === 1 ? 'problem' : 'problems'}
            </span>
            <span className={cn(
              'text-xs font-mono font-bold tracking-wide transition-transform duration-300',
              'group-hover:translate-x-1',
              c.tagText
            )}>
              {'Explore ->'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
