import { ObjectId } from 'mongodb';
import { journalEntriesCollection } from '../../db/collections';

/**
 * Calculate total actual OTJ hours from all journal entries for a user
 * by summing the duration of all timesheets.
 * Duration is stored in minutes, so we convert to hours.
 */
export async function calculateActualOTJHours(
  userId: ObjectId,
): Promise<number> {
  const entries = await journalEntriesCollection().find({ userId }).toArray();

  let totalHours = 0;

  for (const entry of entries) {
    if (entry.timeSheets && entry.timeSheets.length > 0) {
      for (const timesheet of entry.timeSheets) {
        // Duration is stored in minutes, convert each to hours
        totalHours += timesheet.duration / 60;
      }
    }
  }

  // Round to 2 decimal places to avoid floating point precision issues
  return Math.round(totalHours * 100) / 100;
}
