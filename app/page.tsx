import { SudokuSolver } from '@/components/sudoku-solver'
import { Grid3X3 } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12">
      {/* Header */}
      <header className="flex flex-col items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md animate-neon-pulse" />
            <Grid3X3 className="relative w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-balance">
            <span className="text-primary">Funky</span>{' '}
            <span className="text-secondary">Sudoku</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-mono text-sm text-center max-w-md leading-relaxed">
          Pick a grid size, fill in your numbers, and watch the backtracking algorithm
          groove its way to the solution.
        </p>
      </header>

      {/* Solver */}
      <SudokuSolver />

      {/* Footer */}
      <footer className="mt-12 pb-6 text-center">
        <p className="text-xs font-mono text-muted-foreground/50">
          {'Backtracking visualizer \u00b7 Click a cell, type or tap a number, hit Solve'}
        </p>
      </footer>
    </main>
  )
}
