'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  type CellState,
  createEmptyGrid,
  generateSolveSteps,
  type SolveStep,
} from '@/lib/sudoku-solver'
import { SudokuGrid } from './sudoku-grid'
import { NumberPad } from './number-pad'
import { SpeedControl } from './speed-control'
import { SolveStats } from './solve-stats'
import { cn } from '@/lib/utils'
import { Play, RotateCcw, Sparkles, Shuffle, Pause } from 'lucide-react'

const VALID_SIZES = [4, 6, 9]

function generateSamplePuzzle(size: number): CellState[][] {
  const grid = createEmptyGrid(size)

  if (size === 4) {
    const prefilled = [
      [0, 0, 1], [0, 3, 4],
      [1, 1, 3], [2, 2, 2],
      [3, 0, 3], [3, 3, 1],
    ]
    for (const [r, c, v] of prefilled) {
      grid[r][c] = { value: v, isPreFilled: true, animation: 'none' }
    }
  } else if (size === 6) {
    const prefilled = [
      [0, 1, 6], [0, 4, 1],
      [1, 0, 4], [1, 3, 5],
      [2, 2, 1], [2, 5, 3],
      [3, 0, 3], [3, 3, 1],
      [4, 2, 5], [4, 5, 6],
      [5, 1, 1], [5, 4, 3],
    ]
    for (const [r, c, v] of prefilled) {
      grid[r][c] = { value: v, isPreFilled: true, animation: 'none' }
    }
  } else if (size === 9) {
    const prefilled = [
      [0, 0, 5], [0, 1, 3], [0, 4, 7],
      [1, 0, 6], [1, 3, 1], [1, 4, 9], [1, 5, 5],
      [2, 1, 9], [2, 2, 8], [2, 7, 6],
      [3, 0, 8], [3, 4, 6], [3, 8, 3],
      [4, 0, 4], [4, 3, 8], [4, 5, 3], [4, 8, 1],
      [5, 0, 7], [5, 4, 2], [5, 8, 6],
      [6, 1, 6], [6, 6, 2], [6, 7, 8],
      [7, 3, 4], [7, 4, 1], [7, 5, 9], [7, 8, 5],
      [8, 4, 8], [8, 7, 7], [8, 8, 9],
    ]
    for (const [r, c, v] of prefilled) {
      grid[r][c] = { value: v, isPreFilled: true, animation: 'none' }
    }
  }

  return grid
}

