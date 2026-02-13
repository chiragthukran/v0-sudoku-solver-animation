'use client'

import { useCallback, useRef } from 'react'

type SoundType = 'place' | 'try' | 'backtrack' | 'solved' | 'noSolution' | 'click' | 'start'

export function useSound() {
  const contextRef = useRef<AudioContext | null>(null)
  const enabledRef = useRef(true)

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = new AudioContext()
    }
    return contextRef.current
  }, [])

  const play = useCallback(
    (type: SoundType) => {
      if (!enabledRef.current) return
      try {
        const ctx = getContext()
        const now = ctx.currentTime

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        switch (type) {
          case 'try': {
            // Quick blip - short sine tone
            osc.type = 'sine'
            osc.frequency.setValueAtTime(440, now)
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.05)
            gain.gain.setValueAtTime(0.06, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
            osc.start(now)
            osc.stop(now + 0.06)
            break
          }
          case 'place': {
            // Satisfying pop
            osc.type = 'sine'
            osc.frequency.setValueAtTime(600, now)
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.08)
            gain.gain.setValueAtTime(0.1, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
            osc.start(now)
            osc.stop(now + 0.1)
            break
          }
          case 'backtrack': {
            // Descending buzz
            osc.type = 'sawtooth'
            osc.frequency.setValueAtTime(300, now)
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1)
            gain.gain.setValueAtTime(0.05, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
            osc.start(now)
            osc.stop(now + 0.1)
            break
          }
          case 'solved': {
            // Victory arpeggio - play multiple notes
            gain.gain.setValueAtTime(0.12, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
            osc.type = 'sine'
            osc.frequency.setValueAtTime(523, now)         // C5
            osc.frequency.setValueAtTime(659, now + 0.12)  // E5
            osc.frequency.setValueAtTime(784, now + 0.24)  // G5
            osc.frequency.setValueAtTime(1047, now + 0.36) // C6
            osc.start(now)
            osc.stop(now + 0.8)

            // Second harmonic layer
            const osc2 = ctx.createOscillator()
            const gain2 = ctx.createGain()
            osc2.connect(gain2)
            gain2.connect(ctx.destination)
            osc2.type = 'triangle'
            gain2.gain.setValueAtTime(0.06, now + 0.05)
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9)
            osc2.frequency.setValueAtTime(784, now + 0.05)
            osc2.frequency.setValueAtTime(1047, now + 0.2)
            osc2.frequency.setValueAtTime(1319, now + 0.4)
            osc2.start(now + 0.05)
            osc2.stop(now + 0.9)
            break
          }
          case 'noSolution': {
            // Sad descending tone
            osc.type = 'sawtooth'
            osc.frequency.setValueAtTime(400, now)
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.5)
            gain.gain.setValueAtTime(0.08, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
            osc.start(now)
            osc.stop(now + 0.5)
            break
          }
          case 'click': {
            // UI click
            osc.type = 'sine'
            osc.frequency.setValueAtTime(1200, now)
            gain.gain.setValueAtTime(0.05, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
            osc.start(now)
            osc.stop(now + 0.03)
            break
          }
          case 'start': {
            // Engine start - rising sweep
            osc.type = 'sawtooth'
            osc.frequency.setValueAtTime(80, now)
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.3)
            gain.gain.setValueAtTime(0.08, now)
            gain.gain.setValueAtTime(0.1, now + 0.15)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
            osc.start(now)
            osc.stop(now + 0.4)
            break
          }
        }
      } catch {
        // Audio context may not be available
      }
    },
    [getContext]
  )

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled
  }, [])

  const isEnabled = useCallback(() => {
    return enabledRef.current
  }, [])

  return { play, setEnabled, isEnabled }
}
