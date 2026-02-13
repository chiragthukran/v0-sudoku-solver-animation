export type SortStep = {
  array: number[]
  comparing: [number, number] | null
  swapping: [number, number] | null
  sorted: number[]
  pivot?: number
  auxiliary?: { index: number; value: number }[]
  label?: string
}

// ── Bubble Sort ──
export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sorted: number[] = []

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      yield { array: [...a], comparing: [j, j + 1], swapping: null, sorted: [...sorted], label: `Comparing index ${j} and ${j + 1}` }
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
        yield { array: [...a], comparing: null, swapping: [j, j + 1], sorted: [...sorted], label: `Swapped ${a[j + 1]} and ${a[j]}` }
      }
    }
    sorted.push(n - 1 - i)
    if (!swapped) break
  }
  sorted.push(0)
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

// ── Selection Sort ──
export function* selectionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sorted: number[] = []

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      yield { array: [...a], comparing: [minIdx, j], swapping: null, sorted: [...sorted], label: `Finding minimum from index ${i}` }
      if (a[j] < a[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      yield { array: [...a], comparing: null, swapping: [i, minIdx], sorted: [...sorted], label: `Placed ${a[i]} at index ${i}` }
    }
    sorted.push(i)
  }
  sorted.push(n - 1)
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

// ── Insertion Sort ──
export function* insertionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sorted: number[] = [0]

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1
    yield { array: [...a], comparing: [i, j], swapping: null, sorted: [...sorted], label: `Inserting element at index ${i}` }
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]
      yield { array: [...a], comparing: null, swapping: [j, j + 1], sorted: [...sorted], label: `Shifting ${a[j]} right` }
      j--
    }
    a[j + 1] = key
    sorted.push(i)
    yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted], label: `Inserted ${key} at position ${j + 1}` }
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

// ── Merge Sort ──
export function* mergeSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sortedSet = new Set<number>()

  function* mergeSortHelper(start: number, end: number): Generator<SortStep> {
    if (end - start <= 1) return
    const mid = Math.floor((start + end) / 2)
    yield* mergeSortHelper(start, mid)
    yield* mergeSortHelper(mid, end)
    yield* merge(start, mid, end)
  }

  function* merge(start: number, mid: number, end: number): Generator<SortStep> {
    const left = a.slice(start, mid)
    const right = a.slice(mid, end)
    let i = 0, j = 0, k = start

    while (i < left.length && j < right.length) {
      yield { array: [...a], comparing: [start + i, mid + j], swapping: null, sorted: [...sortedSet], label: `Merging [${start}..${end - 1}]` }
      if (left[i] <= right[j]) {
        a[k] = left[i]
        i++
      } else {
        a[k] = right[j]
        j++
      }
      yield { array: [...a], comparing: null, swapping: [k, k], sorted: [...sortedSet], label: `Placed ${a[k]} at index ${k}` }
      k++
    }

    while (i < left.length) {
      a[k] = left[i]
      yield { array: [...a], comparing: null, swapping: [k, k], sorted: [...sortedSet], label: `Placed ${a[k]} at index ${k}` }
      i++
      k++
    }

    while (j < right.length) {
      a[k] = right[j]
      yield { array: [...a], comparing: null, swapping: [k, k], sorted: [...sortedSet], label: `Placed ${a[k]} at index ${k}` }
      j++
      k++
    }

    if (start === 0 && end === n) {
      for (let x = start; x < end; x++) sortedSet.add(x)
    }
  }

  yield* mergeSortHelper(0, n)
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

