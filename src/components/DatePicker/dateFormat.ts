const DATE_FORMAT = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const MONTH_FORMAT = new Intl.DateTimeFormat('ru-RU', { month: 'long' })

const YEAR_FORMAT = new Intl.DateTimeFormat('ru-RU', { year: 'numeric' })

export function formatDate(date: Date) {
  return DATE_FORMAT.format(date)
}

export function formatMonth(date: Date) {
  return `${MONTH_FORMAT.format(date)} ${YEAR_FORMAT.format(date)}`
}
