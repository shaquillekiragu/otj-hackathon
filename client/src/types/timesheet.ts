export interface TimesheetEntry {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface NewTimesheetEntry {
  date: string;
  startTime: string;
  endTime: string;
}
