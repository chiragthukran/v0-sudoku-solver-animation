'use client'

import { type CellState, getBoxSize } from '@/lib/sudoku-solver'
import { SudokuCell } from './sudoku-cell'

type SudokuGridProps = {
  grid: CellState[][]
  gridSize: number
  selectedCell: { row: number; col: number } | null
  onSelectCell: (row: number, col: number) => void
  onValueChange: (row: number, col: number, value: number) => void
  disabled: boolean
}

export function SudokuGrid({
  grid,
  gridSize,
  selectedCell,
  onSelectCell,
  onValueChange,
  disabled,
}: SudokuGridProps) {
  const { boxRows, boxCols } = getBoxSize(gridSize)

  return (
    <div className="relative inline-block">
      {/* Outer glow border */}
      <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-sm" />
      <div
        className="relative rounded-xl border-2 border-primary/40 bg-card/80 backdrop-blur-sm overflow-hidden"
        role="grid"
        aria-label={`${gridSize} by ${gridSize} Sudoku grid`}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex" role="row">
            {row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                gridSize={gridSize}
                boxRows={boxRows}
                boxCols={boxCols}
                isSelected={
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                }
                onSelect={() => onSelectCell(rowIndex, colIndex)}
                onValueChange={(value) =>
                  onValueChange(rowIndex, colIndex, value)
                }
                disabled={disabled}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
