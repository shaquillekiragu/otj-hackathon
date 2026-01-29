import TimesheetSection from './TimesheetSection';
import TagSection from './TagSection';
import { useTimesheetManagement } from '../hooks/useTimesheetManagement';
import { type JournalEntry } from '../utils/journalData';
import { type TimesheetEntry } from '../types/timesheet';

interface ReadEntryViewProps {
  entryData: JournalEntry;
  timesheetEntries: TimesheetEntry[];
  fetchTimesheets: (page: number) => Promise<void>;
  totalPages: number;
  currentPage: number;
  onTimesheetUpdate?: (updatedTimesheets: TimesheetEntry[]) => Promise<void>;
}

const ReadEntryView = ({
  entryData,
  timesheetEntries,
  fetchTimesheets,
  totalPages,
  currentPage,
  onTimesheetUpdate,
}: ReadEntryViewProps) => {
  const timesheetProps = useTimesheetManagement({
    initialEntries: timesheetEntries,
    fetchTimesheets,
    totalPages,
    currentPage,
    onTimesheetsUpdate: onTimesheetUpdate,
  });

  const sections = [
    {
      title:
        'What skill, knowledge, or behaviour were you aiming to develop or improve?',
      content: entryData.description.intend,
    },
    {
      title:
        'Briefly describe what you did to learn this (for example: training session, independent study, shadowing, workshop, or practical task).',
      content: entryData.description.implementation,
    },
    {
      title:
        'What did you learn, and how will this be applied in your role or future work?',
      content: entryData.description.impact,
    },
  ];

  return (
    <>
      <div className="mb-6 pb-4 border-b-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {entryData.title}
        </h2>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {entryData.category}
          </span>
          <p className="text-sm text-gray-500">
            Updated: {new Date(entryData.updatedAt).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300">
            {section.title}
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <TimesheetSection {...timesheetProps} />
      </div>

      <div className="mt-8">
        <TagSection selectedTags={entryData.tags || []} mode="read" />
      </div>
    </>
  );
};

export default ReadEntryView;
