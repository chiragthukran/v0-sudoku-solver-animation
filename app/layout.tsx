import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'SiliconAlgo - Interactive Algorithm Visualizer',
  description: 'Watch algorithms come alive. Explore sorting, searching, graph traversal, backtracking, and more through playful real-time visual simulations.',
}

export const viewport: Viewport = {
  themeColor: '#0f0d1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
