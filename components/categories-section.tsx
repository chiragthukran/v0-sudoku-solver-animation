'use client'

import { CategoryCard } from './category-card'
import { StaggerChildren } from './stagger-children'
import {
  ArrowUpDown,
  Search,
  GitBranch,
  Undo2,
  BarChart3,
  Network,
  Binary,
  Boxes,
} from 'lucide-react'

const categories = [
  {
    title: 'Sorting',
    description: 'Bubble, Merge, Quick, Heap, Insertion, Selection and more visual comparisons',
    icon: ArrowUpDown,
    problems: 7,
    color: 'yellow' as const,
    tag: 'Classic',
    href: '#',
  },
  {
    title: 'Searching',
    description: 'Binary Search, Linear Search, Ternary Search with animated array walkthroughs',
    icon: Search,
    problems: 4,
    color: 'pink' as const,
    tag: 'Fundamental',
    href: '#',
  },
  {
    title: 'Graph Algorithms',
    description: 'BFS, DFS, Dijkstra, A* pathfinding on interactive grid and graph structures',
    icon: Network,
    problems: 5,
    color: 'green' as const,
    tag: 'Advanced',
    href: '#',
  },
  {
    title: 'Backtracking',
    description: 'N-Queens, Sudoku Solver, Maze generation with step-by-step backtrack visualization',
    icon: Undo2,
    problems: 3,
    color: 'blue' as const,
    tag: 'Interactive',
    href: '/problems/sudoku',
  },
  {
    title: 'Dynamic Programming',
    description: 'Fibonacci, Knapsack, LCS, Coin Change with memoization table animations',
    icon: BarChart3,
    problems: 4,
    color: 'pink' as const,
    tag: 'Optimization',
    href: '#',
  },
  {
    title: 'Trees',
    description: 'BST operations, AVL rotations, tree traversals with node-by-node highlighting',
    icon: GitBranch,
    problems: 4,
    color: 'green' as const,
    tag: 'Data Structure',
    href: '#',
  },
  {
    title: 'Bit Manipulation',
    description: 'XOR tricks, bit counting, power of two checks with binary visual breakdowns',
    icon: Binary,
    problems: 3,
    color: 'yellow' as const,
    tag: 'Low-Level',
    href: '#',
  },
  {
    title: 'Divide & Conquer',
    description: 'Merge Sort internals, Karatsuba multiplication, closest pair with split animations',
    icon: Boxes,
    problems: 3,
    color: 'blue' as const,
    tag: 'Strategy',
    href: '#',
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 mb-14 text-center">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
            Browse by Topic
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <span className="text-foreground">Pick a </span>
            <span className="text-secondary">Category</span>
            <span className="text-foreground">, Start </span>
            <span className="text-accent">Visualizing</span>
          </h2>
          <p className="max-w-lg text-sm font-mono text-muted-foreground leading-relaxed">
            Each category contains interactive algorithm visualizations with
            real-time animations, step counters, and speed controls.
          </p>
        </div>

        {/* Grid */}
        <StaggerChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          staggerMs={80}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
