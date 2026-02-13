'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  connections: number[]
}

export function HeroVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = [
      'hsl(45, 100%, 55%)',   // neon yellow
      'hsl(340, 85%, 60%)',   // neon pink
      'hsl(160, 80%, 45%)',   // neon green
      'hsl(200, 90%, 55%)',   // neon blue
    ]

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize particles as graph nodes
    const numParticles = 60
    const rect = canvas.getBoundingClientRect()
    const particles: Particle[] = []

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      })
    }

    particlesRef.current = particles

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    let time = 0

    const animate = () => {
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      time += 0.005

      // Update particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > r.width) p.vx *= -1
        if (p.y < 0 || p.y > r.height) p.vy *= -1

        // Mouse repulsion
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.02
          p.vx += dx / dist * force
          p.vy += dy / dist * force
        }

        // Dampen velocity
        p.vx *= 0.999
        p.vy *= 0.999
      }

      // Draw connections
      const connectionDist = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.35
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)

            // Animated gradient line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            )
            const c1 = particles[i].color.replace(')', ` / ${opacity})`)
              .replace('hsl(', 'hsla(')
            const c2 = particles[j].color.replace(')', ` / ${opacity})`)
              .replace('hsl(', 'hsla(')
            gradient.addColorStop(0, c1)
            gradient.addColorStop(1, c2)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw "sorting bars" animation in the background
      const barCount = 20
      const barWidth = r.width / barCount
      for (let i = 0; i < barCount; i++) {
        const height = (Math.sin(time * 2 + i * 0.5) + 1) * 0.5 * (r.height * 0.15)
        const hue = 45 + (i / barCount) * 120
        ctx.fillStyle = `hsla(${hue}, 85%, 55%, 0.04)`
        ctx.fillRect(
          i * barWidth,
          r.height - height,
          barWidth - 2,
          height
        )
      }

      // Draw particles as glowing nodes
      for (const p of particles) {
        // Glow
        const glowRadius = p.radius * 4
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        )
        const glowColor = p.color.replace(')', ' / 0.3)')
          .replace('hsl(', 'hsla(')
        gradient.addColorStop(0, glowColor)
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Draw traversal "pulse" effect
      const pulseIdx = Math.floor(time * 8) % particles.length
      const pp = particles[pulseIdx]
      if (pp) {
        const pulseSize = (Math.sin(time * 10) + 1) * 8 + 4
        ctx.beginPath()
        ctx.arc(pp.x, pp.y, pulseSize, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(45, 100%, 55%, ${0.3 + Math.sin(time * 10) * 0.2})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
