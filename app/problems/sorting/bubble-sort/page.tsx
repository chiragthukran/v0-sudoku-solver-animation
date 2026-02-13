import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Bubble Sort Visualizer - SiliconAlgo',
  description: 'Watch Bubble Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function BubbleSortPage() {
  return <SortingPageShell algorithmKey="bubble" />
}
