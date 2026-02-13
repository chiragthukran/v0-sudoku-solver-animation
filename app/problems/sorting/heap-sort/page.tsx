import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Heap Sort Visualizer - SiliconAlgo',
  description: 'Watch Heap Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function HeapSortPage() {
  return <SortingPageShell algorithmKey="heap" />
}
