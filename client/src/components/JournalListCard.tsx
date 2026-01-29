import { type Tag } from '../types/journal';

interface JournalListCardProps {
  title: string;
  category: string;
  description: string;
  tags: Tag[];
  lastUpdated: string;
}

const JournalListCard = ({
  title,
  category,
  description,
  tags,
  lastUpdated,
}: JournalListCardProps) => {
  return (
    <article className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-300 hover:cursor-pointer transition-all duration-200 hover:translate-y-[-2px]">
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 leading-tight">
          {title}
        </h3>

        {/* Category */}
        <div className="inline-block">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {category}
          </span>
        </div>

        {/* Description - limited to 2 lines */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Last Updated Date */}
        <div className="text-xs text-gray-500 font-medium">
          Latest timesheet update: {lastUpdated}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 rounded-lg text-white text-xs font-semibold shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: tag.tagColour }}
              >
                {tag.tagDescription}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default JournalListCard;
