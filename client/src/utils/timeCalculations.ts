export const calculateDuration = (start: string, end: string): string => {
  if (!start || !end) return ''

  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)

  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin

  let diffMin = endTotalMin - startTotalMin
  if (diffMin < 0) diffMin += 24 * 60 // Handle overnight

  const hours = Math.floor(diffMin / 60)
  const minutes = diffMin % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

export const formatDateForDisplay = (isoDate: string): string => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const parseDateForInput = (displayDate: string): string => {
  if (!displayDate) return ''
  // Convert "21 Jan 2026" to "2026-01-21"
  const date = new Date(displayDate)
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
