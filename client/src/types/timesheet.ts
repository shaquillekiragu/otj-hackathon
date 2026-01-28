export interface TimesheetEntry {
  id: string
  date: string
  timeStarted: string
  timeFinished: string
  duration: string
}

export interface NewTimesheetEntry {
  date: string
  timeStarted: string
  timeFinished: string
}
