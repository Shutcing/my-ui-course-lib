import { useEffect, useRef, useState } from 'react'
import type { DatePickerProps, DatePickerState } from './DatePickerProps'
import { formatDate, formatMonth } from './dateFormat'
import styles from './DatePicker.module.css'

const WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function shiftMonth(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function DatePicker({
  size = 'm',
  state,
  value,
  defaultValue = null,
  defaultOpen = false,
  placeholder = 'Выберите дату',
  disabled = false,
  onChange,
  className,
}: DatePickerProps) {
  const [internal, setInternal] = useState<Date | null>(defaultValue)
  const [open, setOpen] = useState(defaultOpen)
  const [today] = useState(() => new Date())
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(defaultValue ?? today))
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = value === undefined ? internal : value
  const view: DatePickerState | undefined = state ?? (disabled ? 'disabled' : undefined)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
  const offset = (startOfMonth(viewMonth).getDay() + 6) % 7
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - offset + 1
    return day >= 1 && day <= daysInMonth
      ? new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
      : null
  })

  function toggle() {
    const next = !open
    setOpen(next)
    if (next) setViewMonth(startOfMonth(selected ?? today))
  }

  function pick(date: Date) {
    if (value === undefined) setInternal(date)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      data-state={view}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        data-size={size}
        className={styles.trigger}
        disabled={disabled || view === 'disabled'}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
      >
        <span className={styles.value}>{selected ? formatDate(selected) : placeholder}</span>
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="2.25" y="3.25" width="11.5" height="10.5" rx="2" />
          <path d="M2.25 6.25h11.5M5.5 1.75v2.5M10.5 1.75v2.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className={styles.popup} data-size={size} role="dialog" aria-label="Календарь">
          <div className={styles.head}>
            <span className={styles.title}>{formatMonth(viewMonth)}</span>
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Предыдущий месяц"
                onClick={() => setViewMonth((month) => shiftMonth(month, -1))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M10 3.5 5.5 8l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Следующий месяц"
                onClick={() => setViewMonth((month) => shiftMonth(month, 1))}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.week}>
            {WEEKDAYS.map((weekday) => (
              <span key={weekday} className={styles.weekday}>
                {weekday}
              </span>
            ))}
          </div>

          <div className={styles.grid}>
            {cells.map((date, index) =>
              date ? (
                <button
                  key={index}
                  type="button"
                  className={styles.day}
                  data-selected={isSameDay(date, selected)}
                  aria-current={isSameDay(date, today) ? 'date' : undefined}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={index} className={styles.blank} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
