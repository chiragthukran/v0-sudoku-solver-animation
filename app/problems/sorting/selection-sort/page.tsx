import { SortingPageShell } from '@/components/sorting-page-shell'

export const metadata = {
  title: 'Selection Sort Visualizer - SiliconAlgo',
  description: 'Watch Selection Sort in action with real-time bar chart animations, step-by-step controls, and performance stats.',
}

export default function SelectionSortPage() {
  return <SortingPageShell algorithmKey="selection" />
}
