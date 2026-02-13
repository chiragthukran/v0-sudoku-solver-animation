'use client'

import { cn } from '@/lib/utils'
import { Zap, Turtle, Rabbit, Rocket } from 'lucide-react'

type SpeedControlProps = {
  speed: number
  onSpeedChange: (speed: number) => void
  disabled: boolean
}

const speeds = [
  { value: 200, label: 'Slow', icon: Turtle },
  { value: 80, label: 'Normal', icon: Rabbit },
  { value: 20, label: 'Fast', icon: Zap },
  { value: 1, label: 'Turbo', icon: Rocket },
]

export function SpeedControl({ speed, onSpeedChange, disabled }: SpeedControlProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
        Animation Speed
      </p>
      <div className="flex gap-2">
        {speeds.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onSpeedChange(value)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs',
              'border transition-all duration-150',
              speed === value
                ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_12px_hsl(45_100%_55%/0.2)]'
                : 'bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
