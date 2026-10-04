import type { ButtonProps, ButtonState } from './ButtonProps'
import styles from './Button.module.css'

export function Button({
  variant = 'fill',
  size = 'm',
  state,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const view: ButtonState | undefined = state ?? (disabled ? 'disabled' : undefined)

  return (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      data-state={view}
      disabled={disabled || view === 'disabled'}
      className={[styles.button, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
