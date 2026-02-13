'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Play, Pause, RotateCcw, Shuffle, ChevronRight } from 'lucide-react'
import type { SortStep, SortAlgorithmKey } from '@/lib/sorting-algorithms'
import { SORTING_ALGORITHMS } from '@/lib/sorting-algorithms'

interface SortingVisualizerProps {
  algorithmKey: SortAlgorithmKey
}

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

export function SortingVisualizer({ algorithmKey }: SortingVisualizerProps) {
  const algo = SORTING_ALGORITHMS[algorithmKey]
  const [arraySize, setArraySize] = useState(30)
  const [array, setArray] = useState<number[]>(() => generateRandomArray(30))
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [stepCount, setStepCount] = useState(0)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [isSorted, setIsSorted] = useState(false)
  const generatorRef = useRef<Generator<SortStep> | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const isPausedRef = useRef(false)
  const speedRef = useRef(speed)

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const maxVal = Math.max(...array, ...(currentStep?.array ?? []))

  const reset = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    generatorRef.current = null
    setIsRunning(false)
    setIsPaused(false)
    setCurrentStep(null)
    setStepCount(0)
    setComparisons(0)
    setSwaps(0)
    setIsSorted(false)
  }, [])

  const shuffle = useCallback(() => {
    reset()
    setArray(generateRandomArray(arraySize))
  }, [reset, arraySize])

  const handleSizeChange = useCallback((newSize: number) => {
    reset()
    setArraySize(newSize)
    setArray(generateRandomArray(newSize))
  }, [reset])

  const stepForward = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = algo.fn([...array])
    }
    const next = generatorRef.current.next()
    if (!next.done) {
      const step = next.value
      setCurrentStep(step)
      setArray(step.array)
      setStepCount((s) => s + 1)
      if (step.comparing) setComparisons((c) => c + 1)
      if (step.swapping) setSwaps((s) => s + 1)
      if (step.sorted?.length === step.array.length) {
        setIsSorted(true)
        setIsRunning(false)
      }
    } else {
      setIsSorted(true)
      setIsRunning(false)
    }
  }, [algo, array])

  const run = useCallback(() => {
    if (isSorted) return
    if (!generatorRef.current) {
      generatorRef.current = algo.fn([...array])
    }
    setIsRunning(true)
    setIsPaused(false)

    let lastTime = 0

    const animate = (time: number) => {
      if (isPausedRef.current) {
        animFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const delay = Math.max(1, 200 - speedRef.current * 2)
      if (time - lastTime < delay) {
        animFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = time

      const next = generatorRef.current!.next()
      if (!next.done) {
        const step = next.value
        setCurrentStep(step)
        setArray(step.array)
        setStepCount((s) => s + 1)
        if (step.comparing) setComparisons((c) => c + 1)
        if (step.swapping) setSwaps((s) => s + 1)
        if (step.sorted?.length === step.array.length) {
          setIsSorted(true)
          setIsRunning(false)
          return
        }
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsSorted(true)
        setIsRunning(false)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [algo, array, isSorted])

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p)
  }, [])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const displayArray = currentStep?.array ?? array

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Play / Pause / Step */}
        {!isRunning ? (
          <button
            onClick={run}
            disabled={isSorted}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono font-bold text-sm',
              'bg-primary/15 text-primary border-2 border-primary/40',
              'shadow-[0_0_15px_hsl(45_100%_55%/0.15)]',
              'hover:bg-primary/25 hover:shadow-[0_0_25px_hsl(45_100%_55%/0.25)]',
              'transition-all duration-200 active:scale-95',
              'disabled:opacity-40 disabled:pointer-events-none'
            )}
          >
            <Play className="w-4 h-4" />
            {isSorted ? 'Done' : 'Sort'}
          </button>
        ) : (
          <button
            onClick={togglePause}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono font-bold text-sm',
              'bg-secondary/15 text-secondary border-2 border-secondary/40',
              'hover:bg-secondary/25 transition-all duration-200 active:scale-95'
            )}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}

        <button
          onClick={stepForward}
          disabled={isRunning || isSorted}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-sm',
            'border-2 border-border/50 text-muted-foreground',
            'hover:bg-muted/30 hover:text-foreground transition-all duration-200 active:scale-95',
            'disabled:opacity-40 disabled:pointer-events-none'
          )}
        >
          <ChevronRight className="w-4 h-4" />
          Step
        </button>

        <button
          onClick={shuffle}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-sm',
            'border-2 border-border/50 text-muted-foreground',
            'hover:bg-muted/30 hover:text-foreground transition-all duration-200 active:scale-95'
          )}
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </button>

        <button
          onClick={reset}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-sm',
            'border-2 border-border/50 text-muted-foreground',
            'hover:bg-muted/30 hover:text-foreground transition-all duration-200 active:scale-95'
          )}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        {/* Size */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs font-mono text-muted-foreground">Size:</span>
          {[15, 30, 50, 80].map((s) => (
            <button
              key={s}
              onClick={() => handleSizeChange(s)}
              disabled={isRunning}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150',
                arraySize === s
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'text-muted-foreground border border-border/50 hover:bg-muted/30 hover:text-foreground',
                'disabled:opacity-40 disabled:pointer-events-none'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground w-14">Speed:</span>
        <input
          type="range"
          min={1}
          max={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 h-2 appearance-none rounded-full bg-muted cursor-pointer accent-primary"
        />
        <span className="text-xs font-mono text-primary font-bold w-10 text-right">{speed}%</span>
      </div>

      {/* Bar Chart Visualization */}
      <div className="relative rounded-2xl border-2 border-border/40 bg-card/40 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
        {/* Background scanlines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)',
        }} />

        <div
          className="relative flex items-end justify-center gap-px"
          style={{ height: 'clamp(200px, 40vh, 400px)' }}
        >
          {displayArray.map((val, i) => {
            const heightPct = (val / maxVal) * 100
            const isComparing = currentStep?.comparing?.includes(i)
            const isSwapping = currentStep?.swapping?.includes(i)
            const isSortedBar = currentStep?.sorted?.includes(i)
            const isPivot = currentStep?.pivot === i

            let barColor = 'bg-muted-foreground/50'
            if (isSortedBar && isSorted) barColor = 'bg-accent'
            else if (isSortedBar) barColor = 'bg-accent/70'
            else if (isPivot) barColor = 'bg-[hsl(200,90%,55%)]'
            else if (isSwapping) barColor = 'bg-secondary'
            else if (isComparing) barColor = 'bg-primary'

            let shadow = ''
            if (isComparing) shadow = 'shadow-[0_0_8px_hsl(45_100%_55%/0.5)]'
            else if (isSwapping) shadow = 'shadow-[0_0_8px_hsl(340_85%_60%/0.5)]'
            else if (isPivot) shadow = 'shadow-[0_0_8px_hsl(200_90%_55%/0.5)]'
            else if (isSortedBar) shadow = 'shadow-[0_0_6px_hsl(160_80%_45%/0.3)]'

            return (
              <div
                key={i}
                className={cn(
                  'rounded-t-sm transition-all duration-75',
                  barColor,
                  shadow
                )}
                style={{
                  height: `${heightPct}%`,
                  flex: 1,
                  maxWidth: arraySize <= 15 ? '24px' : arraySize <= 30 ? '16px' : arraySize <= 50 ? '10px' : '6px',
                }}
              />
            )
          })}
        </div>

        {/* Step label */}
        {currentStep?.label && (
          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-muted-foreground px-3 py-1.5 rounded-lg bg-muted/40 border border-border/30">
              {currentStep.label}
            </span>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-6 justify-center">
        <Stat label="Steps" value={stepCount} color="text-primary" />
        <Stat label="Comparisons" value={comparisons} color="text-secondary" />
        <Stat label="Swaps" value={swaps} color="text-accent" />
        <Stat label="Array Size" value={arraySize} color="text-[hsl(200,90%,55%)]" />
      </div>

      {/* Algorithm Info */}
      <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-mono text-muted-foreground leading-relaxed">{algo.description}</p>
          <div className="flex flex-wrap gap-4">
            <InfoBadge label="Best" value={algo.complexity.best} />
            <InfoBadge label="Average" value={algo.complexity.avg} />
            <InfoBadge label="Worst" value={algo.complexity.worst} />
            <InfoBadge label="Stable" value={algo.stable ? 'Yes' : 'No'} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={cn('text-2xl font-bold font-mono tabular-nums', color)}>
        {value.toLocaleString()}
      </span>
      <span className="text-xs font-mono text-muted-foreground">{label}</span>
    </div>
  )
}

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-muted-foreground">{label}:</span>
      <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
        {value}
      </span>
    </div>
  )
}