export function SudokuSolver() {
  const [gridSize, setGridSize] = useState(9)
  const [grid, setGrid] = useState<CellState[][]>(() => createEmptyGrid(9))
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [status, setStatus] = useState<'idle' | 'solving' | 'solved' | 'no-solution' | 'paused'>('idle')
  const [speed, setSpeed] = useState(80)
  const [totalSteps, setTotalSteps] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [backtracks, setBacktracks] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepsRef = useRef<SolveStep[]>([])
  const stepIndexRef = useRef(0)
  const startTimeRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const gridRef = useRef(grid)
  const backtrackCountRef = useRef(0)
  const speedRef = useRef(speed)
  const isPausedRef = useRef(false)

  // Keep refs in sync
  useEffect(() => {
    gridRef.current = grid
  }, [grid])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const clearTimers = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
      animationRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleGridSizeChange = useCallback((newSize: number) => {
    clearTimers()
    setGridSize(newSize)
    setGrid(createEmptyGrid(newSize))
    setSelectedCell(null)
    setStatus('idle')
    setTotalSteps(0)
    setCurrentStep(0)
    setBacktracks(0)
    setElapsedTime(0)
    stepsRef.current = []
    stepIndexRef.current = 0
    backtrackCountRef.current = 0
    isPausedRef.current = false
  }, [clearTimers])

  const handleCellSelect = useCallback((row: number, col: number) => {
    if (status === 'solving') return
    setSelectedCell({ row, col })
  }, [status])

  const handleValueChange = useCallback(
    (row: number, col: number, value: number) => {
      if (status === 'solving') return
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.map((c) => ({ ...c })))
        newGrid[row][col] = {
          value,
          isPreFilled: value !== 0,
          animation: value !== 0 ? 'pop' : 'none',
        }
        return newGrid
      })
      // Reset if already solved
      if (status === 'solved' || status === 'no-solution') {
        setStatus('idle')
        setTotalSteps(0)
        setCurrentStep(0)
        setBacktracks(0)
        setElapsedTime(0)
      }
    },
    [status]
  )

  const handleNumberFromPad = useCallback(
    (num: number) => {
      if (!selectedCell || status === 'solving') return
      handleValueChange(selectedCell.row, selectedCell.col, num)
    },
    [selectedCell, status, handleValueChange]
  )

  const animateStep = useCallback(() => {
    if (isPausedRef.current) return

    const steps = stepsRef.current
    const idx = stepIndexRef.current

    if (idx >= steps.length) {
      // Done solving
      setGrid((prev) => {
        const newGrid = prev.map((r) =>
          r.map((c) => ({
            ...c,
            animation: (c.value !== 0 && !c.isPreFilled ? 'solved' : 'none') as CellState['animation'],
          }))
        )
        return newGrid
      })
      setStatus('solved')
      clearTimers()
      return
    }

    const step = steps[idx]
    stepIndexRef.current = idx + 1
    setCurrentStep(idx + 1)

    if (step.action === 'backtrack') {
      backtrackCountRef.current += 1
      setBacktracks(backtrackCountRef.current)
    }

    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })))
      const cell = newGrid[step.row][step.col]
      if (!cell.isPreFilled) {
        newGrid[step.row][step.col] = {
          value: step.value,
          isPreFilled: false,
          animation: step.action === 'backtrack' ? 'backtrack' : step.action === 'place' ? 'solved' : 'try',
        }
      }
      return newGrid
    })

    animationRef.current = setTimeout(animateStep, speedRef.current)
  }, [clearTimers])

  const handleSolve = useCallback(() => {
    if (status === 'solving') {
      // Pause
      isPausedRef.current = true
      setStatus('paused')
      clearTimers()
      return
    }

    if (status === 'paused') {
      // Resume
      isPausedRef.current = false
      setStatus('solving')
      startTimeRef.current = Date.now() - elapsedTime
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 100)
      animationRef.current = setTimeout(animateStep, speedRef.current)
      return
    }

    // Start fresh solve
    // First, clean up non-prefilled cells
    const cleanGrid = grid.map((r) =>
      r.map((c) => ({
        ...c,
        value: c.isPreFilled ? c.value : 0,
        animation: 'none' as const,
      }))
    )
    setGrid(cleanGrid)

    const steps = generateSolveSteps(cleanGrid, gridSize)

    if (steps.length === 0) {
      setStatus('no-solution')
      return
    }

    stepsRef.current = steps
    stepIndexRef.current = 0
    backtrackCountRef.current = 0
    isPausedRef.current = false
    setTotalSteps(steps.length)
    setCurrentStep(0)
    setBacktracks(0)
    setStatus('solving')
    setSelectedCell(null)

    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current)
    }, 100)

    animationRef.current = setTimeout(animateStep, speedRef.current)
  }, [status, grid, gridSize, animateStep, clearTimers, elapsedTime])

  const handleReset = useCallback(() => {
    clearTimers()
    setGrid(createEmptyGrid(gridSize))
    setSelectedCell(null)
    setStatus('idle')
    setTotalSteps(0)
    setCurrentStep(0)
    setBacktracks(0)
    setElapsedTime(0)
    stepsRef.current = []
    stepIndexRef.current = 0
    backtrackCountRef.current = 0
    isPausedRef.current = false
  }, [gridSize, clearTimers])

  const handleLoadSample = useCallback(() => {
    clearTimers()
    const sample = generateSamplePuzzle(gridSize)
    setGrid(sample)
    setSelectedCell(null)
    setStatus('idle')
    setTotalSteps(0)
    setCurrentStep(0)
    setBacktracks(0)
    setElapsedTime(0)
    stepsRef.current = []
    stepIndexRef.current = 0
    backtrackCountRef.current = 0
    isPausedRef.current = false
  }, [gridSize, clearTimers])

  const isSolving = status === 'solving'
  const isPaused = status === 'paused'

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Grid Size Selector */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
          Grid Size
        </p>
        <div className="flex gap-2">
          {VALID_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => handleGridSizeChange(size)}
              disabled={isSolving}
              className={cn(
                'w-14 h-14 rounded-xl font-mono font-bold text-lg',
                'border-2 transition-all duration-200',
                gridSize === size
                  ? 'bg-primary/20 text-primary border-primary shadow-[0_0_20px_hsl(45_100%_55%/0.3)] animate-neon-pulse'
                  : 'bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50 hover:text-foreground',
                'disabled:opacity-40 disabled:cursor-not-allowed'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Grid */}
        <SudokuGrid
          grid={grid}
          gridSize={gridSize}
          selectedCell={selectedCell}
          onSelectCell={handleCellSelect}
          onValueChange={handleValueChange}
          disabled={isSolving}
        />

        {/* Controls Panel */}
        <div className="flex flex-col gap-6 min-w-[260px]">
          {/* Number Pad */}
          <NumberPad
            gridSize={gridSize}
            onNumberSelect={handleNumberFromPad}
            disabled={isSolving || !selectedCell}
          />

          {/* Speed Control */}
          <SpeedControl speed={speed} onSpeedChange={setSpeed} disabled={false} />

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSolve}
              className={cn(
                'flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-sm',
                'transition-all duration-200',
                isSolving
                  ? 'bg-secondary/20 text-secondary border-2 border-secondary/40 shadow-[0_0_20px_hsl(340_85%_60%/0.3)]'
                  : isPaused
                    ? 'bg-accent/20 text-accent border-2 border-accent/40 shadow-[0_0_20px_hsl(160_80%_45%/0.3)]'
                    : 'bg-primary/20 text-primary border-2 border-primary/40 shadow-[0_0_20px_hsl(45_100%_55%/0.3)] hover:bg-primary/30 hover:shadow-[0_0_30px_hsl(45_100%_55%/0.4)]',
                'active:scale-95'
              )}
            >
              {isSolving ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : isPaused ? (
                <>
                  <Play className="w-4 h-4" /> Resume
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Solve It
                </>
              )}
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleLoadSample}
                disabled={isSolving}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs',
                  'bg-muted/30 text-muted-foreground border border-border/50',
                  'transition-all duration-150',
                  'hover:bg-accent/20 hover:text-accent hover:border-accent/40',
                  'active:scale-95',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted/30 disabled:hover:text-muted-foreground disabled:hover:border-border/50'
                )}
              >
                <Shuffle className="w-3.5 h-3.5" />
                Sample
              </button>

              <button
                onClick={handleReset}
                disabled={isSolving}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs',
                  'bg-muted/30 text-muted-foreground border border-border/50',
                  'transition-all duration-150',
                  'hover:bg-destructive/20 hover:text-destructive hover:border-destructive/40',
                  'active:scale-95',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted/30 disabled:hover:text-muted-foreground disabled:hover:border-border/50'
                )}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          {/* Stats */}
          {(status !== 'idle' || totalSteps > 0) && (
            <SolveStats
              totalSteps={totalSteps}
              currentStep={currentStep}
              backtracks={backtracks}
              status={status === 'paused' ? 'solving' : status}
              elapsedTime={elapsedTime}
            />
          )}
        </div>
      </div>
    </div>
  )
}
