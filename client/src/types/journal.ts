export interface Tag {
  id: string
  name: string
  hexColor: string
}

// Placeholder tag data (will come from API)
export const PLACEHOLDER_TAGS: Tag[] = [
  { id: '1', name: 'Learning', hexColor: '#3B82F6' },
  { id: '2', name: 'Development', hexColor: '#10B981' },
  { id: '3', name: 'Research', hexColor: '#8B5CF6' },
  { id: '4', name: 'Mentoring', hexColor: '#F59E0B' },
  { id: '5', name: 'Documentation', hexColor: '#EF4444' },
  { id: '6', name: 'Testing', hexColor: '#EC4899' },
  { id: '7', name: 'Meeting', hexColor: '#14B8A6' },
  { id: '8', name: 'Review', hexColor: '#6366F1' }
]

export const PLACEHOLDER_ENTRIES = [
  {
    id: '1',
    title: 'Entry 1',
    description: 'Description for entry 1',
    date: '2026-01-26'
  },
  {
    id: '2',
    title: 'Entry 2',
    description: 'Description for entry 2',
    date: '2026-01-24'
  },
  {
    id: '3',
    title: 'Entry 3',
    description: 'Description for entry 3',
    date: '2026-01-20'
  }
]
