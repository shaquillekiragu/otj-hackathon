import { useState, useEffect } from 'react';
import TimesheetSection from './TimesheetSection';
import TagSection from './TagSection';
import { useTimesheetManagement } from '../hooks/useTimesheetManagement';
import { type Tag } from '../types/journal';
import { type JournalEntry } from '../utils/journalData';
import { type TimesheetEntry } from '../types/timesheet';

interface EditEntryViewProps {
  entryData: JournalEntry | null;
  onUpdate: (updates: Partial<JournalEntry>) => void;
  onTagsUpdate: (tags: Tag[]) => void;
  onTimesheetsUpdate: (timesheets: TimesheetEntry[]) => void;
  timesheetEntries: TimesheetEntry[];
  fetchTimesheets: (page: number) => Promise<void>;
  totalPages: number;
  currentPage: number;
}

const EditEntryView = ({
  entryData,
  onUpdate,
  onTagsUpdate,
  onTimesheetsUpdate,
  timesheetEntries,
  fetchTimesheets,
  totalPages,
  currentPage,
}: EditEntryViewProps) => {
  const timesheetProps = useTimesheetManagement({
    initialEntries: timesheetEntries,
    fetchTimesheets,
    totalPages,
    currentPage,
    onTimesheetsUpdate,
  });

  // Local state for form fields
  const [localData, setLocalData] = useState({
    title: entryData?.title || '',
    category: entryData?.category || '',
    intend: entryData?.description.intend || '',
    implementation: entryData?.description.implementation || '',
    impact: entryData?.description.impact || '',
  });

  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    entryData?.tags || [],
  );

  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);

  // Update local state when entryData changes
  useEffect(() => {
    if (entryData) {
      setLocalData({
        title: entryData.title || '',
        category: entryData.category || '',
        intend: entryData.description?.intend || '',
        implementation: entryData.description?.implementation || '',
        impact: entryData.description?.impact || '',
      });
      setSelectedTags(entryData.tags || []);
    }
  }, [entryData]);

  const handleFieldChange = (field: keyof typeof localData, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);

    // Update with proper description object structure
    if (
      field === 'intend' ||
      field === 'implementation' ||
      field === 'impact'
    ) {
      onUpdate({
        description: {
          intend: field === 'intend' ? value : localData.intend,
          implementation:
            field === 'implementation' ? value : localData.implementation,
          impact: field === 'impact' ? value : localData.impact,
        },
      });
    } else {
      onUpdate({ [field]: value });
    }
  };

  const addTag = (tag: Tag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onTagsUpdate(updatedTags);
    }
  };

  const removeTag = (tagId: string) => {
    const updatedTags = selectedTags.filter((t) => t.id !== tagId);
    setSelectedTags(updatedTags);
    onTagsUpdate(updatedTags);
  };

  const sections = [
    {
      title:
        'What skill, knowledge, or behaviour were you aiming to develop or improve?',
      field: 'intend' as keyof typeof localData,
    },
    {
      title:
        'Briefly describe what you did to learn this (for example: training session, independent study, shadowing, workshop, or practical task).',
      field: 'implementation' as keyof typeof localData,
    },
    {
      title:
        'What did you learn, and how will this be applied in your role or future work?',
      field: 'impact' as keyof typeof localData,
    },
  ];

  return (
    <>
      <div className="mb-6 pb-4 border-b-2 border-gray-200">
        <input
          type="text"
          value={localData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="Title"
          className="text-3xl font-bold text-gray-900 border-b-2 border-transparent focus:border-blue-500 focus:outline-none pb-2 w-full transition-colors mb-3"
        />
        <p className="text-sm text-gray-500">
          {entryData
            ? `Last updated: ${new Date(entryData.updatedAt).toLocaleDateString('en-GB')}`
            : 'New entry'}
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3 relative">
        <select
          value={localData.category}
          onChange={(e) => handleFieldChange('category', e.target.value)}
          className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="">Select a category...</option>
          <option value="Technical Skills">Technical Skills</option>
          <option value="Professional Development">
            Professional Development
          </option>
          <option value="Project Work">Project Work</option>
          <option value="Team Collaboration">Team Collaboration</option>
        </select>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryTooltip(!showCategoryTooltip)}
            className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold hover:bg-blue-100 hover:border-blue-600 cursor-help flex-shrink-0 transition-colors"
          >
            ?
          </button>
          {showCategoryTooltip && (
            <div className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10 w-80">
              <p className="mb-2">
                Categories help you organize your learning activities into key
                areas of development.
              </p>
              <p className="text-xs text-gray-300">
                View the{' '}
                <a href="#" className="underline hover:text-blue-300">
                  category guide image
                </a>{' '}
                for detailed explanations of each category.
              </p>
            </div>
          )}
        </div>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300">
            {section.title}
          </h3>
          <textarea
            value={localData[section.field]}
            maxLength={500}
            onChange={(e) => handleFieldChange(section.field, e.target.value)}
            required
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 min-h-24 focus:border-blue-500 focus:outline-none resize-none transition-colors text-gray-700"
          />
          <p className="text-xs text-gray-500 mt-2">
            {localData[section.field].length}/500 characters
          </p>
        </div>
      ))}

      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <TimesheetSection {...timesheetProps} />
      </div>

      <div className="mt-8">
        <TagSection
          selectedTags={selectedTags}
          mode="edit"
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />
      </div>
    </>
  );
};

export default EditEntryView;
