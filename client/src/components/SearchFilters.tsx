import { useState, useEffect } from 'react';
import { useUserTags } from '../hooks/useUserTags';
import { type Tag } from '../types/journal';

const DEBOUNCE_DELAY = 500;

interface SearchFiltersProps {
  onSearchChange: (search: string) => void;
  onTagsChange: (tags: string[]) => void;
}

const SearchFilters = ({
  onSearchChange,
  onTagsChange,
}: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { tags: userTags } = useUserTags();

  // Keep existing debounce logic for search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange]);

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagId = e.target.value;
    if (selectedTagId) {
      const tag = userTags.find((t) => t.id === selectedTagId);
      if (tag && !selectedTags.find((t) => t.id === tag.id)) {
        const newTags = [...selectedTags, tag];
        setSelectedTags(newTags);
        onTagsChange(newTags.map((t) => t.tagDescription));
      }
    }
  };

  const removeTag = (tagId: string) => {
    const newTags = selectedTags.filter((tag) => tag.id !== tagId);
    setSelectedTags(newTags);
    onTagsChange(newTags.map((t) => t.tagDescription));
  };

  return (
    <article className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:pr-8">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          className="border rounded-lg p-2 min-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="flex flex-col gap-2 lg:items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Tags</label>
          <select
            className="border rounded-lg p-2"
            onChange={handleTagChange}
            value=""
          >
            <option value="">Add Tag Filter</option>
            {userTags.map((tag) => (
              <option
                key={tag.id}
                value={tag.id}
                disabled={selectedTags.some((t) => t.id === tag.id)}
              >
                {tag.tagDescription}
              </option>
            ))}
          </select>
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded text-white text-sm font-medium flex items-center gap-2"
                style={{ backgroundColor: tag.tagColour }}
              >
                <button
                  type="button"
                  onClick={() => removeTag(tag.id)}
                  className="bg-transparent! border-none! text-white! p-0! m-0! hover:opacity-70 cursor-pointer"
                  aria-label={`Remove ${tag.tagDescription} filter`}
                >
                  ×
                </button>
                {tag.tagDescription}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default SearchFilters;
