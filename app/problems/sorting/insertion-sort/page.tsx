import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Insertion Sort Visualizer - SiliconAlgo',
  description: 'Watch Insertion Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function InsertionSortPage() {
  return <SortingPageShell algorithmKey="insertion" />
}
