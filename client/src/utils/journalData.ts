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