// ── Quick Sort ──
export function* quickSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sortedSet = new Set<number>()

  function* quickSortHelper(low: number, high: number): Generator<SortStep> {
    if (low < high) {
      let pivotIndex = yield* partition(low, high)
      sortedSet.add(pivotIndex)
      yield* quickSortHelper(low, pivotIndex - 1)
      yield* quickSortHelper(pivotIndex + 1, high)
    } else if (low === high) {
      sortedSet.add(low)
    }
  }

  function* partition(low: number, high: number): Generator<SortStep, number> {
    const pivot = a[high]
    yield { array: [...a], comparing: null, swapping: null, sorted: [...sortedSet], pivot: high, label: `Pivot = ${pivot} at index ${high}` }
    let i = low - 1

    for (let j = low; j < high; j++) {
      yield { array: [...a], comparing: [j, high], swapping: null, sorted: [...sortedSet], pivot: high, label: `Comparing ${a[j]} with pivot ${pivot}` }
      if (a[j] < pivot) {
        i++
        ;[a[i], a[j]] = [a[j], a[i]]
        yield { array: [...a], comparing: null, swapping: [i, j], sorted: [...sortedSet], pivot: high, label: `Swapped index ${i} and ${j}` }
      }
    }

    ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
    yield { array: [...a], comparing: null, swapping: [i + 1, high], sorted: [...sortedSet], pivot: i + 1, label: `Pivot ${pivot} placed at index ${i + 1}` }
    return i + 1
  }

  yield* quickSortHelper(0, n - 1)
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

// ── Heap Sort ──
export function* heapSort(arr: number[]): Generator<SortStep> {
  const a = [...arr]
  const n = a.length
  const sorted: number[] = []

  function* heapify(size: number, i: number): Generator<SortStep> {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < size) {
      yield { array: [...a], comparing: [largest, left], swapping: null, sorted: [...sorted], label: `Heapify: comparing ${a[largest]} and ${a[left]}` }
      if (a[left] > a[largest]) largest = left
    }
    if (right < size) {
      yield { array: [...a], comparing: [largest, right], swapping: null, sorted: [...sorted], label: `Heapify: comparing ${a[largest]} and ${a[right]}` }
      if (a[right] > a[largest]) largest = right
    }

    if (largest !== i) {
      ;[a[i], a[largest]] = [a[largest], a[i]]
      yield { array: [...a], comparing: null, swapping: [i, largest], sorted: [...sorted], label: `Swapped ${a[largest]} and ${a[i]}` }
      yield* heapify(size, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i)
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted], label: 'Max heap built' }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    ;[a[0], a[i]] = [a[i], a[0]]
    sorted.push(i)
    yield { array: [...a], comparing: null, swapping: [0, i], sorted: [...sorted], label: `Extracted max ${a[i]} to position ${i}` }
    yield* heapify(i, 0)
  }
  sorted.push(0)
  yield { array: [...a], comparing: null, swapping: null, sorted: Array.from({ length: n }, (_, i) => i), label: 'Sorted!' }
}

export const SORTING_ALGORITHMS = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort, complexity: { best: 'O(n)', avg: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, stable: true, description: 'Repeatedly swaps adjacent elements that are out of order. Simple but inefficient for large datasets.' },
  selection: { name: 'Selection Sort', fn: selectionSort, complexity: { best: 'O(n\u00B2)', avg: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, stable: false, description: 'Finds the minimum element and places it at the beginning. Simple comparison-based sort.' },
  insertion: { name: 'Insertion Sort', fn: insertionSort, complexity: { best: 'O(n)', avg: 'O(n\u00B2)', worst: 'O(n\u00B2)' }, stable: true, description: 'Builds a sorted array one element at a time by inserting each into its correct position.' },
  merge: { name: 'Merge Sort', fn: mergeSort, complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' }, stable: true, description: 'Divides the array in half, recursively sorts each half, then merges. Guaranteed O(n log n).' },
  quick: { name: 'Quick Sort', fn: quickSort, complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n\u00B2)' }, stable: false, description: 'Picks a pivot, partitions around it, and recursively sorts partitions. Very fast in practice.' },
  heap: { name: 'Heap Sort', fn: heapSort, complexity: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' }, stable: false, description: 'Builds a max heap, repeatedly extracts the maximum. In-place with guaranteed O(n log n).' },
} as const

export type SortAlgorithmKey = keyof typeof SORTING_ALGORITHMS
