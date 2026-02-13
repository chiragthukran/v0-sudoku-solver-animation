'use client'

import { cn } from '@/lib/utils'
import { Delete } from 'lucide-react'

type NumberPadProps = {
  gridSize: number
  onNumberSelect: (num: number) => void
  disabled: boolean
}

export function NumberPad({ gridSize, onNumberSelect, disabled }: NumberPadProps) {
  const numbers = Array.from({ length: gridSize }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
        Number Pad
      </p>
      <div className="flex flex-wrap gap-2 max-w-xs">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberSelect(num)}
            disabled={disabled}
            className={cn(
              'w-11 h-11 rounded-lg font-mono font-bold text-lg',
              'bg-muted/50 text-foreground border border-border/50',
              'transition-all duration-150',
              'hover:bg-primary/20 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_hsl(45_100%_55%/0.3)]',
              'active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted/50 disabled:hover:text-foreground disabled:hover:border-border/50 disabled:hover:shadow-none'
            )}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => onNumberSelect(0)}
          disabled={disabled}
          className={cn(
            'w-11 h-11 rounded-lg font-mono',
            'bg-destructive/20 text-destructive border border-destructive/30',
            'transition-all duration-150 flex items-center justify-center',
            'hover:bg-destructive/30 hover:shadow-[0_0_12px_hsl(0_84%_60%/0.3)]',
            'active:scale-95',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-destructive/20 disabled:hover:shadow-none'
          )}
          aria-label="Clear cell"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
