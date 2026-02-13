export type CellState = {
  value: number
  isPreFilled: boolean
  animation: 'none' | 'try' | 'backtrack' | 'solved' | 'pop'
}

export type SolveStep = {
  row: number
  col: number
  value: number
  action: 'try' | 'backtrack' | 'place'
}

export function createEmptyGrid(size: number): CellState[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      value: 0,
      isPreFilled: false,
      animation: 'none' as const,
    }))
  )
}

export function getBoxSize(n: number): { boxRows: number; boxCols: number } {
  // For standard Sudoku sizes
  const sqrt = Math.sqrt(n)
  if (Number.isInteger(sqrt)) {
    return { boxRows: sqrt, boxCols: sqrt }
  }
  // For non-perfect-square sizes, find closest factors
  for (let i = Math.floor(sqrt); i >= 1; i--) {
    if (n % i === 0) {
      return { boxRows: i, boxCols: n / i }
    }
  }
  return { boxRows: 1, boxCols: n }
}

function isValid(
  grid: number[][],
  row: number,
  col: number,
  num: number,
  n: number,
  boxRows: number,
  boxCols: number
): boolean {
  // Check row
  for (let c = 0; c < n; c++) {
    if (grid[row][c] === num) return false
  }

  // Check column
  for (let r = 0; r < n; r++) {
    if (grid[r][col] === num) return false
  }

  // Check box
  const startRow = Math.floor(row / boxRows) * boxRows
  const startCol = Math.floor(col / boxCols) * boxCols
  for (let r = startRow; r < startRow + boxRows; r++) {
    for (let c = startCol; c < startCol + boxCols; c++) {
      if (grid[r][c] === num) return false
    }
  }

  return true
}

export function generateSolveSteps(
  initialGrid: CellState[][],
  n: number
): SolveStep[] {
  const steps: SolveStep[] = []
  const grid = initialGrid.map(row => row.map(cell => cell.value))
  const { boxRows, boxCols } = getBoxSize(n)

  function solve(): boolean {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= n; num++) {
            if (isValid(grid, row, col, num, n, boxRows, boxCols)) {
              grid[row][col] = num
              steps.push({ row, col, value: num, action: 'try' })

              if (solve()) {
                steps.push({ row, col, value: num, action: 'place' })
                return true
              }

              grid[row][col] = 0
              steps.push({ row, col, value: 0, action: 'backtrack' })
            }
          }
          return false
        }
      }
    }
    return true
  }

  solve()
  return steps
}
