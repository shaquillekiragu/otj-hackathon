import { useState } from 'react';
import { type Tag } from '../types/journal';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserTags } from '../hooks/useUserTags';
import { useDeleteTag } from '../hooks/useDeleteTag';
import { useCreateTag } from '../hooks/useCreateTag';

interface TagSectionProps {
  selectedTags: Tag[];
  mode: 'read' | 'edit';
  onAddTag?: (tag: Tag) => void;
  onRemoveTag?: (tagId: string) => void;
  onDeleteTag?: (tagId: string) => void;
}

const TagSection = ({
  selectedTags,
  mode,
  onAddTag,
  onRemoveTag,
  onDeleteTag,
}: TagSectionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const {
    tags: userTags,
    loading: tagsLoading,
    refetch: refetchTags,
  } = useUserTags();
  const { deleteTag, loading: isDeleting } = useDeleteTag();
  const { createTag, loading: isCreating } = useCreateTag();

  const availableTags = userTags.filter(
    (tag) => !selectedTags.find((t) => t.id === tag.id),
  );

  const filteredTags = availableTags.filter((tag) =>
    tag.tagDescription.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddTag = (tag: Tag) => {
    onAddTag?.(tag);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    setSelectedColor('#3B82F6');
  };

  const handleCreateTag = async () => {
    if (!searchQuery.trim()) return;

    const createdTag = await createTag(searchQuery.trim(), selectedColor);

    if (createdTag) {
      onAddTag?.(createdTag);
      setSearchQuery('');
      setSelectedColor('#3B82F6');
      setIsDropdownOpen(false);
      // Refetch to update available tags
      await refetchTags();
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    const success = await deleteTag(tagId);
    if (success) {
      // Call the parent's onDeleteTag callback if provided
      onDeleteTag?.(tagId);
      // Refetch the tags to update the list
      await refetchTags();
    }
  };

  const showCreateOption = searchQuery.trim() && filteredTags.length === 0;

  return (
    <section className="mt-6">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 rounded text-white text-sm font-medium flex items-center gap-2"
            style={{ backgroundColor: tag.tagColour }}
          >
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => onRemoveTag?.(tag.id)}
                className="!bg-transparent !border-none !text-white !p-0 !m-0 hover:opacity-70 cursor-pointer"
              >
                ×
              </button>
            )}
            {tag.tagDescription}
          </span>
        ))}
        {mode === 'edit' && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(true)}
              className="!px-3 !py-1 !rounded !text-sm !font-medium !bg-gray-200 !text-gray-700 hover:!bg-gray-300 !border-none"
            >
              + add tag
            </button>
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleCloseDropdown}
                />
                <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 w-96 flex flex-col">
                  <div className="max-h-64 overflow-y-auto flex-1">
                    {tagsLoading ? (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        Loading tags...
                      </div>
                    ) : filteredTags.length > 0 ? (
                      filteredTags.map((tag) => (
                        <div
                          key={tag.id}
                          className="!w-full !px-4 !py-3 hover:!bg-gray-50 !flex !items-center !justify-between !border-b !border-gray-100 last:!border-b-0 !bg-white !rounded-none"
                        >
                          <button
                            type="button"
                            onClick={() => handleAddTag(tag)}
                            className="!flex-1 !bg-transparent !border-none !text-left !p-0 !m-0 cursor-pointer !text-black"
                          >
                            {tag.tagDescription}
                          </button>
                          <div className="flex items-center gap-3">
                            <span
                              className="w-16 h-8 rounded"
                              style={{ backgroundColor: tag.tagColour }}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTag(tag.id);
                              }}
                              disabled={isDeleting}
                              className="!text-gray-400 hover:!text-red-600 disabled:!opacity-50 disabled:!cursor-not-allowed !bg-transparent !border-none !text-xl !p-0 !m-0 cursor-pointer"
                              title="Delete tag"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : showCreateOption ? (
                      <div className="!w-full !px-4 !py-3 !flex !items-center !gap-3 !bg-white !border-b !border-gray-100">
                        <button
                          type="button"
                          onClick={handleCreateTag}
                          disabled={isCreating}
                          className="!flex-1 hover:!bg-blue-50 disabled:!opacity-50 disabled:!cursor-not-allowed !flex !items-center !gap-2 !bg-transparent !border-none !text-left !rounded !px-2 !py-1 cursor-pointer"
                        >
                          <span className="text-blue-600 font-semibold">+</span>
                          <span className="text-gray-700">
                            {isCreating
                              ? 'Creating...'
                              : `Create tag "${searchQuery.trim()}"`}
                          </span>
                        </button>
                        <input
                          type="color"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          disabled={isCreating}
                          className="w-16 h-8 rounded cursor-pointer border border-gray-300 disabled:!opacity-50"
                          title="Choose tag color"
                        />
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        No tags found
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <input
                      type="text"
                      placeholder="search or create a tag..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TagSection;
