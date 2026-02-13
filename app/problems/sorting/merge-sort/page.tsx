import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Merge Sort Visualizer - SiliconAlgo',
  description: 'Watch Merge Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function MergeSortPage() {
  return <SortingPageShell algorithmKey="merge" />
}
