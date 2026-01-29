import { type Tag } from '../types/journal'

interface JournalListCardProps {
  title: string
  category: string
  description: string
  tags: Tag[]
  lastUpdated: string
}

const JournalListCard = ({
  title,
  category,
  description,
  tags,
  lastUpdated
}: JournalListCardProps) => {
  return (
    <article className="p-4 border rounded-lg hover:border-[#0055ff] hover:bg-[#e4edff] hover:cursor-pointer transition-colors">
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>

        {/* Category */}
        <p className="text-sm text-gray-700">{category}</p>

        {/* Description - limited to 2 lines */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Last Updated Date */}
        <div className="text-xs text-gray-500">
          Latest timesheet update: {lastUpdated}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded text-white text-sm font-medium"
                style={{ backgroundColor: tag.tagColour }}
              >
                {tag.tagDescription}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default JournalListCard
