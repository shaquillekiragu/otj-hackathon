export interface Tag {
  id: string
  tagDescription: string
  tagColour: string
}

// Placeholder tag data (will come from API)
export const PLACEHOLDER_TAGS: Tag[] = [
  { id: '1', tagDescription: 'Learning', tagColour: '#3B82F6' },
  { id: '2', tagDescription: 'Development', tagColour: '#10B981' },
  { id: '3', tagDescription: 'Research', tagColour: '#8B5CF6' },
  { id: '4', tagDescription: 'Mentoring', tagColour: '#F59E0B' },
  { id: '5', tagDescription: 'Documentation', tagColour: '#EF4444' },
  { id: '6', tagDescription: 'Testing', tagColour: '#EC4899' },
  { id: '7', tagDescription: 'Meeting', tagColour: '#14B8A6' },
  { id: '8', tagDescription: 'Review', tagColour: '#6366F1' }
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
