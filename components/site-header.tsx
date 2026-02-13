'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Cpu, Github } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-lg bg-primary/20 blur-sm group-hover:bg-primary/30 transition-colors animate-neon-pulse" />
            <Cpu className="relative w-7 h-7 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono tracking-tight">
            <span className="text-primary">Silicon</span>
            <span className="text-foreground">Algo</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/problems/sudoku"
            className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            Sudoku
          </Link>
          <span className="text-sm font-mono text-muted-foreground/40 cursor-default">
            More Soon
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono',
              'border border-border/50 text-muted-foreground',
              'hover:bg-muted/30 hover:text-foreground transition-all duration-150'
            )}
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
