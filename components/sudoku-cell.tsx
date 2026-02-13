'use client'

import { type CellState } from '@/lib/sudoku-solver'
import { cn } from '@/lib/utils'

type SudokuCellProps = {
  cell: CellState
  row: number
  col: number
  gridSize: number
  boxRows: number
  boxCols: number
  isSelected: boolean
  onSelect: () => void
  onValueChange: (value: number) => void
  disabled: boolean
}

export function SudokuCell({
  cell,
  row,
  col,
  gridSize,
  boxRows,
  boxCols,
  isSelected,
  onSelect,
  onValueChange,
  disabled,
}: SudokuCellProps) {
  const isRightBorder = (col + 1) % boxCols === 0 && col + 1 !== gridSize
  const isBottomBorder = (row + 1) % boxRows === 0 && row + 1 !== gridSize

  const animationClass =
    cell.animation === 'try'
      ? 'animate-cell-try'
      : cell.animation === 'backtrack'
        ? 'animate-cell-backtrack'
        : cell.animation === 'solved'
          ? 'animate-cell-solved'
          : cell.animation === 'pop'
            ? 'animate-cell-pop'
            : ''

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || cell.isPreFilled) return
    const num = parseInt(e.key)
    if (num >= 0 && num <= gridSize) {
      onValueChange(num)
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onValueChange(0)
    }
  }

  // Calculate cell size based on grid size
  const cellSizeClass =
    gridSize <= 4
      ? 'w-16 h-16 text-2xl'
      : gridSize <= 6
        ? 'w-14 h-14 text-xl'
        : gridSize <= 9
          ? 'w-11 h-11 text-lg md:w-12 md:h-12'
          : 'w-9 h-9 text-sm'

  return (
    <button
      className={cn(
        cellSizeClass,
        'relative flex items-center justify-center font-mono font-bold transition-all duration-150 outline-none focus-visible:z-10',
        'border border-border/50',
        isRightBorder && 'border-r-2 border-r-primary/60',
        isBottomBorder && 'border-b-2 border-b-primary/60',
        isSelected && !disabled && 'ring-2 ring-primary ring-offset-1 ring-offset-background z-10',
        cell.isPreFilled
          ? 'text-primary bg-muted/50 cursor-default'
          : cell.value !== 0
            ? 'text-secondary'
            : 'text-muted-foreground',
        !disabled && !cell.isPreFilled && 'hover:bg-muted/30 cursor-pointer',
        disabled && 'cursor-default',
        animationClass
      )}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-label={`Cell row ${row + 1} column ${col + 1}, value ${cell.value || 'empty'}`}
    >
      {cell.value !== 0 ? cell.value : ''}
    </button>
  )
}
