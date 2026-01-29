import { type Tag } from '../types/journal'
import { type TimesheetEntry } from '../types/timesheet'

export interface Description {
  intend: string
  implementation: string
  impact: string
}

export interface JournalEntry {
  id: string
  title: string
  category: string
  description: Description
  timeSheets?: TimesheetEntry[]
  tags?: Tag[]
  createdAt: string
  updatedAt: string
}
