'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerMs?: number
}

export function StaggerChildren({ children, className, staggerMs = 80 }: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={cn(
                'transition-all duration-500',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              )}
              style={{
                transitionDelay: isVisible ? `${i * staggerMs}ms` : '0ms',
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
