import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Quick Sort Visualizer - SiliconAlgo',
  description: 'Watch Quick Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function QuickSortPage() {
  return <SortingPageShell algorithmKey="quick" />
}
