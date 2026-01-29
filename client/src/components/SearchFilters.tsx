import { useState, useEffect } from 'react'

const DEBOUNCE_DELAY = 500

const FILTER_OPTIONS = [
  {
    label: 'Category',
    options: [
      { value: 'Technical Skills', label: 'Technical Skills' },
      {
        value: 'Professional Development',
        label: 'Professional Development'
      },
      { value: 'Project Work', label: 'Project Work' },
      { value: 'Team Collaboration', label: 'Team Collaboration' }
    ]
  },
  {
    label: 'Tags',
    options: [
      { value: 'Learning', label: 'Learning' },
      { value: 'Development', label: 'Development' },
      { value: 'Research', label: 'Research' },
      { value: 'Mentoring', label: 'Mentoring' },
      { value: 'Documentation', label: 'Documentation' },
      { value: 'Testing', label: 'Testing' },
      { value: 'Meeting', label: 'Meeting' },
      { value: 'Review', label: 'Review' }
    ]
  },
  {
    label: 'Date Range',
    options: [
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'all', label: 'All Time' }
    ]
  }
]

const SearchFilters = () => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        console.log('Fetching search results for:', searchTerm)
        // TODO: Replace with actual API call
      }
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <article className="flex flex-col items-start justify-start gap-1 lg:flex-row lg:items-end lg:justify-between w-full lg:pr-8">
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
      <div className="flex gap-4">
        {FILTER_OPTIONS.map((filter) => (
          <div key={filter.label} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{filter.label}</label>
            <select className="border rounded-lg p-2">
              <option value="">All</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </article>
  )
}

export default SearchFilters
