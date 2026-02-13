'use client'

import { cn } from '@/lib/utils'
import { Activity, RotateCcw, CheckCircle2, Timer } from 'lucide-react'

type SolveStatsProps = {
  totalSteps: number
  currentStep: number
  backtracks: number
  status: 'idle' | 'solving' | 'solved' | 'no-solution'
  elapsedTime: number
}

export function SolveStats({
  totalSteps,
  currentStep,
  backtracks,
  status,
  elapsedTime,
}: SolveStatsProps) {
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
        Solver Stats
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-100',
            status === 'solved'
              ? 'bg-accent'
              : status === 'no-solution'
                ? 'bg-destructive'
                : 'bg-primary'
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
          <Activity className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs font-mono text-muted-foreground">Steps</p>
            <p className="text-sm font-mono font-bold text-foreground">
              {currentStep} / {totalSteps}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
          <RotateCcw className="w-4 h-4 text-secondary" />
          <div>
            <p className="text-xs font-mono text-muted-foreground">Backtracks</p>
            <p className="text-sm font-mono font-bold text-foreground">{backtracks}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
          <Timer className="w-4 h-4 text-accent" />
          <div>
            <p className="text-xs font-mono text-muted-foreground">Time</p>
            <p className="text-sm font-mono font-bold text-foreground">
              {formatTime(elapsedTime)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
          <CheckCircle2
            className={cn(
              'w-4 h-4',
              status === 'solved'
                ? 'text-accent'
                : status === 'no-solution'
                  ? 'text-destructive'
                  : 'text-muted-foreground'
            )}
          />
          <div>
            <p className="text-xs font-mono text-muted-foreground">Status</p>
            <p
              className={cn(
                'text-sm font-mono font-bold capitalize',
                status === 'solved'
                  ? 'text-accent'
                  : status === 'no-solution'
                    ? 'text-destructive'
                    : status === 'solving'
                      ? 'text-primary'
                      : 'text-muted-foreground'
              )}
            >
              {status === 'no-solution' ? 'No Solution' : status}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
