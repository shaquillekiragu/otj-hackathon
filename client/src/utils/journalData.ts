import { type Tag } from '../types/journal'
import { type TimesheetEntry } from '../types/timesheet'

export interface JournalEntry {
  id: string
  title: string
  category: string
  learningAims: string
  learningMethod: string
  impact: string
  lastTimesheetUpdate: string
  selectedTags: Tag[]
  timesheetEntries: TimesheetEntry[]
}

// Static journal entry data
const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    title: 'Learning TypeScript Advanced Types',
    category: 'Technical Skills',
    learningAims:
      'To understand and apply advanced TypeScript features including generics, utility types, and conditional types to write more type-safe code.',
    learningMethod:
      'Read official TypeScript documentation, completed online tutorials, and refactored existing codebase to use advanced types.',
    impact:
      'Reduced runtime errors by 40% and improved code maintainability. Team members can now understand type contracts more clearly.',
    lastTimesheetUpdate: '26/01/26',
    selectedTags: [
      { id: '1', name: 'Learning', hexColor: '#3B82F6' },
      { id: '2', name: 'Development', hexColor: '#10B981' },
      { id: '5', name: 'Documentation', hexColor: '#EF4444' }
    ],
    timesheetEntries: [
      {
        date: '2026-01-20',
        timeStarted: '09:00',
        timeFinished: '11:30',
        duration: '2h 30m'
      },
      {
        date: '2026-01-22',
        timeStarted: '10:00',
        timeFinished: '13:00',
        duration: '3h'
      },
      {
        date: '2026-01-26',
        timeStarted: '09:00',
        timeFinished: '13:00',
        duration: '4h'
      }
    ]
  },
  {
    id: '2',
    title: 'React Performance Optimization',
    category: 'Frontend Development',
    learningAims:
      'To learn techniques for optimizing React application performance including memoization, code splitting, and lazy loading.',
    learningMethod:
      'Attended a workshop on React performance, analyzed bundle sizes, implemented useMemo and React.memo in critical components.',
    impact:
      'Reduced initial page load time by 60% and improved user experience. Application now handles larger datasets without lag.',
    lastTimesheetUpdate: '24/01/26',
    selectedTags: [
      { id: '1', name: 'Learning', hexColor: '#3B82F6' },
      { id: '2', name: 'Development', hexColor: '#10B981' },
      { id: '6', name: 'Testing', hexColor: '#EC4899' }
    ],
    timesheetEntries: [
      {
        date: '2026-01-15',
        timeStarted: '09:00',
        timeFinished: '13:00',
        duration: '4h'
      },
      {
        date: '2026-01-18',
        timeStarted: '10:00',
        timeFinished: '13:30',
        duration: '3h 30m'
      },
      {
        date: '2026-01-24',
        timeStarted: '09:00',
        timeFinished: '14:00',
        duration: '5h'
      }
    ]
  },
  {
    id: '3',
    title: 'Database Design and Normalization',
    category: 'Backend Development',
    learningAims:
      'To understand database normalization principles and design efficient database schemas for scalable applications.',
    learningMethod:
      'Studied database design patterns, worked through normalization examples, and redesigned our application database schema.',
    impact:
      'Eliminated data redundancy and improved query performance by 50%. Database is now easier to maintain and scale.',
    lastTimesheetUpdate: '20/01/26',
    selectedTags: [
      { id: '1', name: 'Learning', hexColor: '#3B82F6' },
      { id: '3', name: 'Research', hexColor: '#8B5CF6' },
      { id: '5', name: 'Documentation', hexColor: '#EF4444' }
    ],
    timesheetEntries: [
      {
        date: '2026-01-10',
        timeStarted: '10:00',
        timeFinished: '13:00',
        duration: '3h'
      },
      {
        date: '2026-01-15',
        timeStarted: '09:00',
        timeFinished: '13:30',
        duration: '4h 30m'
      },
      {
        date: '2026-01-20',
        timeStarted: '09:00',
        timeFinished: '15:00',
        duration: '6h'
      }
    ]
  }
]

/**
 * Simulates fetching a journal entry by ID
 * In production, this would be replaced with an actual API call
 */
export const getJournalEntryById = async (
  entryId: string
): Promise<JournalEntry | null> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const entry = JOURNAL_ENTRIES.find((e) => e.id === entryId)
  return entry || null
}

/**
 * Simulates fetching all journal entries
 * In production, this would be replaced with an actual API call
 */
export const getAllJournalEntries = async (): Promise<JournalEntry[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return JOURNAL_ENTRIES
}
