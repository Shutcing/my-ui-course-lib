export type DatePickerSize = 's' | 'm' | 'l'

export type DatePickerState = 'default' | 'hover' | 'focus' | 'active' | 'disabled'

export interface DatePickerProps {
  size?: DatePickerSize
  state?: DatePickerState
  value?: Date | null
  defaultValue?: Date | null
  defaultOpen?: boolean
  placeholder?: string
  disabled?: boolean
  onChange?: (value: Date) => void
  className?: string
}
