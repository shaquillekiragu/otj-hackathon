const SearchFilters = () => {
  const filterOptions = [
    {
      label: 'Category',
      options: [
        { value: 'learning', label: 'Learning' },
        { value: 'project', label: 'Project' },
        { value: 'meeting', label: 'Meeting' }
      ]
    },
    {
      label: 'Duration',
      options: [
        { value: '0-2', label: '0-2 hours' },
        { value: '2-4', label: '2-4 hours' },
        { value: '4+', label: '4+ hours' }
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

  return (
    <div className="flex flex-col items-start justify-start gap-1 lg:flex-row lg:items-end lg:justify-between w-full lg:pr-8">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Search</label>
        <input type="text" className="border rounded-lg p-2 min-w-md" />
      </div>
      <div className="flex gap-4">
        {filterOptions.map((filter) => (
          <div key={filter.label} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{filter.label}</label>
            <select className="border rounded-lg p-2">
              <option value=""></option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchFilters
